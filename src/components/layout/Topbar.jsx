import React, { useContext } from 'react';
import { IoIosLogOut, IoIosNotificationsOutline, IoIosMenu } from 'react-icons/io';
import logo from '../../assets/LOGO.png';
import { AuthContext } from "../../auth/context/AuthContext";
import { SidebarContext } from "../../context/SidebarContext";

const TopBar = () => {
  const { handlerLogout } = useContext(AuthContext);
  const { isExpanded, setIsExpanded } = useContext(SidebarContext);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="top-bar">
      <div className="top-bar-logo">
        <img src={logo} alt="Logo"/>
      </div>
      <div className="top-bar-actions">
        <IoIosMenu size={40} className="icon menu-icon" onClick={toggleSidebar} />
        <a onClick={handlerLogout}>
          <IoIosLogOut size={40} className="icon" />
        </a>
        <IoIosNotificationsOutline size={40} className="icon" />
      </div>
    </div>
  );
};

export default TopBar;
