import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import '../Login.css'
import { Link } from "react-router-dom";
import logo from '../../assets/LOGO.png';

const initialLoginForm = {
    username: '',
    password: '',
}
export const LoginPage = () => {

    const { handlerLogin } = useContext(AuthContext);
    
    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const { username, password } = loginForm;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        console.log(value);
        setLoginForm({
            ...loginForm,
            [ name ]: value,
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (!username || !password) {
            Swal.fire('Error de validacion', 'Username y password requeridos', 'error');
        }
        handlerLogin({username, password});
        
        setLoginForm(initialLoginForm);
    }
    return (
        <div className="login-container">
            <div   div className="login-form">
                <img src={logo} alt="Logo" className="login-logo" />
                <h2>ACCESO AL SISTEMA</h2>
                <form onSubmit={ onSubmit }>
                    <input
                        className="form-control my-3"
                        placeholder="Nombre de Usuario"
                        name="username"
                        value={username}
                        onChange={ onInputChange }
                    />
                    
                    <input
                        className="form-control my-3"
                        placeholder="Contraseña"
                        type="password"
                        name="password"
                        value={password}
                        onChange={onInputChange}
                    />
                    <hr></hr>

                    {/* <a href="#" className="link m-5">¿Se olvidó su contraseña?</a> */}
                    <button
                        className="btn btn-success"
                        type="submit">
                        Iniciar Sesión
                    </button>
                    <p className="my-5">¿No tiene una cuenta? <Link to="/register">Regístrese</Link></p>
                </form>
            </div>
        </div>
    );

}