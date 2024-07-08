import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useUsers } from '../hooks/useUsers';
import '../auth/Login.css'; // Importa el archivo CSS

export const UserModalForm2 = ({ show, onHide }) => {
  const { userSelected, handlerAddUser, handlerCloseForm, errors } = useUsers();
  const [userForm, setUserForm] = useState(userSelected);

  useEffect(() => {
    setUserForm(userSelected);
    userForm.email=localStorage.getItem("email")
    userForm.username=localStorage.getItem("username")
  }, [userSelected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.value)
    setUserForm({
      ...userForm,
      [name]: value,
    });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userForm.id=localStorage.getItem("id")

    console.log(userForm)
    handlerAddUser(userForm);
    onHide();
    userForm.email=''
    userForm.username=''
  };

  return (
    <div className="form-container">
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              value={userForm.username}
              onChange={handleChange}
            />
            <p className="text-danger">{errors?.username}</p>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={userForm.email}
              onChange={handleChange}
            />
            <p className="text-danger">{errors?.email}</p>
          </div>
          <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Contraseña"
                            className="form-control"
                            value={userForm.password}
                            onChange={handleChange}
                            
                        />
                        <p className="text-danger">{errors?.password}</p>
        </div>
          <Button type="submit" className="custom-button">Guardar Cambios</Button>
        </form>
      </Modal.Body>
    </Modal>
    </div>
  );
};
