import { RiArrowGoBackLine } from "react-icons/ri"
import { TituloPorPagina } from "./layout/TituloPorPagina"
import { NavLink, useParams ,useNavigate } from 'react-router-dom';
import { useState , useEffect} from "react";
import axios from 'axios';
import { Table, InputGroup, FormControl, Button, Pagination } from 'react-bootstrap';

export const BibliotecaRecursos =() =>{

        // Datos simulados que normalmente vendrían de una API
    const competenciasSimuladas = [
        { id: 'c1', nombre: 'Resuelve problemas de cantidad' },
        { id: 'c2', nombre: 'Resuelve problemas de regularidad, equivalencia y cambio' },
        // Añade más competencias si es necesario
    ];

    const temasSimulados = [
        { id: 't1', nombre: 'Tema 01', unidad: 'Bloque 01', progreso: 'Completado' },
        { id: 't2', nombre: 'Tema 02', unidad: 'Bloque 01', progreso: 'En Progreso' },
        // Añade más temas si es necesario
    ];
    const [filtro, setFiltro] = useState('');
    const [temasFiltrados, setTemasFiltrados] = useState(temasSimulados);

    const filtrarTemas = (texto) => {
        setFiltro(texto);
        if (texto) {
        setTemasFiltrados(temasSimulados.filter(tema => tema.nombre.toLowerCase().includes(texto.toLowerCase())));
        } else {
        setTemasFiltrados(temasSimulados);
        }
    };
        // Manejo de la paginación (esto es solo un ejemplo y debe ser implementado con lógica real)
    const [paginaActual, setPaginaActual] = useState(1);
    const temasPorPagina = 5;
    const cantidadDePaginas = Math.ceil(temasFiltrados.length / temasPorPagina);
    
    const paginas = [];
    for (let number = 1; number <= cantidadDePaginas; number++) {
        paginas.push(
        <Pagination.Item key={number} active={number === paginaActual} onClick={() => setPaginaActual(number)}>
            {number}
        </Pagination.Item>
        );
    }
    const [competencias, setCompetencias] = useState([]);
    const [temas, setTemas] = useState(temasSimulados);
    const [competenciaSeleccionada, setCompetenciaSeleccionada] = useState(competenciasSimuladas[0].id);
    
    // useEffect(() => {
    //   // Simulamos la carga de competencias
    //   axios.get('/api/competencias')
    //     .then(response => setCompetencias(response.data))
    //     .catch(error => console.error('Error al cargar las competencias:', error));
    // }, []);
  
    // useEffect(() => {
    //   if (competenciaSeleccionada) {
    //     // Simulamos la carga de temas por competencia
    //     axios.get(`/api/competencias/${competenciaSeleccionada}/temas`)
    //       .then(response => setTemas(response.data))
    //       .catch(error => console.error('Error al cargar los temas:', error));
    //   }
    // }, [competenciaSeleccionada]);
  
    const navigate = useNavigate();

    return (
        <div>
        <div className="d-flex align-items-center justify-content-start">
                <button onClick={() => navigate(-1)} type='button' className='btn btn-link ps-4'>
                    <RiArrowGoBackLine size={27} />
                </button>
                <TituloPorPagina titulo="Biblioteca" />
        </div>
        <div className="biblioteca-container">
        <div className="competencias-selector">
        {competenciasSimuladas.map((competencia) => (
          <button key={competencia.id} className="competencia-btn" onClick={() => setCompetenciaSeleccionada(competencia.id)}>
            {competencia.nombre}
          </button>
        ))}
      </div>
      <InputGroup className="mb-3">
          <FormControl
            placeholder="Buscar Tema"
            value={filtro}
            onChange={(e) => filtrarTemas(e.target.value)}
          />
      </InputGroup>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Tema</th>
            <th>Unidad</th>
            <th>Progreso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
            {temasFiltrados.slice((paginaActual - 1) * temasPorPagina, paginaActual * temasPorPagina).map((tema) => (
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
    <Pagination>{paginas}</Pagination>
    </div>
        </div>
    )
        
    
}