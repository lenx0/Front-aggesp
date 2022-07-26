import "./Nav.css";
import React from "react";
import { Link } from "react-router-dom";

export default (props) => (
  <aside className="menu-area">
    <nav className="menu">
      <Link to="/login">
        <i className="fa fa-key"></i> Login
      </Link>
      <Link to="/dashboard">
        <i className="fa fa-chart-line"></i> Dashboard
      </Link>
      <Link to="/users">
        <i className="fa fa-users"></i> Usuários
      </Link>
      <Link to="/vacancies">
        <i className="fa fa-user-tie"></i> Vagas
      </Link>
    </nav>
  </aside>
);
