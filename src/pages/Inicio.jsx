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
  const { login } = useContext(AuthContext);
   
  useEffect( ()=>{
    const findUser = async() => {
      try {
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/username/${login.user.username}`);
          
          setUser(response.data);
          console.log(user);

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
        <h2>Su hijo es {user.id}</h2>
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