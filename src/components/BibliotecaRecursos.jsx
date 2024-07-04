import { RiArrowGoBackLine } from "react-icons/ri"
import { TituloPorPagina } from "./layout/TituloPorPagina"
import { NavLink, useParams ,useNavigate } from 'react-router-dom';
import { useState , useEffect} from "react";
import axios from 'axios';
import { Table, InputGroup, FormControl, Button, Pagination , Form} from 'react-bootstrap';
import { color } from "chart.js/helpers";

export const BibliotecaRecursos = () => {
    const { tipoCurso } = useParams();
    const navigate = useNavigate();
    const [competencias, setCompetencias] = useState([]);
    const [temas, setTemas] = useState([]);
    const [temasFiltrados, setTemasFiltrados] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [competenciaSeleccionada, setCompetenciaSeleccionada] = useState('Ver todas');
    const [paginaActual, setPaginaActual] = useState(1);
    const [unidades, setUnidades] = useState([]);
    const [unidadSeleccionada, setUnidadSeleccionada] = useState('');
    const [orden, setOrden] = useState({ campo: '', direccion: '' });
    const temasPorPagina = 5;


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/competencies`)
            .then(response => {
                if(tipoCurso==="matematicas")
                    setCompetencias(response.data.filter(comp => comp.id <= 4)); 
                else{
                    setCompetencias(response.data.filter(comp => comp.id > 4)); 
                }
                if (competenciaSeleccionada === 'Ver todas') {
                    axios.get(`${import.meta.env.VITE_API_BASE_URL}/topics`)
                        .then(response => {
                            setTemas(response.data);
                            setTemasFiltrados(response.data);
                        })
                        .catch(error => console.error('Error al cargar todos los temas:', error));
                }
            })
            .catch(error => console.error('Error al cargar las competencias:', error));
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/learning_units`)
            .then(response => {
                setUnidades(response.data);
            })
            .catch(error => console.error('Error al cargar las unidades:', error));
    }, []);

    useEffect(() => {
        if (competenciaSeleccionada && competenciaSeleccionada !== 'Ver todas') {
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/competencies/${competenciaSeleccionada}/topics`)
                .then(response => {
                    setTemas(response.data);
                    setTemasFiltrados(response.data);
                })
                .catch(error => console.error('Error al cargar los temas:', error));
        } else if (competenciaSeleccionada === 'Ver todas') {
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/topics`)
                .then(response => {
                    setTemas(response.data);
                    setTemasFiltrados(response.data);
                })
                .catch(error => console.error('Error al cargar todos los temas:', error));
        }
    }, [competenciaSeleccionada]);

    useEffect(() => {
        if (unidadSeleccionada) {
            axios.get(`${import.meta.env.VITE_API_BASE_URL}/topics/unit/${unidadSeleccionada}`)
                .then(response => {
                    setTemas(response.data);
                    setTemasFiltrados(response.data);
                })
                .catch(error => console.error('Error al cargar los temas por unidad:', error));
        }
    }, [unidadSeleccionada]);

    const filtrarTemas = (texto) => {
        setFiltro(texto);
        setTemasFiltrados(temas.filter(tema => tema.name.toLowerCase().includes(texto.toLowerCase())));
    };

    const ordenarTemas = (campo) => {
        const direccion = orden.campo === campo && orden.direccion === 'asc' ? 'desc' : 'asc';
        const temasOrdenados = [...temasFiltrados].sort((a, b) => {
            if (a[campo] < b[campo]) return direccion === 'asc' ? -1 : 1;
            if (a[campo] > b[campo]) return direccion === 'asc' ? 1 : -1;
            return 0;
        });
        setTemasFiltrados(temasOrdenados);
        setOrden({ campo, direccion });
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
        <div className="biblioteca-recursos">
            <div className="d-flex align-items-center justify-content-start">
                <button onClick={() => navigate(-1)} type='button' className='btn btn-link ps-4'>
                    <RiArrowGoBackLine size={27} />
                </button>
                <TituloPorPagina titulo="Biblioteca" />
            </div>
            {tipoCurso === "matematicas" ? <h1 className='m-1 ms-5 text-primary'> Matemáticas </h1> : <h1 className='m-1 ms-5 text-success'> Ciencia y Tecnología </h1>}
            <h2 className="m-1 ms-5">Temas por competencias</h2>
            <div className="competencias-selector d-flex flex-wrap justify-content-center">
                <button className={`competencia-btn ${competenciaSeleccionada === 'Ver todas' ? 'active' : ''}`} onClick={() => setCompetenciaSeleccionada('Ver todas')}>Ver todas</button>
                {competencias.map(competencia => (
                    <button key={competencia.id} className={`competencia-btn ${competencia.id === competenciaSeleccionada ? 'active' : ''}`} onClick={() => setCompetenciaSeleccionada(competencia.id)}>
                        {competencia.name}
                    </button>
                ))}
            </div>
            {competenciaSeleccionada !== 'Ver todas' && (
                <div className="competencia-descripcion text-center">
                    <p>{competencias.find(comp => comp.id === competenciaSeleccionada)?.description}</p>
                </div>
            )}
            <div className="d-flex my-4 mx-5 w-50">
                <FormControl
                    placeholder="Buscar por Tema"
                    value={filtro}
                    onChange={(e) => filtrarTemas(e.target.value)}
                    style={{ fontSize: '1.2em', width: '50%'}}
                />
                <Form.Select className="ms-2" onChange={(e) => setUnidadSeleccionada(e.target.value)}
                    style={{ fontSize: '1.2em', width: '50%'}}>
                    <option value="">Seleccionar Unidad</option>
                    {unidades.map(unidad => (
                        <option key={unidad.id} value={unidad.id}>{unidad.name}</option>
                    ))}
                </Form.Select>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
                <Table bordered hover responsive className="custom-table">
                    <thead>
                        <tr>
                            <th onClick={() => ordenarTemas('name')}>Tema</th>
                            <th onClick={() => ordenarTemas('learningUnit.name')}>Unidad</th>
                            <th onClick={() => ordenarTemas('status')}>Progreso</th>
                            <th>Contenido</th>
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
}