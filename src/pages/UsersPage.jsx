import { useContext, useEffect } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../auth/context/AuthContext";

export const UsersPage = () => {

    const {
        users,
        visibleForm,
        handlerOpenForm,
        getUsers,
    } = useContext(UserContext);
    const {login}=useContext(AuthContext);
    useEffect(() => {
        getUsers();
    }, []);
    
    return (
        <>

            {!visibleForm ||
                <UserModalForm />}
            <div>
            <h2 className="m-4">Gestión de Usuarios</h2>
            <div className="container my-4">
                
                <div className="row">
                    <div className="col">
                        {visibleForm || <button
                            className="btn btn-primary my-2"
                            onClick={handlerOpenForm}>
                            Nuevo Usuario
                        </button>}

                        {
                            users.length === 0
                                ? <div className="alert alert-warning">No hay usuarios en el sistema!</div>
                                : <UsersList />
                        }
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}