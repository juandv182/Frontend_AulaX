import SidebarMenu from 'react-bootstrap-sidebar-menu';
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
        <SidebarMenu.Nav>
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Icon><FaHome /></SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title>INICIO</SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Icon><FaBook /></SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title>CURSOS</SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Icon><FaChartLine /></SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title>REPORTES</SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Icon><FaCog /></SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title>AJUSTES</SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>
      </SidebarMenu.Body>
    </SidebarMenu>
  );
};

export default Sidebar;
