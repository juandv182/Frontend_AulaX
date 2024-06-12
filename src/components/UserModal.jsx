import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './UserModal.css'; // Importamos los estilos adicionales
import { FaUserCircle } from 'react-icons/fa';
import userIcon from './../assets/user.png';

export const UserModal = ({ show, onHide, user }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Información del Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center user-modal-body">
        
        <img src={userIcon}  className='img-fluid' />
      
        <h3>{localStorage.getItem("nombres")} {localStorage.getItem("apellidos")}</h3>
        <p> <span className='font-weight-bold'>Username  :</span>       {localStorage.getItem("username")}</p>
        <hr></hr>
        <p>{localStorage.getItem("email")}</p>
        <hr></hr>
        <p>{localStorage.getItem("fechaNacimiento")}</p>
        <hr></hr>

        <p>{localStorage.getItem("genero")}</p>
        <hr></hr>
        <p>{localStorage.getItem("preferenciaAprendizaje")}</p>
        <hr></hr>


        <Button variant="warning" className="mt-3">Editar Perfil</Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={onHide}>Regresar</Button>
      </Modal.Footer>
    </Modal>
  );
};
