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
                <button onClick={() => navigate(-1)} type='button' className='btn btn-link ps-4'>
                    <RiArrowGoBackLine size={27} />
                </button>
                <TituloPorPagina titulo="Mis Cursos" />
          </div>
          {tipoCurso==="matematicas"?<h1 className='m-1 ms-5 text-primary'> Matemáticas </h1> : <h1 className='m-1 ms-5 text-success'> Ciencia y Tecnología </h1>}
          
          <h2 className='ms-5 display-7 fw-light'>Seleccione si desea ver la biblioteca con todos los recursos educativos o si desea saber su nivel y recomendarte recursos</h2>
          <div className="courses-selection">
          <img src={nino}  alt="Decoración inferior izquierda" className="bottom-left-image" />
          <img src={nina} alt="Decoración superior derecha" className="top-right-image" />
            <button onClick={()=> navigate(`/cursos/${tipoCurso}/biblioteca`)} className="course-card btn btn-light btn-lg d-flex align-items-center justify-content-center text-dark">
                <IoLibraryOutline size={100} className="text-dark" />
              <h2 className='display-1'>Biblioteca de Recursos</h2>
            </button>
            <button onClick={()=> navigate(`/cursos/${tipoCurso}/cuestionarioNivelCurso`)} className="course-card btn btn-light btn-lg d-flex align-items-center justify-content-center text-dark">
            <LiaChalkboardTeacherSolid size={100} className="text-dark"/>
              <h2 className='display-1'>Modo Adaptativo</h2>
            </button>
          </div>

        </div>
    )

}