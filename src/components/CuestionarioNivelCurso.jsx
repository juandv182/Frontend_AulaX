import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TituloPorPagina } from './layout/TituloPorPagina';
import { RiArrowGoBackLine } from 'react-icons/ri';

const cuestionarioData = [
    
    {
        competencia: "Indaga mediante métodos científicos para construir sus conocimientos",
        unidades: [
            {
                titulo: "Exploración de la relación entre las plantas y el medio ambiente",
                temas: [
                    {
                        titulo: "Exploración de la relación entre las plantas y el medio ambiente",
                        preguntas: [
                            {
                                pregunta: "¿Qué elemento esencial absorben las plantas durante la fotosíntesis para crecer y desarrollarse?",
                                opciones: ['a) Oxígeno', 'b) Dióxido de carbono', 'c) Nitrógeno', 'd) Hidrógeno']
                            },
                            {
                                pregunta: "¿Cuál de los siguientes factores NO afecta el crecimiento de las plantas?",
                                opciones: ['a) Luz solar', 'b) Temperatura', 'c) Sonido', 'd) Agua']
                            },
                            {
                                pregunta: "¿Cómo contribuyen las plantas al ciclo del carbono?",
                                opciones: ['a) Absorbiendo dióxido de carbono y liberando oxígeno', 'b) Liberando dióxido de carbono y absorbiendo oxígeno', 'c) Absorbiendo oxígeno y liberando dióxido de carbono', 'd) Liberando nitrógeno y absorbiendo hidrógeno']
                            }
                        ]
                    },
                    {
                        titulo: "Las plantas y su reproducción",
                        preguntas: [
                            {
                                pregunta: "¿Cuál es el órgano reproductivo principal de las plantas con flores?",
                                opciones: ['a) Raíz', 'b) Hoja', 'c) Flor', 'd) Tallo']
                            },
                            {
                                pregunta: "¿Qué proceso describe la transferencia de polen de los estambres al pistilo?",
                                opciones: ['a) Germinación', 'b) Polinización', 'c) Fertilización', 'd) Fotosíntesis']
                            },
                            {
                                pregunta: "¿Qué sucede después de que una planta es polinizada?",
                                opciones: ['a) Crece una nueva planta directamente', 'b) Se desarrolla una semilla', 'c) La planta muere', 'd) La planta deja de producir flores']
                            }
                        ]
                    }
                ]
            },
            // Continuar con Unidad 2, Unidad 3...
        ]
    },
    // Continuar con Competencia 2...
];

export const CuestionarioNivelCurso = () => {
    const [paginaActual, setPaginaActual] = useState(0);

    const handleSiguiente = () => {
        setPaginaActual(p => Math.min(p + 1, cuestionarioData.length - 1));
    };

    const handleAnterior = () => {
        setPaginaActual(p => Math.max(p - 1, 0));
    };
    const navigate = useNavigate();

    return (
        <div>
        <div className="d-flex align-items-center justify-content-start">
                <button onClick={() => navigate(-1)} type='button' className='btn btn-link ps-4'>
                    <RiArrowGoBackLine size={27} />
                </button>
                <TituloPorPagina titulo="Modo Adaptativo" />
        </div>
        <div style={{ background: 'white', padding: '2rem' }}>
            <h1>Cuestionario de Ciencias</h1>
            {cuestionarioData.map((competencia, index) => (
                <div key={index} style={{ display: paginaActual === index ? 'block' : 'none' }}>
                    <h2>{competencia.competencia}</h2>
                    {competencia.unidades.map((unidad, idx) => (
                        <div key={idx}>
                            <h3>{unidad.titulo}</h3>
                            {unidad.temas.map((tema, idy) => (
                                <div key={idy}>
                                    <h4>{tema.titulo}</h4>
                                    {tema.preguntas.map((pregunta, idz) => (
                                        <div key={idz}>
                                            <p>{pregunta.pregunta}</p>
                                            {pregunta.opciones.map((opcion, ido) => (
                                                <div key={ido}>
                                                    <label>
                                                        <input type="radio" name={`pregunta-${idz}`} value={opcion} />
                                                        {opcion}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={handleAnterior}>Anterior</button>
            <button onClick={handleSiguiente}>Siguiente</button>
        </div>
        </div>
    );
};
