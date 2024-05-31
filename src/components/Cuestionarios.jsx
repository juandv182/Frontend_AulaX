import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cuestionarios = ({ resourceId }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [newQuiz, setNewQuiz] = useState({ 
    name: "",
    myResource: { id: resourceId },
    typeQuizz: { id: 1 }
});

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/quizzes/${resourceId}/MyResourceId`)
      .then(response => {
        setQuizzes(response.data);
      })
      .catch(error => {
        console.error('Error fetching quizzes:', error);
      });
  }, [resourceId]);

  const handleCreateQuiz = () => {
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/quizzes`, newQuiz)
      .then(response => {
        setQuizzes([...quizzes, response.data]);
        setNewQuiz({ name: '',
        myResource: { id: resourceId },
        typeQuizz: { id: 1 } });
      })
      .catch(error => {
        console.error('Error creating quiz:', error);
      });
  };

  return (
    <div>
      <h2>Cuestionarios</h2>
      <input
        type="text"
        value={newQuiz.name}
        onChange={e => setNewQuiz({ ...newQuiz, name: e.target.value })}
        placeholder="Nombre del cuestionario"
      />
      <button onClick={handleCreateQuiz}>Crear Cuestionario</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map(quiz => (
            <tr key={quiz.id}>
              <td>{quiz.name}</td>
              <td>
                <button>Gestionar Preguntas</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cuestionarios;