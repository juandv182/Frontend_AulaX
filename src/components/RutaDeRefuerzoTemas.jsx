import React, { useState, useEffect } from 'react';
import axios from 'axios';


export const  RutaDeRefuerzoTemas = () => {
  const [temas, setTemas] = useState([]);
  const [temaActual, setTemaActual] = useState({});
  const [file,setFile]=useState({});
  let idTypeFile = 0;
  {localStorage.getItem("preferenciaAprendizaje")[0]=="K" ? idTypeFile=2
  :
  (localStorage.getItem("preferenciaAprendizaje")[0]=="A" ?  idTypeFile=1
  :
  (localStorage.getItem("preferenciaAprendizaje")[0]=="V" ?  idTypeFile=1
  :
  idTypeFile=3
  )
  )
  }
  useEffect(() => {
    const fetchTemas = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/reinforce-topics/user/${localStorage.getItem("id")}`);
        setTemas(response.data);
        console.log(response.data)
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
          if (responseFile.data.length > 0){

            setFile(responseFile.data[0])
          }
        } catch (error) {
          console.error('Error fetching file:', error);
        }
      };
  
      fetchFile();
}, [temaActual]);
  const handleClick = (tema) => {
    setTemaActual(tema);
  };
  const handleFileClick = (file) => {
    if (file.url.includes('.pdf')) {
        navigate(`ver-pdf/${file.id}`, { state:file.url});
    } else if (file.url.includes('youtube')) {
        const videoId = new URLSearchParams(new URL(file.url).search).get('v');
        navigate(`video-viewer/${videoId}`);
    }else if (file.url.includes('.html')) {
        navigate(`webgl-viewer/${file.id}`, { state: file.url });
    } else if (file.url.includes('scratch.mit.edu')) {
        const urlParts = file.url.split('/');
        const scratchId = urlParts[urlParts.length - 2]; // Asumiendo que el ID siempre es el penúltimo segmento
        if (scratchId && !isNaN(scratchId)) {
            navigate(`scratch-viewer/${scratchId}`);
        } else {
            console.error('Invalid Scratch project ID:', scratchId);
        }
    }
  };
  return (

    <>
    <div className="container ruta-container">
      <h2>Ruta de Refuerzo Temas</h2>
      <div className="timeline d-flex justify-content-between align-items-center">
        {temas.map((tema, index) => (
          <div key={tema.id} className="timeline-item text-center">
            <div
              className={`timeline-icon ${index < temas.indexOf(temaActual.name) ? 'completed' : ''} ${index === temas.indexOf(temaActual.name) ? 'current' : ''}`}
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
        <h3>Tema Actual: {temaActual.name}</h3>
      </div>
    </div>
    <h1>{file.id}</h1>

    
    </>
  );
};

