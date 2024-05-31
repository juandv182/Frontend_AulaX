import { NavLink, useParams ,useNavigate } from 'react-router-dom';
import { TituloPorPagina } from './layout/TituloPorPagina';
import { RiArrowGoBackLine } from "react-icons/ri";
import { IoLibraryOutline } from "react-icons/io5";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
export const ModoAdaptativo = () =>{
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
          
          <h2 className='ms-5 display-7 fw-light'>Seleccione lo que desea ver</h2>
          <div className="courses-selection">
          
            <button onClick={()=> navigate(`/cursos/${tipoCurso}/biblioteca`)} className="course-card btn btn-light btn-lg d-flex align-items-center justify-content-center text-dark">
                
              <h2 className='display-1'>Continuar donde te quedaste</h2>
            </button>
            <button onClick={()=> navigate(`/cursos/${tipoCurso}/cuestionarioNivelCurso`)} className="course-card btn btn-light btn-lg d-flex align-items-center justify-content-center text-dark">
            
              <h2 className='display-1'>Historial de Recursos Accedidos</h2>
            </button>
            <button onClick={()=> navigate(`/cursos/${tipoCurso}/modoAdaptativo/cuestionarioNivelCurso`)} className="course-card btn btn-light btn-lg d-flex align-items-center justify-content-center text-dark">

              <h2 className='display-1'>Dar evaluacion de conocimientos de todo el curso</h2>
            </button>
          </div>

        </div>
    )

}