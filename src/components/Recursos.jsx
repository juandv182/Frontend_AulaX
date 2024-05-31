import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/context/AuthContext';


const Recursos = ({ onSelectResource }) => {
  const [resources, setResources] = useState([]);
  const { login } = useContext(AuthContext);

  useEffect(() => {
    if (login.isDocente) {
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/resources`)
        .then(response => {
          setResources(response.data);
        })
        .catch(error => {
          console.error('Error fetching resources:', error);
        });
    }
  }, [login.isDocente]);

  return (
    <div>
      <h2>Recursos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {resources.map(resource => (
            <tr key={resource.id}>
              <td>{resource.name}</td>
              <td>{resource.description}</td>
              <td>
                <button onClick={() => onSelectResource(resource)}>Seleccionar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recursos;
