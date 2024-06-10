import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CuestionarioNivelCurso.css';
import { TituloPorPagina } from './layout/TituloPorPagina';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { Modal, Button, Pagination } from 'react-bootstrap';
import axios from 'axios';

export const CuestionarioNivelCurso = () => {
    const { tipoCurso } = useParams();
    const [paginaActual, setPaginaActual] = useState(0);
    const [cuestionario, setCuestionario] = useState({});
    const [respuestas, setRespuestas] = useState({});
    const [idCuestionario, setIdCuestionario] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [feedback, setFeedback] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCuestionario = async () => {
            try {
                const responseType = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/quizzes/3/TypeQuizzId`);
                const idObtenida = responseType.data[0].id;
                setIdCuestionario(idObtenida);
                let responseQuestions=null;
                {tipoCurso==="matematicas"?  responseQuestions = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/quizzes/${idObtenida}/course/1/course-grouped-questions`) :  responseQuestions = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/quizzes/${idObtenida}/course/2/course-grouped-questions`);}
                
                setCuestionario(responseQuestions.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchCuestionario();
    }, [tipoCurso]);

    const handleSelectOption = (preguntaId, alternativaId) => {
        setRespuestas(prev => ({
            ...prev,
            [preguntaId]: alternativaId,
        }));
    };

    const handleSubmit = async () => {
        // Implementar la lógica de envío de respuestas aquí
        setShowModal(true);
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

    const irAPaginaAnterior = () => {
        if (paginaActual > 0) {
            setPaginaActual(paginaActual - 1);
        }
    };

    const irALaSiguientePagina = () => {
        if (paginaActual < competencias.length - 1) {
            setPaginaActual(paginaActual + 1);
        } else {
            handleSubmit();
        }
    };

    const handleClose = () => {
        setShowModal(false);
        const videoId = new URLSearchParams(new URL("https://www.youtube.com/watch?v=oexd_Dfic_Q").search).get('v');
        navigate(`video-viewer/${videoId}`);
    };

    return (
        <>
            <div className="d-flex align-items-center justify-content-start">
                <button onClick={() => navigate(-1)} type="button" className="btn btn-link ps-4">
                    <RiArrowGoBackLine size={27} />
                </button>
                <TituloPorPagina titulo="Mis Cursos" />
            </div>
            {tipoCurso==="matematicas"?<h1 className='m-1 ms-5 text-primary'> Matemáticas </h1> : <h1 className='m-1 ms-5 text-success'> Ciencia y Tecnología </h1>}
            <div className="cuestionario-container">
                <h2 className='display-3'>Evaluación de todo el curso</h2>
                {competencias.length > 0 && renderPreguntas(competencias[paginaActual])}
                <div className="d-flex justify-content-center my-3">
                    <Pagination className="justify-content-center" size='lg'>
                        <Pagination.Prev onClick={irAPaginaAnterior} disabled={paginaActual === 0} />
                        {competencias.map((_, index) => (
                            <Pagination.Item
                                key={index}
                                active={index === paginaActual}
                                onClick={() => setPaginaActual(index)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={irALaSiguientePagina} disabled={paginaActual === competencias.length - 1} />
                    </Pagination>
                
                    <button onClick={() => handleSubmit()} className="justify-content-end" disabled={Object.keys(respuestas).length === 0}>
                        Enviar
                    </button>
                </div>
                
            </div>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Retroalimentación del Cuestionario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {feedback.map((item, index) => (
                        <div key={index}>
                            <p><strong>{item.texto}</strong></p>
                            <p>Su respuesta: {item.seleccionada}</p>
                            <p>Respuesta correcta: {item.correcta}</p>
                            <hr />
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Ver Recurso Recomendado
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
