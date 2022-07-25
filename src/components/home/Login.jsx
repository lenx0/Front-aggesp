import "./Login.css";
import { React, Component } from "react";


export default (props) => (
  <>
    <main className="content-main content container-fluid">
      <div className="p-3 mt-3">
      <i className="fa fa-user"></i>
        <label></label>
        <input
          type="text"
          className="form-control"
          name="userName"
          placeholder="Nome de usuário"
        />
        <i className="fa fa-solid fa-lock"></i>
        <label></label>
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Senha"
        />
        <div className="btn-container">
        <button className="btn-login" type="submit">Login</button>
        <button className="btn-register" type="">Registrar</button>
        </div>
        <div>
        </div>
      </div>
    </main>
  </>
);
