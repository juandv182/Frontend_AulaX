import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Alternativas = ({ questionId }) => {
  const [alternatives, setAlternatives] = useState([]);
  const [newAlternative, setNewAlternative] = useState({ value: '', is_marked: false, is_answer: false, questionId });

  useEffect(() => {
    axios.get(`/alternatives/${questionId}/QuestionId`)
      .then(response => {
        setAlternatives(response.data);
      })
      .catch(error => {
        console.error('Error fetching alternatives:', error);
      });
  }, [questionId]);

  const handleCreateAlternative = () => {
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/alternatives`, newAlternative)
      .then(response => {
        setAlternatives([...alternatives, response.data]);
        setNewAlternative({ value: '', is_marked: false, is_answer: false, questionId });
      })
      .catch(error => {
        console.error('Error creating alternative:', error);
      });
  };

  return (
    <div>
      <h2>Alternativas</h2>
      <input
        type="text"
        value={newAlternative.value}
        onChange={e => setNewAlternative({ ...newAlternative, value: e.target.value })}
        placeholder="Texto de la alternativa"
      />
      <input
        type="checkbox"
        checked={newAlternative.is_marked}
        onChange={e => setNewAlternative({ ...newAlternative, is_marked: e.target.checked })}
      /> ¿Marcada?
      <input
        type="checkbox"
        checked={newAlternative.is_answer}
        onChange={e => setNewAlternative({ ...newAlternative, is_answer: e.target.checked })}
      /> ¿Es respuesta?
      <button onClick={handleCreateAlternative}>Crear Alternativa</button>
      <table>
        <thead>
          <tr>
            <th>Texto</th>
            <th>Marcada</th>
            <th>Es respuesta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alternatives.map(alternative => (
            <tr key={alternative.id}>
              <td>{alternative.value}</td>
              <td>{alternative.is_marked ? 'Sí' : 'No'}</td>
              <td>{alternative.is_answer ? 'Sí' : 'No'}</td>
              <td>
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Alternativas;
