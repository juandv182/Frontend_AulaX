import { useContext, useEffect, useState } from "react";
import { TituloPorPagina } from "../components/layout/TituloPorPagina"
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../auth/context/AuthContext";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { GestionCuestionarios } from "../components/GestionCuestionarios";

export const    Inicio = ({ onSelectResource }) => {
  const initialUser ={
    docente: false,
    email: "",
    fechaNacimiento: "",
    id:0,
    id_hijo:0,
    padrefam:false,
    username: "",
  }

  const [user,setUser]= useState(initialUser);
  
  const [hijo,setHijo]= useState(initialUser);

  const { login } = useContext(AuthContext);
   
  useEffect( ()=>{
    const findUser = async() => {
      try {
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/username/${login.user.username}`);
          console.log(response);
          localStorage.setItem("username",response.data["username"]);
          localStorage.setItem("id",response.data["id"]);
          localStorage.setItem("email",response.data["email"]);
          localStorage.setItem("fechaNacimiento",response.data["fechaNacimiento"]);
          localStorage.setItem("docente",response.data["docente"]);
          localStorage.setItem("padrefam",response.data["padrefam"]);
          localStorage.setItem("id_hijo",response.data["id_hijo"]);
          localStorage.setItem("nombres",response.data["nombres"]);
          localStorage.setItem("apellidos",response.data["apellidos"]);
          localStorage.setItem("genero",response.data["genero"]);
          
          if(login.isPadrefam){
            const responseHijo = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/${response.data.id_hijo}`).
            then(responseHijo =>
              setHijo(responseHijo.data)
            );
            
          }
          setUser(response.data);
          

      } catch (error) {
          console.error(error);
          throw error;
      }
    }
    findUser();
   
  },[]);

  const { initialUserForm, handlerAddUser, errors ,getUsers } = useContext(UserContext);
    return(
        <>
        <TituloPorPagina
          titulo="Inicio"
          />
        {login.isDocente ? 

      <>
        <h2>Gestión de Cuestionarios por Recursos</h2>
        <GestionCuestionarios/>
    </>


        : (login.isPadrefam ?  
        
        <>
        <h1>Padre Familia</h1>
        <h2>Su id es {user.id} , su fecha de nacimiento es  {user.fechaNacimiento} </h2>
        <h2>Su hijo tiene username {hijo.username}, con fecha de nacimiento  {hijo.fechaNacimiento}</h2>
        </>
        :
        <>
        <h1>Estudiante</h1>
        <h2>Su id es {user.id} , su fecha de nacimiento es  {user.fechaNacimiento} </h2>
        </>
        )}
        </>
    )
}