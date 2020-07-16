import React from 'react';
import Link from 'react-router-dom/Link';

const AccountMenu = () => <>
  <aside className="menu">
    <p className="menu-label">Ordenes</p>
    <ul className="menu-list">
      <li><Link to="/cuenta">Pendientes</Link></li>
      <li><Link to="/cuenta/completado">Historial</Link></li>
    </ul>
    <p className="menu-label">
      Perfil
    </p>
    <ul className="menu-list">
      <li><Link to="/cuenta/perfil">Perfil</Link></li>
    </ul>
  </aside>
</>;

export default AccountMenu;