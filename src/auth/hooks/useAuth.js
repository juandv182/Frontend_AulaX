import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginReducer } from "../reducers/loginReducer";
import { loginUser } from "../services/authService";
import axios from "axios";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    isDocente: false,
    isPadrefam: false,
    user: undefined,
}
export const useAuth = () => {

    const [login, dispatch] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();

    const handlerLogin = async ({ username, password }) => {
        
        try {
            const response = await loginUser({ username, password });
            const token = response.data.token;
            const claims = JSON.parse(window.atob(token.split(".")[1]));
            console.log(claims);
            const user = { username: claims.sub }
            dispatch({
                type: 'login',
                payload: {user, isDocente: claims.isDocente, isPadrefam: claims.isPadrefam},
            });
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                isDocente: claims.isDocente,
                isPadrefam: claims.isPadrefam,
                user,
            }));
            sessionStorage.setItem('token', `Bearer ${token}`);
            navigate('/inicio');
            window.location.reload(false);
        } catch (error) {
            if (error.response?.status == 401) {
                Swal.fire('Error Login', 'Username o password invalidos', 'error');
            } else if (error.response?.status == 403) {
                Swal.fire('Error Login', 'No tiene acceso al recurso o permisos!', 'error');
            } else {
                throw error;
            }
        }
    }

    const handlerLogout =async () => {
        dispatch({
            type: 'logout',
        });
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/${localStorage.getItem("id")}/logout`);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('login');
        sessionStorage.clear();
        localStorage.removeItem("username");
        localStorage.removeItem("id");
        localStorage.removeItem("email");
        localStorage.removeItem("docente");
        localStorage.removeItem("padrefam");
        localStorage.removeItem("fechaNacimiento");
        localStorage.removeItem("id_hijo");
        localStorage.removeItem("nombres");
        localStorage.removeItem("apellidos");
        localStorage.removeItem("genero");
        localStorage.removeItem("preferenciaAprendizaje");
        localStorage.removeItem("esPrimerLoguin");
        localStorage.clear();
    }
    return {
        login,
        handlerLogin,
        handlerLogout,
    }
}