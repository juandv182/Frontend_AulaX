import { TbMathSymbols } from "react-icons/tb";
import { GiMaterialsScience } from "react-icons/gi";
export const MisCursos = () => {
return(
        <div>
          
          <div className="page-title-bar">
            <h1>Mis Cursos</h1>
          </div>
          <div className="courses-selection">
            
            <button className="course-card btn btn-light btn-lg d-flex align-items-center justify-content-center text-dark">
            <TbMathSymbols size={80} className="text-dark"/> {/* Asegúrate de ajustar el tamaño del ícono según sea necesario */}
            <span>Matemáticas</span>
            </button>
            <button className="course-card btn btn-light btn-lg d-flex align-items-center justify-content-center text-dark">
            <GiMaterialsScience size={80} className="text-dark"/> {/* Asegúrate de ajustar el tamaño del ícono según sea necesario */}
            <span>Ciencia y Tecnología</span>
            </button>
          </div>

        </div>
      );

}