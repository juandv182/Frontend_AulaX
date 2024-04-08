import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import  styles from '../Login.css'

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

        // aca implementamos el login
        handlerLogin({username, password});
        
        setLoginForm(initialLoginForm);
    }
    return (
<div className="login-container">
            <div className="login-form">
                <h2>ACCESO AL SISTEMA</h2>
                <form onSubmit={ onSubmit }>
                    <input
                        className="form-control my-3"
                        placeholder="Email"
                        name="email"
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
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="rememberMe" />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Recuerda la cuenta
                      </label>
                    </div>
                    <a href="#" className="link">¿Se olvidó su contraseña?</a>
                    <button
                        className="btn btn-success"
                        type="submit">
                        Iniciar Sesión
                    </button>
                    <p>¿No tiene una cuenta? <a href="#" className="link">Regístrese</a></p>
                </form>
            </div>
        </div>
    );

}