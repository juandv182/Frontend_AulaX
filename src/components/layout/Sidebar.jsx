import SidebarMenu from 'react-bootstrap-sidebar-menu';
import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaBook, FaChartLine, FaCog, FaUserCircle } from 'react-icons/fa';
import { PiStudentDuotone } from "react-icons/pi";
import { useContext, useState } from 'react';
import { SidebarContext } from '../../context/SidebarContext';
import { AuthContext } from '../../auth/context/AuthContext';
import user from '../../assets/user.png';
import { UserModal } from '../UserModal';

export const Sidebar = () => {
  const { login } = useContext(AuthContext);
  const { isExpanded, setIsExpanded } = useContext(SidebarContext);
  const [showUserModal, setShowUserModal] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  const handleUserIconClick = () => {
    setShowUserModal(true);
  };
  return (
    <>
    <SidebarMenu className={`sidebar-menu ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <SidebarMenu.Header>
        <SidebarMenu.Brand className="sidebar-menu-brand">
          <div className="user-info">

          <input type="image" src={user} alt="User"  className='img-fluid'  onClick={handleUserIconClick}/>
          <h2>{localStorage.getItem("nombres") + ' ' + localStorage.getItem("apellidos")}</h2>
          <h2 classname="fst-italic">{login.isDocente ? "(Docente)" : (login.isPadrefam ? "(PadreFamilia)" : "(Estudiante)")}</h2>
          </div>
        </SidebarMenu.Brand>
        <div className="desktop-toggle" onClick={toggleSidebar}>
          <FaBars className="icon" />
        </div>
      </SidebarMenu.Header>
      <SidebarMenu.Body>
        <NavLink to="/inicio" className="sidebar-menu-nav-link">
          <FaHome size={25} className="icon" />
          <span>INICIO</span>
        </NavLink>
        <NavLink to="/cursos" className="sidebar-menu-nav-link">
          <FaBook size={25} className="icon" />
          <span>CURSOS</span>
        </NavLink>
        <NavLink to="/reportes" className="sidebar-menu-nav-link">
          <FaChartLine size={25} className="icon" />
          <span>REPORTES</span>
        </NavLink>
        <NavLink to="/ajustes" className="sidebar-menu-nav-link">
          <FaCog size={25} className="icon" />
          <span>AJUSTES</span>
        </NavLink>
        {login.isDocente && (
          <div>
          <NavLink to="/users" className="sidebar-menu-nav-link">
            <PiStudentDuotone size={25} className="icon" />
            <span>ALUMNOS</span>
          </NavLink>
          <NavLink to="/gestion" className="sidebar-menu-nav-link">
          <PiStudentDuotone size={25} className="icon" />
          <span>Gestión</span>
        </NavLink>
        </div>
        )}
      </SidebarMenu.Body>
    </SidebarMenu>
    <UserModal show={showUserModal} onHide={() => setShowUserModal(false)} user={login.user} />
    </>
  );
};

export default Sidebar;
