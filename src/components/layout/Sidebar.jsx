import SidebarMenu from 'react-bootstrap-sidebar-menu';
import { NavLink } from "react-router-dom";
import { FaBars ,FaHome, FaBook, FaChartLine, FaCog , FaUserCircle} from 'react-icons/fa';
import { useContext, useState } from 'react';
import { SidebarContext } from '../../context/SidebarContext';

export const Sidebar = () => {

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded); 
  };
  const { isExpanded, setIsExpanded } = useContext(SidebarContext);
  return (
    <SidebarMenu className={isExpanded ? 'expanded' : 'collapsed'}>
      <SidebarMenu.Header>
        <SidebarMenu.Brand>
          <FaUserCircle/>
          <div>¡Hola Carlos! E173037</div>
        </SidebarMenu.Brand>
        <SidebarMenu.Toggle className="sidebar-toggle" onClick={toggleSidebar}>
          <FaBars className="icon" /> {/* Establece el tamaño del ícono aquí */}
        </SidebarMenu.Toggle>
      </SidebarMenu.Header>
      <SidebarMenu.Body>
        <NavLink to="/inicio" className="sidebar-menu-nav-link">
          <FaHome />
          <span>INICIO</span>
        </NavLink>
        <NavLink to="/cursos" className="sidebar-menu-nav-link">
          <FaBook />
          <span>CURSOS</span>
        </NavLink>
        <NavLink to="/reportes" className="sidebar-menu-nav-link">
          <FaChartLine />
          <span>REPORTES</span>
        </NavLink>
        <NavLink to="/ajustes" className="sidebar-menu-nav-link">
          <FaCog />
          <span>AJUSTES</span>
        </NavLink>
      </SidebarMenu.Body>
    </SidebarMenu>
  );
};

export default Sidebar;