import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/LOGO.png';
import '../Login.css'; // Importa el archivo CSS
import { UserContext } from '../../context/UserContext';

export const RegisterPage = () => {
    
    const { initialUserForm, handlerAddUser, errors ,getUsers } = useContext(UserContext);
    const [userForm, setUserForm] = useState(initialUserForm);
    const [users,setUsers]= useState([]);
    const navigate = useNavigate();
    const [isParent, setIsParent] = useState(false);
    
    useEffect(()=>{
        setUsers(getUsers());
        console.log(users);
    },[]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserForm({
            ...userForm,
            [name]: value
        });
        console.log(userForm)
    };
    const handleSelection = (e) => {
        const selectedValue = e.target.value;
        if(selectedValue==="Padre de Familia"){
            console.log("pf")
            console.log(users)
            setUserForm({
                ...userForm,
                padrefam: true,
                docente: false,
            });
            setIsParent(true);
        }
        else if(selectedValue==="Docente"){
            console.log("d")
            setUserForm({
                ...userForm,
                padrefam: false,
                docente: true,
            });
            setIsParent(false);
        }
        else if(selectedValue==="Alumno"){
            console.log("a")
            setUserForm({
                ...userForm,
                padrefam: false,
                docente: false,
            });
            setIsParent(false);
        }
        //console.log(`Opción seleccionada: ${selectedValue}`);
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
                            value={event.target.value}
                            placeholder="Seleccione el tipo de Usuario"
                            onChange={handleSelection}
                        >
                            <option>Alumno</option>
                            <option>Docente</option>
                            <option>Padre de Familia</option>
                        </select>
                    </div>
                    {isParent && (
                        <div className="mb-3">
                            <label htmlFor="child" className="form-label">Seleccione a su hijo:</label>
                            <select
                                id="child"
                                name="childId"
                                className="form-control"
                                value={userForm.childId}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione a su hijo</option>
                                {users.data.map(user => (
                                    <option key={user.id} value={user.id}>
                                       {user.id} {user.username} ({user.email}) {user.fecha_nacimiento} {user.docente}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Nombre de Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-control"
                            value={userForm.username}
                            placeholder="Nombre de Usuario"
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
                            placeholder="Email"
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
                            name="fechaNacimiento"
                            placeholder="Fecha de Nacimiento"
                            className="form-control"
                            value={userForm.fechaNacimiento}
                            onChange={handleChange}
                            
                        />
                        <p className="text-danger">{errors?.fechaNacimiento}</p>
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
                    <button type="submit" className="btn btn-success">Regístrese</button>
                </form>
                <div className="text-center mt-3">
                    <p>¿Ya tiene una cuenta? <span onClick={() => navigate('/auth/login')} className="login-link">Inicie Sesión</span></p>
                </div>
            </div>
        </div>
    );
};
