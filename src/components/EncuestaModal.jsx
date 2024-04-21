import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const preguntasDeLaEncuesta = [
  // Pregunta 1
  {
    texto: "Cuando necesito aprender algo nuevo, prefiero:",
    opciones: [
      { texto: "Ver videos o imágenes que expliquen el tema.", tipo: "Visual" },
      { texto: "Escuchar explicaciones o audiolibros.", tipo: "Auditivo" },
      { texto: "Leer textos o instrucciones escritas.", tipo: "Lector/Escritor" },
      { texto: "Realizar actividades prácticas o experimentos.", tipo: "Kinestésico" },
    ],
  },
  // Pregunta 2 
  {
    texto: "Recuerdo mejor la información cuando:",
    opciones: [
      { texto: "Ver videos o imágenes que expliquen el tema.", tipo: "Visual" },
      { texto: "Escuchar explicaciones o audiolibros.", tipo: "Auditivo" },
      { texto: "Leer textos o instrucciones escritas.", tipo: "Lector/Escritor" },
      { texto: "Realizar actividades prácticas o experimentos.", tipo: "Kinestésico" },
    ],
  },
];

export const EncuestaModal = ({ show, handleClose }) => {
  const [paginaActual, setPaginaActual] = useState(0);

  const preguntaActual = preguntasDeLaEncuesta[paginaActual];

  const irALaSiguientePregunta = () => {
    if(paginaActual < preguntasDeLaEncuesta.length - 1) {
      setPaginaActual(p => p + 1);
    } else {

      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Encuesta de Estilos de Aprendizaje</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{preguntaActual.texto}</p>
        <div className="mb-3">
          {preguntaActual.opciones.map((opcion, index) => (
            <div key={index} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={`pregunta-${paginaActual}`}
                id={`opcion-${index}`}
                value={opcion.tipo}
              />
              <label className="form-check-label" htmlFor={`opcion-${index}`}>
                {opcion.texto}
              </label>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={irALaSiguientePregunta}>
          {paginaActual === preguntasDeLaEncuesta.length - 1 ? 'Enviar' : 'Siguiente'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};