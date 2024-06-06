import { TbMathSymbols } from "react-icons/tb";
import { GiMaterialsScience } from "react-icons/gi";
import { TituloPorPagina } from "../components/layout/TituloPorPagina";
import { NavLink } from "react-router-dom";
import nino from '../assets/niño.png';
import nina from '../assets/niña.png';
import { EncuestaModal } from "../components/EncuestaModal";
import { useState } from "react";
export const MisCursos = () => {
  const [mostrarEncuesta, setMostrarEncuesta] = useState(true);
  const cerrarEncuesta = () => {
    setMostrarEncuesta(false);
    // Aquí puedes manejar lo que sucede después de que el usuario completa la encuesta
  };
return(
        <div>
          <EncuestaModal show={mostrarEncuesta} handleClose={cerrarEncuesta} />
          <TituloPorPagina
          titulo="Mis Cursos"/>
          <h2 className="ms-4">Selecciona el curso al que quiere ingresar</h2>
          <div className="courses-selection">
          <img src={nino}  alt="Decoración inferior izquierda" className="bottom-left-image" />
          <img src={nina} alt="Decoración superior derecha" className="top-right-image" />
            <NavLink to="/cursos/matematicas" className="course-card btn btn-light btn-lg d-flex align-items-center justify-content-center text-dark">
              <TbMathSymbols size={100} className="text-dark"/> 
              <h2 className="display-1">Matemáticas</h2>
            </NavLink>
            <NavLink to="/cursos/ciencias" className="course-card btn btn-light btn-lg d-flex align-items-center justify-content-center text-dark">
              <GiMaterialsScience size={100} className="text-dark"/> 
              <h2 className="display-3">Ciencia y Tecnología</h2>
            </NavLink>
          </div>

        </div>
      );

}