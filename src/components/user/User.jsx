import React, { Component } from "react";
import axios from "axios";
import Main from "../template/Main";

const headerProps = {
  icon: "users",
  title: " Usuários",
  subtitle: "Cadastro de usuários",
};

/*json server
const baseUrl = "http://localhost:3001/users";*/

//API
const baseUrl = "http://localhost:3005/v1/agesp";
const initialState = {
  user: {
    userName: "",
    name: "",
    email: "",
    password: "",
    level: "",
    sector: "",
  },
  list: [],
};

export default class User extends Component {
  state = { ...initialState };

  componentWillMount() {
    axios(`${baseUrl}/${"list-all"}`).then((resp) => {
      this.setState({ list: resp.data });
      console.log(`Dados da lista:${JSON.stringify(resp.data)}`);
      //axios.delete(`${baseUrl}/${user._id}`)
    });
  }

  clear() {
    this.setState({ user: initialState.user });
  }

  save() {
    const user = this.state.user;
    const method = user._id ? "put" : "post";
    const url = user._id ? `${baseUrl}/${user._id}` : `${baseUrl}/`;
    console.log(method);
    console.log(url);
    console.log(user);
    axios[method](url, user).then((resp) => {
      const list = this.getUpdatedList(resp.data);
      this.setState({ user: initialState.user, list });
    });
  }

  create() {
    const user = this.state.user;
    const method = user.userName ? "não foi possivel criar o usuário" : "post";
    const url = user.userName ? `${baseUrl}/${user.userName}` : `${baseUrl}/`;
    console.log(method);
    console.log(url);
    console.log(user);
    axios[method](url, user).then((resp) => {
      const list = this.getUpdatedList(resp.data);
      this.setState({ user: initialState.user, list });
    });
  }

  getUpdatedList(user, add = true) {
    const list = this.state.list.filter((u) => u.id !== user.id);
    if (add) list.unshift(user);
    return list;
  }

  updateField(event) {
    const user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome Completo</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.user.name}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o nome..."
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={this.state.user.email}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o email..."
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Senha</label>
              <input
                type="text"
                className="form-control"
                name="password"
                value={this.state.user.password}
                onChange={(e) => this.updateField(e)}
                placeholder="**********"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Acesso</label>
              <select
                className="form-control"
                name="level"
                placeholder="Digite o nível de acesso"
              >
                <option selected>Escolher...</option>
                <option value>Administrador</option>
                <option value>Gestor</option>
                <option value>Colaborador</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Setor</label>
              <select className="form-control" name="level">
                <option selected>Escolher...</option>
                <option value>Aviamento</option>
                <option value>Gestor</option>
                <option value>Colaborador</option>
                <option value>Almoxarifado</option>
                <option value>Aviamento</option>
                <option value>Comercial</option>
                <option value>Compras</option>
                <option value>Corte</option>
                <option value>Costura</option>
                <option value>Desenvolvimento</option>
                <option value>DP</option>
                <option value>Ecommerce</option>
                <option value>Engenharias</option>
                <option value>Estilo</option>
                <option value>Expedição</option>
                <option value>Financeiro</option>
                <option value>Fiscal</option>
                <option value>Lojas</option>
                <option value>Marketing</option>
                <option value>Modelagem</option>
                <option value>PCP</option>
                <option value>Portaria</option>
                <option value>Qualidade</option>
                <option value>RH</option>
                <option value>TI</option>
              </select>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={(e) => this.create(e)}>
              Salvar
            </button>
            <button
              className="btn btn-secondary ml-2"
              onClick={(e) => this.clear(e)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  load(user) {
    this.setState({ user });
  }

  remove(user) {
    axios.delete(`${baseUrl}/${user._id}`).then((resp) => {
      const list = this.getUpdatedList(user, false);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Senha</th>
            <th>Setor</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.map((user) => {
      return (
        <tr key={user._id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.password}</td>
          <td>{user.sector}</td>
          <td>{user.level}</td>
          <td>
            <button className="btn btn-warning" onClick={() => this.load(user)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.remove(user)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    );
  }
}
