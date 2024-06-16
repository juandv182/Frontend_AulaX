import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CuestionarioNivelCurso.css';
import { TituloPorPagina } from './layout/TituloPorPagina';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { Modal, Button, Pagination } from 'react-bootstrap';
import axios from 'axios';
import { RutaDeRefuerzoTemas } from './RutaDeRefuerzoTemas';

export const CuestionarioNivelCurso = () => {
    const { tipoCurso } = useParams();
    const [paginaActual, setPaginaActual] = useState(0);
    const [cuestionario, setCuestionario] = useState({});
    const [respuestas, setRespuestas] = useState({});
    const [idCuestionario, setIdCuestionario] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [quizResults, setQuizResults] = useState([]);
    const navigate = useNavigate();
    let idCurso=0;
    {tipoCurso==="matematicas" ? idCurso=1 : idCurso=2}
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
        try {
            // Enviar PUT requests para actualizar is_marked de las alternativas seleccionadas
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
             // Obtener resultados detallados del cuestionario
             const responseResults = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/quizzes/${idCuestionario}/course/1/detailed-total-nota/${localStorage.getItem("id")}/User`);
             setQuizResults(responseResults.data.quizResults);
 
            setShowModal(true);
        } catch (error) {
            console.error('Error updating alternatives:', error);
        }
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
    const renderFeedback = () => {
        return quizResults.map((result, resultIndex) => (
            
            <div key={resultIndex}>
                <h4>Quizz ID: {result.quizzId}</h4>
                <h5>Nota: {result.nota}</h5>
                {result.incorrectQuestions.map((questionInfo, questionIndex) => (
                    <div key={questionIndex}>
                        <p><strong>Competencia:</strong> {questionInfo.topic.competence.name}</p>
                        <p><strong>Unidad:</strong> {questionInfo.topic.learningUnit.name}</p>
                        <p><strong>Tema:</strong> {questionInfo.topic.name}</p>
                        <p><strong>Pregunta:</strong> {questionInfo.question.name}</p>
                        <p className='text-danger'><strong>Tu respuesta:</strong> {questionInfo.incorrectAlternative.value}</p>
                        <p className='text-success'><strong>Respuesta correcta:</strong> {questionInfo.correctAlternative.value}</p>
                        <hr />
                    </div>
                ))}
            </div>
        ));
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

    const handleClose = async () => {
        setShowModal(false);
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/quizzes/${idCuestionario}/unmark-alternatives-course-quizz/${idCurso}/course`)
        navigate("rutaRefuerzoTemas")
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
                
                    <button onClick={() => handleSubmit()} className="justify-content-end custom-button" disabled={Object.keys(respuestas).length === 0}>
                        Enviar
                    </button>
                </div>
                
            </div>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Retroalimentación del Cuestionario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2 className="text-center">Retroalimentación del Cuestionario del Curso</h2>
                    
                    {renderFeedback()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="custom-button" onClick={handleClose}>
                        Ver Recursos Recomendados
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
