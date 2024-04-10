import SidebarMenu from 'react-bootstrap-sidebar-menu';
import { NavLink } from "react-router-dom";
import { FaHome, FaBook, FaChartLine, FaCog , FaUserCircle} from 'react-icons/fa';

export const Sidebar = () => {
  return (
    <SidebarMenu>
      <SidebarMenu.Header>
        <SidebarMenu.Brand>
          <FaUserCircle/>
          <div>¡Hola Carlos! E173037</div>
        </SidebarMenu.Brand>
        <SidebarMenu.Toggle />
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