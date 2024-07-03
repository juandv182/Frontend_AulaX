import React, { useState, useEffect } from 'react';
import { Modal, Button, Pagination } from 'react-bootstrap';
import axios from 'axios';

export const EncuestaModal = ({ show, handleClose }) => {
  const [paginaActual, setPaginaActual] = useState(0);
  const [preguntasDeLaEncuesta, setPreguntasDeLaEncuesta] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [idCuestionario, setIdCuestionario] = useState(null);
  const [resultado, setResultado] = useState(null);

  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
  
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
  
    return edad;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseType = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/quizzes/4/TypeQuizzId`);
        const idObtenida = responseType.data[0].id;
        setIdCuestionario(idObtenida);

        const responseQuestions = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/quizzes/${idObtenida}/questions`);
        const preguntas = responseQuestions.data.map(pregunta => ({
          id: pregunta.id,
          texto: pregunta.name,
          opciones: pregunta.alternatives.map(alt => ({
            ...alt,
            value: alt.value,
            is_marked: false,
          })).sort((a, b) => a.value - b.value),
        }));

        setPreguntasDeLaEncuesta(preguntas);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectOption = (preguntaId, alternativaId) => {
    setRespuestas(prev => ({
      ...prev,
      [preguntaId]: alternativaId,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Verificar que todas las preguntas hayan sido respondidas
      if (Object.keys(respuestas).length !== preguntasDeLaEncuesta.length) {
        alert('Debe completar todas las preguntas antes de terminar el cuestionario.');
        return;
      }

      for (const [preguntaId, alternativaId] of Object.entries(respuestas)) {
        const pregunta = preguntasDeLaEncuesta.find(p => p.id === parseInt(preguntaId));
        const alternativa = pregunta.opciones.find(o => o.id === parseInt(alternativaId));
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/alternatives/${alternativaId}`, {
          ...alternativa,
          is_marked: true,
          question: { id: preguntaId }
        });
      }

      const responseMarkedAlternatives = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/quizzes/${idCuestionario}/marked-alternatives`);
      const markedAlternatives = responseMarkedAlternatives.data.map(alt => parseInt(alt.value));

      const finalArray = [localStorage.getItem("genero") === "false" ? 0 : 1, calcularEdad(localStorage.getItem("fechaNacimiento")), ...markedAlternatives];
      console.log(finalArray);

      const responsePredict = await axios.post('https://serviciomodelovark-django.onrender.com/predict', finalArray);
      setResultado(responsePredict.data.result);
      console.log(responsePredict.data.result);
      localStorage.removeItem("preferenciaAprendizaje");
      localStorage.setItem("preferenciaAprendizaje", responsePredict.data.result);
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/${localStorage.getItem("id")}/user/${responsePredict.data.result}/updatePreferenciasAprendizaje`, finalArray);
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/quizzes/${idCuestionario}/unmark-alternatives`)
    } catch (error) {
      console.error('Error submitting answers:', error);
    }
  };

  const preguntaActual = preguntasDeLaEncuesta[paginaActual];

  const irALaSiguientePregunta = () => {
    if (paginaActual < preguntasDeLaEncuesta.length - 1) {
      setPaginaActual(p => p + 1);
    } else {
      handleSubmit();
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
    <Modal show={show} onHide={() => {}} centered dialogClassName="custom-modal">
      <Modal.Header>
        <Modal.Title>Cuestionario Preferencias Aprendizaje</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {resultado ? (
          <div>
            <h3>Resultado: {resultado}</h3>
          </div>
        ) : (
          preguntaActual ? (
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
                      value={opcion.id}
                      checked={respuestas[preguntaActual.id] === opcion.id}
                      onChange={() => handleSelectOption(preguntaActual.id, opcion.id)}
                    />
                    <label className="form-check-label" htmlFor={`opcion-${index}`}>
                      {opcion.value}
                    </label>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>Cargando preguntas...</p>
          )
        )}
      </Modal.Body>
      <Modal.Footer>
        {resultado ? (
          <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        ) : (
          <>
            {renderPagination()}
            <Button variant="primary" className="custom-button" onClick={irALaSiguientePregunta}>
              {paginaActual === preguntasDeLaEncuesta.length - 1 ? 'Terminar Cuestionario' : 'Siguiente'}
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};
