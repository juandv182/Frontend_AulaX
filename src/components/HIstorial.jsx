import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Pagination } from 'react-bootstrap';
import { RiFileListLine } from 'react-icons/ri';
import { TituloPorPagina } from './layout/TituloPorPagina';
import { RiArrowGoBackLine } from 'react-icons/ri';

export const Historial = () => {
    const navigate = useNavigate();
    const [historial, setHistorial] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [orden, setOrden] = useState({ campo: '', direccion: '' });
    const historialPorPagina = 5;

    useEffect(() => {
        const userId = localStorage.getItem("id");
        axios.get(`http://localhost:8080/adaptive-history/user/${userId}`)
            .then(response => {
                setHistorial(response.data);
            })
            .catch(error => console.error('Error fetching history:', error));
    }, []);

    const handleFileClick = (file) => {
        if (file.url.includes('.pdf')) {
            navigate(`ver-pdf/${file.id}`, { state: file.url });
        } else if (file.url.includes('youtube')) {
            const videoId = new URLSearchParams(new URL(file.url).search).get('v');
            navigate(`video-viewer/${videoId}`);
        } else if (file.url.includes('.html')) {
            navigate(`webgl-viewer/${file.id}`, { state: file.url });
        } else if (file.url.includes('scratch.mit.edu')) {
            const urlParts = file.url.split('/');
            const scratchId = urlParts[urlParts.length - 1];
            if (scratchId && !isNaN(scratchId)) {
                navigate(`scratch-viewer/${scratchId}`);
            } else {
                console.error('Invalid Scratch project ID:', scratchId);
            }
        }
    };

    const ordenarHistorial = (campo) => {
        const direccion = orden.campo === campo && orden.direccion === 'asc' ? 'desc' : 'asc';
        const historialOrdenado = [...historial].sort((a, b) => {
            if (a[campo] < b[campo]) return direccion === 'asc' ? -1 : 1;
            if (a[campo] > b[campo]) return direccion === 'asc' ? 1 : -1;
            return 0;
        });
        setHistorial(historialOrdenado);
        setOrden({ campo, direccion });
    };

    const cantidadDePaginas = Math.ceil(historial.length / historialPorPagina);
    const paginas = [];
    for (let number = 1; number <= cantidadDePaginas; number++) {
        paginas.push(
            <Pagination.Item key={number} active={number === paginaActual} onClick={() => setPaginaActual(number)}>
                {number}
            </Pagination.Item>
        );
    }

    return (
        <div>
            <div className="d-flex align-items-center justify-content-start">
                <button onClick={() => navigate(-1)} type='button' className='btn btn-link ps-4'>
                    <RiArrowGoBackLine size={27} />
                </button>
                <TituloPorPagina titulo="Historial de Recursos" />
            </div>
            <div className="container mt-3">
                <Table striped bordered hover className="custom-table" style={{ backgroundColor: 'white' }}>
                    <thead>
                        <tr>
                            <th onClick={() => ordenarHistorial('reinforceTopic.topic.name')}>Tema Relacionado</th>
                            <th>Archivo Visto</th>
                            <th onClick={() => ordenarHistorial('quizzDado.name')}>Cuestionario Dado</th>
                            <th onClick={() => ordenarHistorial('viewedAt')}>Fecha Consulta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historial.slice((paginaActual - 1) * historialPorPagina, paginaActual * historialPorPagina).map((item) => (
                            <tr key={item.id}>
                                <td>{item.reinforceTopic.topic.name}</td>
                                <td>
                                    <div onClick={() => handleFileClick(item.file)} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}>
                                        <RiFileListLine size={20} />
                                    </div>
                                </td>
                                <td>{item.quizzDado.name}</td>
                                <td>{new Date(item.viewedAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <Pagination size="lg">
                        <Pagination.First onClick={() => setPaginaActual(1)} />
                        <Pagination.Prev onClick={() => paginaActual > 1 && setPaginaActual(paginaActual - 1)} />
                        {paginas}
                        <Pagination.Next onClick={() => paginaActual < cantidadDePaginas && setPaginaActual(paginaActual + 1)} />
                        <Pagination.Last onClick={() => setPaginaActual(cantidadDePaginas)} />
                    </Pagination>
                </div>
            
        </div>
    );
};
