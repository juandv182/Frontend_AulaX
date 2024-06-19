import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VideoViewer } from './VideoViewer';
import { WebGLViewer } from './WebGLViewer';
import { ScratchViewer } from './ScratchViewer';
import { VisualizadorPDF } from './VisualizadorPDF';
import { Modal, Button, Pagination } from 'react-bootstrap';
import { BiCommentDetail } from "react-icons/bi";
import { useParams } from 'react-router-dom';

export const RutaDeRefuerzoTemas = () => {
  const [temas, setTemas] = useState([]);
  const [temaActual, setTemaActual] = useState({});
  const [file, setFile] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [cuestionario, setCuestionario] = useState({});
  const [quizzId, setQuizzId] = useState(null); // Estado para guardar el quizzId
  const [respuestas, setRespuestas] = useState({});
  const [paginaActual, setPaginaActual] = useState(0);
  const [resultado, setResultado] = useState(null);
  const { tipoCurso } = useParams();
  let idTypeFile = 0;
  let idCurso=0;
  {tipoCurso==="matematicas" ? idCurso=1 : idCurso=2}
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
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/reinforce-topics/user/${localStorage.getItem("id")}/course/${idCurso}`);
        const fetchedTemas = response.data.map(item => ({
          ...item.topic,
          estado: item.estado
        }));
        setTemas(fetchedTemas);
        console.log(fetchedTemas);
        if (fetchedTemas.length > 0) {
          setTemaActual(fetchedTemas[0]);
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
      setCuestionario(responseQuestions.data.groupedQuestions); // Actualizar la estructura
      setQuizzId(responseQuestions.data.quizzId); // Guardar quizzId
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
      const responseResults = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/quizzes/${quizzId}/detailed-total-nota-topic/${localStorage.getItem("id")}/User/${temaActual.id}/Topic`); // Usar quizzId
      setResultado(responseResults.data);
      console.log(responseResults.data);
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
                          <label className="form-check-label text-white" htmlFor={`opcion-${opcion.id}`}>
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

  const renderResultado = () => {
    return resultado.quizResults.map((result, index) => (
      <div key={index}>
        <h3>Nota: {result.nota}</h3>
        {result.incorrectQuestions.map((item, index) => (
          <div key={index}>
            <p><strong>Pregunta:</strong> {item.question.name}</p>
            <p><strong>Tu Respuesta:</strong> {item.incorrectAlternative.value}</p>
            <p><strong>Respuesta Correcta:</strong> {item.correctAlternative.value}</p>
            <hr />
          </div>
        ))}
      </div>
    ));
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
                    className={`timeline-icon ${
                      temaActual.id === tema.id
                        ? 'current'
                        : tema.estado
                        ? 'completed'
                        : ''
                    }`}
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
              <p>Estado : {temaActual.estado ? "Completado" : "No Completado"}</p>
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
        <div className="alert alert-warning">
          <h2>Debes realizar la prueba por Curso para saber los temas que debes reforzar</h2>
        </div>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Cuestionario por Tema</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {resultado ? renderResultado() : competencias.length > 0 && renderPreguntas(competencias[paginaActual])}
        </Modal.Body>
        <Modal.Footer>
          {resultado ? (
            <Button variant="secondary" className="custom-button" onClick={async () => {setShowModal(false)
              ;setResultado(null);
              await axios.put(`${import.meta.env.VITE_API_BASE_URL}/quizzes/${quizzId}/unmark-alternatives`);
              window.location.reload();
            }}>Cerrar</Button>
          ) : (
            <Button variant="primary" className="custom-button" onClick={handleSubmit}>
              Terminar Cuestionario
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
