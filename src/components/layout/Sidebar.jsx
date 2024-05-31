import SidebarMenu from 'react-bootstrap-sidebar-menu';
import { NavLink } from "react-router-dom";
import { FaBars ,FaHome, FaBook, FaChartLine, FaCog , FaUserCircle} from 'react-icons/fa';
import { PiStudentDuotone } from "react-icons/pi";
import { useContext, useState } from 'react';
import { SidebarContext } from '../../context/SidebarContext';
import { AuthContext } from '../../auth/context/AuthContext';

export const Sidebar = () => {

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded); 
  };
  const { login } = useContext(AuthContext);
  const { isExpanded, setIsExpanded } = useContext(SidebarContext);
  return (
    <SidebarMenu className={isExpanded ? 'expanded' : 'collapsed'}>
      <SidebarMenu.Header>
        <SidebarMenu.Brand>
          <FaUserCircle size={50} className='my-3'/>
          <p> {login.user.username} - {login.isDocente ? "Docente"  : (login.isPadrefam ? "PadreFamilia" : "Estudiante")}</p>
        </SidebarMenu.Brand>
        <SidebarMenu.Toggle className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars className="icon" /> 
        </SidebarMenu.Toggle>
      </SidebarMenu.Header>
      <SidebarMenu.Body>
        <NavLink to="/inicio" className="sidebar-menu-nav-link">
          <FaHome size={25} className="icon" />
          <span>INICIO</span>
        </NavLink>
        <NavLink to="/cursos" className="sidebar-menu-nav-link">
          <FaBook size={25} className="icon"/>
          <span>CURSOS</span>
        </NavLink>
        <NavLink to="/reportes" className="sidebar-menu-nav-link">
          <FaChartLine size={25} className="icon"/>
          <span>REPORTES</span>
        </NavLink>
        <NavLink to="/ajustes" className="sidebar-menu-nav-link">
          <FaCog size={25} className="icon"/>
          <span>AJUSTES</span>
        </NavLink>
        <NavLink to="/users" className="sidebar-menu-nav-link">
          <PiStudentDuotone  size={25} className="icon"/>
          <span>ALUMNOS</span>
        </NavLink>
      </SidebarMenu.Body>
    </SidebarMenu>
  );
};

export default Sidebar;