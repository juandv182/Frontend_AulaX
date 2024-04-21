import { RiArrowGoBackLine } from "react-icons/ri"
import { TituloPorPagina } from "./layout/TituloPorPagina"
import { NavLink, useParams ,useNavigate } from 'react-router-dom';
import { useState , useEffect} from "react";
import axios from 'axios';
import { Table, InputGroup, FormControl, Button, Pagination } from 'react-bootstrap';

export const BibliotecaRecursos =() =>{
  const competenciasSimuladas = [
    { id: 'c1', nombre: 'Resuelve problemas de cantidad' },
    { id: 'c2', nombre: 'Resuelve problemas de regularidad, equivalencia y cambio' },
];

const temasSimulados = {
    c1: [
        { id: 't1', nombre: 'Tema 01', unidad: 'Bloque 01', progreso: 'Completado' },
        { id: 't2', nombre: 'Tema 02', unidad: 'Bloque 01', progreso: 'En Progreso' },
    ],
    c2: [
        { id: 't3', nombre: 'Tema 03', unidad: 'Bloque 02', progreso: 'Completado' },
        { id: 't4', nombre: 'Tema 04', unidad: 'Bloque 02', progreso: 'No iniciado' },
    ],
};

const [filtro, setFiltro] = useState('');
const [competenciaSeleccionada, setCompetenciaSeleccionada] = useState('c1');
const temas = temasSimulados[competenciaSeleccionada] || [];
const temasFiltrados = filtro ? temas.filter(tema => tema.nombre.toLowerCase().includes(filtro.toLowerCase())) : temas;

const temasPorPagina = 5;
const [paginaActual, setPaginaActual] = useState(1);
const cantidadDePaginas = Math.ceil(temasFiltrados.length / temasPorPagina);

const navigate = useNavigate();

return (
    <div className="biblioteca-container">
        <div className="d-flex align-items-center justify-content-start">
            <button onClick={() => navigate(-1)} type='button' className='btn btn-link ps-4'>
                <RiArrowGoBackLine size={27} />
            </button>
            <TituloPorPagina titulo="Biblioteca" />
        </div>
        <div className="competencias-selector">
            {competenciasSimuladas.map(competencia => (
                <button key={competencia.id} className={`competencia-btn ${competencia.id === competenciaSeleccionada ? 'active' : ''}`}
                    onClick={() => {
                        setCompetenciaSeleccionada(competencia.id);
                        setPaginaActual(1);
                    }}>
                    {competencia.nombre}
                </button>
            ))}
        </div>
        <InputGroup className="mb-3">
            <FormControl
                placeholder="Buscar Tema"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
            />
        </InputGroup>
        <Table striped bordered hover responsive className="custom-table">
            <thead>
                <tr>
                    <th>Tema</th>
                    <th>Unidad</th>
                    <th>Progreso</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {temasFiltrados.slice((paginaActual - 1) * temasPorPagina, paginaActual * temasPorPagina).map(tema => (
                    <tr key={tema.id}>
                        <td>{tema.nombre}</td>
                        <td>{tema.unidad}</td>
                        <td>{tema.progreso}</td>
                        <td>
                            <NavLink to={`/contenido/${tema.id}`}>Ver Contenido</NavLink>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <Pagination>
            {[...Array(cantidadDePaginas).keys()].map(number => (
                <Pagination.Item key={number + 1} active={number + 1 === paginaActual} onClick={() => setPaginaActual(number + 1)}>
                    {number + 1}
                </Pagination.Item>
            ))}
        </Pagination>
    </div>
);  
}