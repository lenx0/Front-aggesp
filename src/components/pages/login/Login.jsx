import "./Login.css";
import React from "react";

export default () => (
  <>
    <main className="content-main content container-fluid">
      <div className="input-container p-3 mt-3">
        <p>Entre com seus dados</p>
        <label>Usuário</label>
        <input
          type="text"
          className="form-control"
          name="userName"
          placeholder="Nome de usuário"
        />
        <label>Senha</label>
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Senha"
        />
        <div className="btn-container">
          <button className="btn-login" type="submit">
            Login
          </button>
          <button className="btn-register" type="">
            Registrar
          </button>
        </div>
      </div>
    </main>
  </>
);
