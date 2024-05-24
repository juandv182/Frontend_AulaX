import React, { useState } from 'react';
import { Modal, Button, Pagination } from 'react-bootstrap';

const opc = ["1 (Muy en desacuerdo)", "2 (En desacuerdo)", "3 (Neutral)", "4 (De acuerdo)", "5 (Muy de acuerdo)"]
const preguntasDeLaEncuesta = [
  { texto: "Aprendo mejor leyendo lo que el profesor escribe en la pizarra.", opciones: opc },
  { texto: "Cuando leo instrucciones, las recuerdo mejor.", opciones: opc },
  { texto: "Entiendo mejor cuando leo las instrucciones.", opciones: opc },
  { texto: "Aprendo mejor leyendo que escuchando a alguien.", opciones: opc},
  { texto: "Aprendo más leyendo libros de texto que escuchando conferencias.", opciones: opc },
  { texto: "Cuando el profesor me dice las instrucciones, las entiendo mejor.", opciones: opc},
  { texto: "Cuando alguien me dice cómo hacer algo en clase, lo aprendo mejor.", opciones: opc },
  { texto: "Recuerdo mejor las cosas que he oído en clase que las cosas que he leído.", opciones: opc},
  { texto: "Aprendo mejor en clase cuando el profesor da una conferencia.", opciones: opc },
  { texto: "Aprendo mejor en clase cuando escucho a alguien.", opciones: opc},
  { texto: "Prefiero aprender haciendo algo en clase.", opciones: opc },
  { texto: "Cuando hago cosas en clase, aprendo mejor.", opciones: opc },
  { texto: "Disfruto aprendiendo en clase haciendo experimentos.", opciones: opc },
  { texto: "Entiendo mejor las cosas en clase cuando participo en juegos de roles.", opciones: opc},
  { texto: "Aprendo mejor en clase cuando participo en juegos de roles.", opciones: opc },
];

export const EncuestaModal = ({ show, handleClose }) => {
  const [paginaActual, setPaginaActual] = useState(0);

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