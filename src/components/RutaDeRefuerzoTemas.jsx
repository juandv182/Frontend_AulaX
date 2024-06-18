import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VideoViewer } from './VideoViewer';
import { WebGLViewer } from './WebGLViewer';
import { ScratchViewer } from './ScratchViewer';
import { VisualizadorPDF } from './VisualizadorPDF';
import { Modal, Button } from 'react-bootstrap';
import { BiCommentDetail } from "react-icons/bi";
import { useParams } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';

export const RutaDeRefuerzoTemas = () => {
  const [temas, setTemas] = useState([]);
  const [temaActual, setTemaActual] = useState({});
  const [file, setFile] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [cuestionario, setCuestionario] = useState({});
  const [respuestas, setRespuestas] = useState({});
  const [paginaActual, setPaginaActual] = useState(0);

  let idTypeFile = 0;

  if (localStorage.getItem("preferenciaAprendizaje")[0] === "K") {
    idTypeFile = 2;
  } else if (localStorage.getItem("preferenciaAprendizaje")[0] === "A" || localStorage.getItem("preferenciaAprendizaje")[0] === "V") {
    idTypeFile = 1;
  } else {
    idTypeFile = 3;
  }

  useEffect(() => {
    const fetchTemas = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/reinforce-topics/user/${localStorage.getItem("id")}`);
        setTemas(response.data);
        console.log(response.data);
        if (response.data.length > 0) {
          setTemaActual(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTemas();
  }, []);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const responseFile = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/files/${temaActual.id}/topic/${idTypeFile}/typeFile`);
        console.log(responseFile);
        if (responseFile.data.length > 0) {
          setFile(responseFile.data[0]);
        }
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };

    if (temaActual.id) {
      fetchFile();
    }
  }, [temaActual]);

  const handleClick = async (tema) => {
    setTemaActual(tema);
    try {
      const responseQuestions = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/quizzes/${tema.id}/grouped-questions`);
      setCuestionario(responseQuestions.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const renderVisualizer = () => {
    if (!file || !file.url) return null;

    if (file.url.includes('.pdf')) {
      return <VisualizadorPDF url={file.url} />;
    } else if (file.url.includes('youtube')) {
      const videoId = new URLSearchParams(new URL(file.url).search).get('v');
      return <VideoViewer url={`${videoId}`} />;
    } else if (file.url.includes('.html')) {
      return <WebGLViewer url={file.url} />;
    } else if (file.url.includes('scratch.mit.edu')) {
      const urlParts = file.url.split('/');
      const scratchId = urlParts[urlParts.length - 1];
      console.log(scratchId)
      if (scratchId && !isNaN(scratchId)) {
        return <ScratchViewer url={scratchId}/>;
      } else {
        console.error('Invalid Scratch project ID:', scratchId);
      }
    } else {
      return <div>Unsupported file type</div>;
    }
  };

  const handleSubmit = async () => {
    try {
      // Send PUT requests to update is_marked for selected alternatives
      await Promise.all(Object.entries(respuestas).map(async ([preguntaId, alternativaId]) => {
        let alternativa;
        for (const competencia of Object.values(cuestionario)) {
          for (const unidad of Object.values(competencia)) {
            for (const tema of Object.values(unidad)) {
              const pregunta = tema.find(p => p.id === Number(preguntaId));
              if (pregunta) {
                alternativa = pregunta.alternatives.find(a => a.id === Number(alternativaId));
                if (alternativa) break;
              }
            }
            if (alternativa) break;
          }
          if (alternativa) break;
        }

        if (alternativa) {
          await axios.put(`${import.meta.env.VITE_API_BASE_URL}/alternatives/${alternativaId}`, {
            ...alternativa,
            is_marked: true,
            question: { id: Number(preguntaId) }
          });
        }
      }));

      setShowModal(false);
    } catch (error) {
      console.error('Error updating alternatives:', error);
    }
  };

  const handleSelectOption = (preguntaId, alternativaId) => {
    setRespuestas(prev => ({
      ...prev,
      [preguntaId]: alternativaId,
    }));
  };

  const renderPreguntas = (competencia) => {
    const unidades = cuestionario[competencia];
    return (
      <div>
        <h3 className='text-primary'>{competencia}</h3>
        {Object.entries(unidades).map(([unidad, temas], unidadIndex) => (
          <div key={unidadIndex}>
            <p className='text-warning font-weight-bold'>{unidad}</p>
            {Object.entries(temas).map(([tema, preguntas], temaIndex) => (
              <div key={temaIndex}>
                <h5 className='text-secondary'>{tema}</h5>
                {preguntas.map((pregunta, preguntaIndex) => (
                  <div key={preguntaIndex}>
                    <p>{pregunta.name}</p>
                    <div className="opciones">
                      {pregunta.alternatives.map((opcion, index) => (
                        <div key={index} className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name={`pregunta-${pregunta.id}`}
                            id={`opcion-${opcion.id}`}
                            value={opcion.id}
                            checked={respuestas[pregunta.id] === opcion.id}
                            onChange={() => handleSelectOption(pregunta.id, opcion.id)}
                          />
                          <label className="form-check-label" htmlFor={`opcion-${opcion.id}`}>
                            {opcion.value}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const competencias = Object.keys(cuestionario);

  return (
    <>
      {temas.length > 0 ? (
      <>
      <div className="container ruta-container">
        <h1>Ruta de Refuerzo Temas</h1>
        <div className="timeline d-flex justify-content-between align-items-center">
          {temas.map((tema, index) => (
            <div key={tema.id} className="timeline-item text-center">
              <div
                className={`timeline-icon ${index < temas.findIndex(t => t.id === temaActual.id) ? 'completed' : ''} ${index === temas.findIndex(t => t.id === temaActual.id) ? 'current' : ''}`}
                onClick={() => handleClick(tema)}
              >
                {index + 1}
              </div>
              <div className="timeline-content mt-2">
                <h5>{tema.name}</h5>
              </div>
            </div>
          ))}
        </div>
        <div className="current-topic mt-4">
          <h2>Tema Actual: {temaActual.name}</h2>
        </div>
      
      </div>
      <hr></hr>
      <div className="d-flex justify-content-end me-4">
          <Button onClick={() => setShowModal(true)} variant="primary" className="custom-button" size='lg'>
            Dar Evaluación del Tema
          </Button>
        </div>
      
      {renderVisualizer()}
      <div className='d-flex justify-content-center mt-4'>
        <BiCommentDetail size={80} />
      </div>
      </>
      ) : (
        <div className="container bg-white p-5 text-center">
          <h2> Debes realizar la prueba por Curso para saber los temas que debes reforzar</h2>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Cuestionario por Tema</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {competencias.length > 0 && renderPreguntas(competencias[paginaActual])}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" className="custom-button" onClick={handleSubmit}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
