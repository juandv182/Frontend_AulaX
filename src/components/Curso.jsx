import { NavLink, useParams ,useNavigate } from 'react-router-dom';
import { TituloPorPagina } from './layout/TituloPorPagina';
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoLibraryOutline } from "react-icons/io5";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import nino from '../assets/niño.png';
import nina from '../assets/niña.png';
export const Curso = () =>{
    const { tipoCurso } = useParams();
    const navigate = useNavigate();
    return (
        <div>
          <div className="d-flex align-items-center justify-content-start">
                <button onClick={() => navigate("/cursos")} type='button' className='btn btn-link ps-4'>
                    <RiArrowGoBackLine size={27} />
                </button>
                <TituloPorPagina titulo="Mis Cursos" />
          </div>
          <h1 className='m-1 ms-5'> {tipoCurso==="matematicas"?"Matemáticas" : "Ciencia y Tecnología"}</h1>
          <div className="courses-selection">
          <img src={nino}  alt="Decoración inferior izquierda" className="bottom-left-image" />
          <img src={nina} alt="Decoración superior derecha" className="top-right-image" />
            <button to="/curso/matematicas" className="course-card btn btn-light btn-lg d-flex align-items-center justify-content-center text-dark">
                <IoLibraryOutline size={80} className="text-dark" />
              <h2>Biblioteca de Recursos</h2>
            </button>
            <NavLink to="/curso/ciencias" className="course-card btn btn-light btn-lg d-flex align-items-center justify-content-center text-dark">
            <LiaChalkboardTeacherSolid size={80} className="text-dark"/>
              <h2>Modo Adaptativo</h2>
            </NavLink>
          </div>

        </div>
    )

}