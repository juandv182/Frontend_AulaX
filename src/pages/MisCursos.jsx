import { TbMathSymbols } from "react-icons/tb";
import { GiMaterialsScience } from "react-icons/gi";
import { TituloPorPagina } from "../components/layout/TituloPorPagina";
import { NavLink } from "react-router-dom";
import nino from '../assets/niño.png';
import nina from '../assets/niña.png';
export const MisCursos = () => {
return(
        <div>
          <TituloPorPagina
          titulo="Mis Cursos"/>
          <div className="courses-selection">
          <img src={nino}  alt="Decoración inferior izquierda" className="bottom-left-image" />
          <img src={nina} alt="Decoración superior derecha" className="top-right-image" />
            <NavLink to="/cursos/matematicas" className="course-card btn btn-light btn-lg d-flex align-items-center justify-content-center text-dark">
              <TbMathSymbols size={80} className="text-dark"/> 
              <h2>Matemáticas</h2>
            </NavLink>
            <NavLink to="/cursos/ciencias" className="course-card btn btn-light btn-lg d-flex align-items-center justify-content-center text-dark">
              <GiMaterialsScience size={80} className="text-dark"/> 
              <h2>Ciencia y Tecnología</h2>
            </NavLink>
          </div>

        </div>
      );

}