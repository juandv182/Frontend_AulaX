import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, NavLink,useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { TituloPorPagina } from './layout/TituloPorPagina';


export const RecursosPorTema = () => {
    const navigate = useNavigate();
  const { temaId } = useParams();
  const [recursos, setRecursos] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/topics/${temaId}/resources`)
      .then(response => {
        const fetchFiles = response.data.map(recurso => {
          return axios.get(`http://localhost:8080/resources/${recurso.id}/files`)
            .then(filesResponse => ({
              ...recurso,
              files: filesResponse.data
            }));
        });
        Promise.all(fetchFiles).then(results => setRecursos(results));
      })
      .catch(error => console.error('Error fetching resources:', error));
  }, [temaId]);

  return (
    <div>
        <div className="d-flex align-items-center justify-content-start">
                    <button onClick={() => navigate(-1)} type='button' className='btn btn-link ps-4'>
                        <RiArrowGoBackLine size={27} />
                    </button>
                    <TituloPorPagina titulo="Biblioteca" />
        </div>
        <div className="container mt-3">
        <Table striped bordered hover className="custom-table">
            <thead>
            <tr>
                <th>Nombre del Recurso</th>
                <th>Descripción</th>
                <th>Archivos</th>
            </tr>
            </thead>
            <tbody>
            {recursos.map((recurso) => (
                <tr key={recurso.id}>
                <td>{recurso.name}</td>
                <td>{recurso.description}</td>
                <td>
                    {recurso.files.map((file) => (
                    <div key={file.id}>
                    <NavLink to={{
                                pathname: `ver-pdf/${file.id}`,
                                state: {
                                    temaUrl: file.url
                                }
                            }}>{file.name} {file.url}</NavLink>
                    </div>
                    ))}
                </td>
                </tr>
            ))}
            </tbody>
        </Table>
        </div>
    </div>
  );
};