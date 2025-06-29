import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Menu.css';

const Menu = () => {
  return (
    <header className="header">
      <h1 className="logo">AcademiaApp</h1>
      <nav>
        <ul className="nav-links">
          <li><Link to="/vincular">Criar Treino</Link></li>
          <li><Link to="/vincularUsuario">Vincular Usuario</Link></li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/quem-somos">Quem Somos</Link></li>
          <li><Link to="/downloads">Downloads</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Menu;