import "./Nav.css";
import React from "react";
import { Link } from "react-router-dom";

export default (props) => (
  <aside className="menu-area">
    <nav className="menu">
      <Link to="/login">
        <i className="fa fa-user"></i> Login
      </Link>
      <Link to="/">
        <i className="fa fa-home"></i> Início
      </Link>
      <Link to="/users">
        <i className="fa fa-users"></i> Usuários
      </Link>
      <Link to="/vacancies">
        <i className="fa fa-users"></i> Vagas
      </Link>
    </nav>
  </aside>
);
