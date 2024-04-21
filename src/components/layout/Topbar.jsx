import React, { useContext } from 'react';
import { IoIosLogOut, IoIosNotificationsOutline } from 'react-icons/io';
import logo from '../../assets/LOGO.png';
import { AuthContext } from "../../auth/context/AuthContext";

const TopBar = () => {

const { handlerLogout } = useContext(AuthContext);
  return (
    <div className="top-bar">
      <div className="top-bar-logo">
      <img src={logo} alt="Logo"/>
      
      </div>
      <div className="top-bar-actions">
      <a onClick={handlerLogout}>
      <IoIosLogOut size={40} className="icon" />
        </a>
        <IoIosNotificationsOutline size={40} className="icon" />
      </div>
    </div>
  );
};

export default TopBar;