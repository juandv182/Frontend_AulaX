import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/LOGO.png';
import '../Login.css'; // Importa el archivo CSS
import { UserContext } from '../../context/UserContext';

export const RegisterPage = () => {
    const { initialUserForm, handlerAddUser, errors } = useContext(UserContext);
    const [userForm, setUserForm] = useState(initialUserForm);
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserForm({
            ...userForm,
            [name]: value
        });
        console.log(userForm)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar el formulario
        handlerAddUser(userForm);
        console.log(errors)
    };

    return (
        <div className="register-page">
            <div className="form-container">
                <div className="text-center mb-4">
                    <img src={logo} alt="Aula X" />
                </div>
                <h2 className="text-center mb-4">REGISTRE SU CUENTA</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="userType" className="form-label">Unirse a Aula X como:</label>
                        <select
                            id="userType"
                            name="userType"
                            className="form-control"
                            value={userForm.userType}
                            onChange={handleChange}
                        >
                            <option>Estudiante</option>
                            <option>Maestro</option>
                            <option>Padre de Familia</option>
                        </select>
                    </div>
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
                    <p className="text-danger">{ errors?.username}</p>
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
                        <label htmlFor="birthdate" className="form-label">Ingrese su fecha de Nacimiento</label>
                        <input
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            className="form-control"
                            value={userForm.birthdate}
                            onChange={handleChange}
                            
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={userForm.password}
                            onChange={handleChange}
                            
                        />
                        <p className="text-danger">{errors?.password}</p>
                    </div>
                    <button type="submit" className="btn btn-success">Regístrese</button>
                </form>
                <div className="text-center mt-3">
                    <p>¿Ya tiene una cuenta? <span onClick={() => navigate('/auth/login')} className="login-link">Inicie Sesión</span></p>
                </div>
            </div>
        </div>
    );
};
