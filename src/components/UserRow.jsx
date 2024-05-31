import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "../context/UserContext"

export const UserRow = ({id, username, email,isDocente}) => {
    const { handlerUserSelectedForm, handlerRemoveUser } = useContext(UserContext);
    return (
        <tr>
            <td>{id}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td>Alumno</td>
            <td>
                <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => handlerUserSelectedForm({
                        id,
                        username,
                        email,
                        
                    })}
                >
                    Actualizar
                </button>
            </td>
            
            <td>
                <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handlerRemoveUser(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    )
}