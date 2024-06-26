import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { UserRow } from "./UserRow"

export const UsersList = () => {

    const { users } = useContext(UserContext);
    return (
        <table className="table table-hover table-striped">

            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Actualizar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(({id, username, email ,isDocente}) => (
                        <UserRow
                            key={id}
                            id={id}
                            username={username}
                            email={email}
                            docente={isDocente}/>
                    ))
                }
            </tbody>
        </table>
    )
}