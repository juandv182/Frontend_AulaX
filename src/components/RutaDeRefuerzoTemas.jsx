import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VideoViewer } from './VideoViewer';
import { WebGLViewer } from './WebGLViewer';
import { ScratchViewer } from './ScratchViewer';
import { VisualizadorPDF } from './VisualizadorPDF';
import { Button } from 'react-bootstrap';
import { BiCommentDetail } from "react-icons/bi";


export const RutaDeRefuerzoTemas = () => {
  const [temas, setTemas] = useState([]);
  const [temaActual, setTemaActual] = useState({});
  const [file, setFile] = useState({});
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

  const handleClick = (tema) => {
    setTemaActual(tema);
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

  return (
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
      <div class="d-flex justify-content-end me-4">
      <Button  variant="primary" className="custom-button" size='lg'>
                        Dar Evaluación del Tema
      </Button>
      </div>
      {renderVisualizer()}
      <div className='d-flex justify-content-center mt-4'>
      <BiCommentDetail size={80} />
      </div>
    </>
  );
};


