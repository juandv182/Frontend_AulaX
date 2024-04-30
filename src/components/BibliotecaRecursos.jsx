import { RiArrowGoBackLine } from "react-icons/ri"
import { TituloPorPagina } from "./layout/TituloPorPagina"
import { NavLink, useParams ,useNavigate } from 'react-router-dom';
import { useState , useEffect} from "react";
import axios from 'axios';
import { Table, InputGroup, FormControl, Button, Pagination } from 'react-bootstrap';

export const BibliotecaRecursos = () => {
    const { tipoCurso } = useParams();
    const navigate = useNavigate();
    const [competencias, setCompetencias] = useState([]);
    const [temas, setTemas] = useState([]);
    const [temasFiltrados, setTemasFiltrados] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [competenciaSeleccionada, setCompetenciaSeleccionada] = useState(null);
    const [paginaActual, setPaginaActual] = useState(1);
    const temasPorPagina = 5;

    useEffect(() => {
        axios.get('http://localhost:8080/competencies')
            .then(response => {
                if(tipoCurso==="matematicas")
                    setCompetencias(response.data.filter(comp => comp.id <= 4)); 
                else{
                    setCompetencias(response.data.filter(comp => comp.id > 4)); 
                }
            })
            .catch(error => console.error('Error al cargar las competencias:', error));
    }, []);

    useEffect(() => {
        if (competenciaSeleccionada) {
            axios.get(`http://localhost:8080/competencies/${competenciaSeleccionada}/topics`)
                .then(response => {
                    setTemas(response.data);
                    setTemasFiltrados(response.data);
                })
                .catch(error => console.error('Error al cargar los temas:', error));
        }
    }, [competenciaSeleccionada]);

    const filtrarTemas = (texto) => {
        setFiltro(texto);
        setTemasFiltrados(temas.filter(tema => tema.name.toLowerCase().includes(texto.toLowerCase())));
    };

    const cantidadDePaginas = Math.ceil(temasFiltrados.length / temasPorPagina);
    const paginas = [];
    for (let number = 1; number <= cantidadDePaginas; number++) {
        paginas.push(
            <Pagination.Item key={number} active={number === paginaActual} onClick={() => setPaginaActual(number)}>
                {number}
            </Pagination.Item>
        );
    }

    return (
        <div >
          <div className="d-flex align-items-center justify-content-start">
                <button onClick={() => navigate(-1)} type='button' className='btn btn-link ps-4'>
                    <RiArrowGoBackLine size={27} />
                </button>
                <TituloPorPagina titulo="Biblioteca" />
          </div>
            <div className="competencias-selector">
                {competencias.map(competencia => (
                    <button key={competencia.id} className={`competencia-btn ${competencia.id === competenciaSeleccionada ? 'active' : ''}`} onClick={() => setCompetenciaSeleccionada(competencia.id)}>
                        {competencia.name}
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
            <Table  bordered hover responsive className="custom-table">
                <thead>
                    <tr>
                        <th>Tema</th>
                        <th>Unidad</th>
                        <th>Progreso</th>
                        <th>Contenido</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {temasFiltrados.slice((paginaActual - 1) * temasPorPagina, paginaActual * temasPorPagina).map(tema => (
                        <tr key={tema.id}>
                            <td>{tema.name}</td>
                            <td>{tema.learningUnit.name}</td>
                            <td>{tema.status ? 'Completado' : 'En Progreso'}</td>
                            <td>
                  
                                <NavLink to={`recursosPorTema/${tema.id}`}>Ver Contenido</NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>{paginas}</Pagination>
        </div>
    );
}