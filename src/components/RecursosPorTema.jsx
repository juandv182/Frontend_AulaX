import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, Pagination, Form } from 'react-bootstrap';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { TituloPorPagina } from './layout/TituloPorPagina';

export const RecursosPorTema = () => {
    const navigate = useNavigate();
    const { temaId } = useParams();
    const [recursos, setRecursos] = useState([]);
    const [tiposArchivo, setTiposArchivo] = useState([]);
    const [tipoSeleccionado, setTipoSeleccionado] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const recursosPorPagina = 5;

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/topics/${temaId}/resources`)
            .then(response => {
                const fetchFiles = response.data.map(recurso => {
                    return axios.get(`${import.meta.env.VITE_API_BASE_URL}/resources/${recurso.id}/files`)
                        .then(filesResponse => ({
                            ...recurso,
                            files: filesResponse.data
                        }));
                });
                Promise.all(fetchFiles).then(results => setRecursos(results));
            })
            .catch(error => console.error('Error fetching resources:', error));

        axios.get(`${import.meta.env.VITE_API_BASE_URL}/typefiles`)
            .then(response => setTiposArchivo(response.data))
            .catch(error => console.error('Error fetching file types:', error));
    }, [temaId]);

    useEffect(() => {
        if (tipoSeleccionado) {
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/resources/filterByTypeFile/${tipoSeleccionado}`)
                .then(response => setRecursos(response.data))
                .catch(error => console.error('Error fetching filtered resources:', error));
        }
    }, [tipoSeleccionado]);

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

    const ordenarRecursos = (campo) => {
        const direccion = campo === 'name' ? 'asc' : 'desc';
        const recursosOrdenados = [...recursos].sort((a, b) => {
            if (a[campo] < b[campo]) return direccion === 'asc' ? -1 : 1;
            if (a[campo] > b[campo]) return direccion === 'asc' ? 1 : -1;
            return 0;
        });
        setRecursos(recursosOrdenados);
    };

    const cantidadDePaginas = Math.ceil(recursos.length / recursosPorPagina);
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
                <TituloPorPagina titulo="Biblioteca" />
            </div>
           
                <Form.Select
                    className="my-4"
                    onChange={(e) => setTipoSeleccionado(e.target.value)}
                    style={{ fontSize: '1.2em', width: '50%', display: 'block', margin: '0 auto' }}
                >
                    <option value="">Seleccionar Tipo de Archivo</option>
                    {tiposArchivo.map(tipo => (
                        <option key={tipo.id} value={tipo.id}>{tipo.name}</option>
                    ))}
                </Form.Select>
                <div className="container mt-3">
                <Table striped bordered hover className="custom-table" style={{ backgroundColor: 'white' }}>
                    <thead>
                        <tr>
                            <th onClick={() => ordenarRecursos('name')}>Nombre del Recurso</th>
                            <th onClick={() => ordenarRecursos('description')}>Descripción</th>
                            <th>Archivos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recursos.slice((paginaActual - 1) * recursosPorPagina, paginaActual * recursosPorPagina).map((recurso) => (
                            <tr key={recurso.id}>
                                <td>{recurso.name}</td>
                                <td>{recurso.description}</td>
                                <td>
                                    {recurso.files.map((file) => (
                                        <div key={file.id} onClick={() => handleFileClick(file)} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}>
                                            {file.name}
                                        </div>
                                    ))}
                                </td>
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
