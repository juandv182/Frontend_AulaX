import { useContext, useEffect, useState } from "react";
import { TituloPorPagina } from "../components/layout/TituloPorPagina";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../auth/context/AuthContext";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { GestionCuestionarios } from "../components/GestionCuestionarios";
import { Modal, Button } from 'react-bootstrap';
import recursosed from '../assets/recursosed.jpg';
import mathIcon from '../assets/math.png';
import scienceIcon from '../assets/science.png';

export const Inicio = ({ onSelectResource }) => {
  const initialUser = {
    docente: false,
    email: "",
    fechaNacimiento: "",
    id: 0,
    id_hijo: 0,
    padrefam: false,
    username: "",
  };

  const [user, setUser] = useState(initialUser);
  const [hijo, setHijo] = useState(initialUser);
  const [showModal, setShowModal] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const findUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/username/${login.user.username}`);
        console.log(response);
        localStorage.setItem("username", response.data["username"]);
        localStorage.setItem("id", response.data["id"]);
        localStorage.setItem("email", response.data["email"]);
        localStorage.setItem("fechaNacimiento", response.data["fechaNacimiento"]);
        localStorage.setItem("docente", response.data["docente"]);
        localStorage.setItem("padrefam", response.data["padrefam"]);
        localStorage.setItem("id_hijo", response.data["id_hijo"]);
        localStorage.setItem("nombres", response.data["nombres"]);
        localStorage.setItem("apellidos", response.data["apellidos"]);
        localStorage.setItem("genero", response.data["genero"]);
        localStorage.setItem("preferenciaAprendizaje", response.data["preferenciaAprendizaje"]);
        localStorage.setItem("esPrimerLoguin", response.data["esPrimerLoguin"]);

        if (response.data) {
          await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/${response.data["id"]}/login`);
        }

        if (login.isPadrefam) {
          const responseHijo = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/${response.data.id_hijo}`).then(responseHijo => setHijo(responseHijo.data));
        }
        setUser(response.data);

      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    findUser();

  }, []);

  const handleContinueClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSelectCourse = (course) => {
    if (course === "matematicas") {
      navigate('/cursos/matematicas/modoAdaptativo/rutaRefuerzoTemas', { replace: true });
    } else if (course === "ciencias") {
      navigate('/cursos/ciencias/modoAdaptativo/rutaRefuerzoTemas', { replace: true });
    }
  };

  return (
    <>
      <TituloPorPagina titulo="Inicio" />
      {login.isDocente ? (
        <>
          <h2>Gestión de Cuestionarios por Recursos</h2>
          <GestionCuestionarios />
        </>
      ) : login.isPadrefam ? (
        <>
          <h1>Padre Familia</h1>
          <h2>Su id es {user.id}, su fecha de nacimiento es {user.fechaNacimiento}</h2>
          <h2>Su hijo tiene username {hijo.username}, con fecha de nacimiento {hijo.fechaNacimiento}</h2>
        </>
      ) : (
        <>
          <div className="student-dashboard">
            <div className="welcome-section">
              <div className="image-container">
                <img src={recursosed} alt="Recursos Educativos" className="main-image img-fluid" />
                <Button className="mt-3 custom-buttonInicio" onClick={handleContinueClick}>Continuar ruta de aprendizaje</Button>
              </div>
            </div>
            <div className="course-buttons">
              <Button onClick={() => navigate('/cursos/matematicas', { replace: true })} className="course-card">
                <img src={mathIcon} alt="Matemáticas" />
                <h2>Matemáticas</h2>
              </Button>
              <Button onClick={() => navigate('/cursos/ciencias', { replace: true })} className="course-card">
                <img src={scienceIcon} alt="Ciencia y Tecnología" />
                <h2>Ciencia y Tecnología</h2>
              </Button>
            </div>
          </div>
        </>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Selecciona el curso donde continuar con la ruta de aprendizaje</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Button variant="primary" className="m-2" onClick={() => handleSelectCourse("matematicas")}>Matemáticas</Button>
          <Button variant="primary" className="m-2" onClick={() => handleSelectCourse("ciencias")}>Ciencias</Button>
        </Modal.Body>
      </Modal>
    </>
  );
};
