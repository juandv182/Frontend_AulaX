import React, { useState } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import './CuestionarioNivelCurso.css';
import { TituloPorPagina } from './layout/TituloPorPagina';
import { RiArrowGoBackLine } from 'react-icons/ri';

const cuestionarios = {
    matematicas: [
        {
            competencia: "Resuelve problemas de cantidad",
            unidad: "Operaciones Números Naturales",
            preguntas: [
                {
                    tema: "Suma de números naturales",
                    texto: "¿Cuál es la suma de 258 + 433?",
                    opciones: ["681", "691", "701", "711"],
                },
                {
                    tema: "Suma de números naturales",
                    texto: "Si un niño tiene 348 caramelos y recibe 152 más, ¿cuántos caramelos tiene en total?",
                    opciones: ["500", "510", "520", "530"],
                },
                {
                    tema: "Suma de números naturales",
                    texto: "Suma 4875 y 1342.",
                    opciones: ["6217", "6218", "6219", "6220"],
                },
            ],
        },
    ],
    ciencias: [
        {
            competencia: "Indaga mediante métodos científicos para construir sus conocimientos",
            unidad: "Exploración de la relación entre las plantas y el medio ambiente",
            preguntas: [
                {
                    tema: "Exploración de la relación entre las plantas y el medio ambiente",
                    texto: "¿Qué elemento esencial absorben las plantas durante la fotosíntesis para crecer y desarrollarse?",
                    opciones: ["Oxígeno", "Dióxido de carbono", "Nitrógeno", "Hidrógeno"],
                },
                {
                    tema: "Exploración de la relación entre las plantas y el medio ambiente",
                    texto: "¿Cuál de los siguientes factores NO afecta el crecimiento de las plantas?",
                    opciones: ["Luz solar", "Temperatura", "Sonido", "Agua"],
                },
                {
                    tema: "Exploración de la relación entre las plantas y el medio ambiente",
                    texto: "¿Cómo contribuyen las plantas al ciclo del carbono?",
                    opciones: ["Absorbiendo dióxido de carbono y liberando oxígeno", "Liberando dióxido de carbono y absorbiendo oxígeno", "Absorbiendo oxígeno y liberando dióxido de carbono", "Liberando nitrógeno y absorbiendo hidrógeno"],
                },
            ],
        },
    ],
};

export const CuestionarioNivelCurso = () => {
    const { tipoCurso } = useParams();
    const [paginaActual, setPaginaActual] = useState(0);
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
    const [respuestas, setRespuestas] = useState([]);

    const cuestionario = cuestionarios[tipoCurso] || [];

    const preguntaActual = cuestionario.flatMap(c => c.preguntas)[paginaActual];
    const competenciaActual = cuestionario.find(c => c.preguntas.includes(preguntaActual));
    const navigate = useNavigate();
    const handleNext = () => {
        setRespuestas([...respuestas, respuestaSeleccionada]);
        setRespuestaSeleccionada(null);
        if (paginaActual < cuestionario.flatMap(c => c.preguntas).length - 1) {
            setPaginaActual(paginaActual + 1);
        } else {
            // Manejar el envío del cuestionario
            console.log('Respuestas:', respuestas);
        }
    };

    return (
        <>
        <div className="d-flex align-items-center justify-content-start">
        <button onClick={() => navigate(-1)} type='button' className='btn btn-link ps-4'>
            <RiArrowGoBackLine size={27} />
        </button>
        <TituloPorPagina titulo="Mis Cursos" />
        </div>
        <div className="cuestionario-container">
            <h2>Evaluación por competencias</h2>
            <h3>{competenciaActual?.competencia}</h3>
            <h4>{preguntaActual.tema}</h4>
            <p>{preguntaActual.texto}</p>
            <div className="opciones">
                {preguntaActual.opciones.map((opcion, index) => (
                    <div key={index} className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name={`pregunta-${paginaActual}`}
                            id={`opcion-${index}`}
                            value={opcion}
                            onChange={() => setRespuestaSeleccionada(opcion)}
                        />
                        <label className="form-check-label" htmlFor={`opcion-${index}`}>
                            {opcion}
                        </label>
                    </div>
                ))}
            </div>
            <div className="pagination-container">
                <button onClick={() => setPaginaActual(paginaActual - 1)} disabled={paginaActual === 0}>Anterior</button>
                <span>{paginaActual + 1} / {cuestionario.flatMap(c => c.preguntas).length}</span>
                <button onClick={handleNext} disabled={respuestaSeleccionada === null}>
                    {paginaActual === cuestionario.flatMap(c => c.preguntas).length - 1 ? 'Enviar' : 'Siguiente'}
                </button>
            </div>
        </div>
        </>
    );
};
