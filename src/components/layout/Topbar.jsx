import React from 'react';
import { FaSignOutAlt, FaBell } from 'react-icons/fa';
import logo from '../../assets/LOGO.png';
const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-logo">
      <img src={logo} alt="Logo" className="login-logo" />
      </div>
      <div className="top-bar-title">Mis Cursos</div>
      <div className="top-bar-actions">
        <FaBell className="icon" />
        <FaSignOutAlt className="icon" />
      </div>
    </div>
  );
};

export default TopBar;