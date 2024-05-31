import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Preguntas = ({ quizId }) => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ name: '', quizId });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/questions/${quizId}/Quizz`)
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, [quizId]);

  const handleCreateQuestion = () => {
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/questions`, newQuestion)
      .then(response => {
        setQuestions([...questions, response.data]);
        setNewQuestion({ name: '', quizId });
      })
      .catch(error => {
        console.error('Error creating question:', error);
      });
  };

  return (
    <div>
      <h2>Preguntas</h2>
      <input
        type="text"
        value={newQuestion.name}
        onChange={e => setNewQuestion({ ...newQuestion, name: e.target.value })}
        placeholder="Nombre de la pregunta"
      />
      <button onClick={handleCreateQuestion}>Crear Pregunta</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {questions.map(question => (
            <tr key={question.id}>
              <td>{question.name}</td>
              <td>
                <button>Gestionar Alternativas</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Preguntas;
