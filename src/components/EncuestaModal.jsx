import React, { useState, useEffect } from 'react';
import { Modal, Button, Pagination } from 'react-bootstrap';
import axios from 'axios';

export const EncuestaModal = ({ show, handleClose }) => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [preguntasDeLaEncuesta, setPreguntasDeLaEncuesta] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Primera petición para obtener el ID del cuestionario
        const responseType = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/quizzes/4/TypeQuizzId`);
        console.log(responseType.data[0].id)
        const idObtenida = responseType.data[0].id;

        // Segunda petición para obtener las preguntas y alternativas
        const responseQuestions = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/quizzes/${idObtenida}/questions`);
        const preguntas = responseQuestions.data.map(pregunta => ({
          texto: pregunta.name,
          opciones: pregunta.alternatives.map(alt => alt.value).sort((a, b) => a - b)
        }));

        setPreguntasDeLaEncuesta(preguntas);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchData();
  }, []);

  const preguntaActual = preguntasDeLaEncuesta[paginaActual];

  const irALaSiguientePregunta = () => {
    if (paginaActual < preguntasDeLaEncuesta.length - 1) {
      setPaginaActual(p => p + 1);
    } else {
      handleClose();
    }
  };

  const irAPreguntaAnterior = () => {
    if (paginaActual > 0) {
      setPaginaActual(p => p - 1);
    }
  };

  const renderPagination = () => (
    <Pagination>
      <Pagination.Prev onClick={irAPreguntaAnterior} disabled={paginaActual === 0} />
      {preguntasDeLaEncuesta.map((_, index) => (
        <Pagination.Item
          key={index}
          active={index === paginaActual}
          onClick={() => setPaginaActual(index)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={irALaSiguientePregunta} disabled={paginaActual === preguntasDeLaEncuesta.length - 1} />
    </Pagination>
  );

  return (
    <Modal show={show} onHide={handleClose} centered dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Cuestionario Preferencias Aprendizaje</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {preguntaActual ? (
          <>
            <p>{preguntaActual.texto}</p>
            <div className="mb-3">
              {preguntaActual.opciones.map((opcion, index) => (
                <div key={index} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`pregunta-${paginaActual}`}
                    id={`opcion-${index}`}
                    value={opcion}
                  />
                  <label className="form-check-label" htmlFor={`opcion-${index}`}>
                    {opcion}
                  </label>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>Cargando preguntas...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        {renderPagination()}
        <Button variant="primary" className="custom-button" onClick={irALaSiguientePregunta}>
          {paginaActual === preguntasDeLaEncuesta.length - 1 ? 'Terminar Cuestionario' : 'Siguiente'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
