import React, { Component } from "react";
import axios from "axios";
import Main from "../../template/main/Main";

const headerProps = {
  icon: "users",
  title: "Painel de vagas",
  subtitle: "Gerenciamento das vagas atuais",
};

const baseUrl = "http://localhost:3005/v1/agesp";
const initialState = {
  user: {
    vacancyDateOpen: "",
    positionOrFunction: "",
    sector: "",
    manager: "",
    responsible: "",
    hiringReason: "",
    replacedEmployee: "",
    initialSalary: "",
    status: "",
    admissionDate: "",
    vacancyDateClose: "",
  },
  list: [],
};

export default class Dashboard extends Component {
  state = { ...initialState };

  componentWillMount() {
    axios(`${baseUrl}/vacancy${"/list"}`).then((resp) => {
      this.setState({ list: resp.data });
      console.log(`Dados da lista:${JSON.stringify(resp.data)}`);
    });
  }

  clear() {
    this.setState({ user: initialState.user });
  }

  save() {
    const user = this.state.user;
    const method = user._id ? "put" : "post";
    const url = user._id
      ? `${baseUrl}/user/update/${user._id}`
      : `${baseUrl}/user/create/`;
    console.log(method);
    console.log(url);
    console.log(user);
    axios[method](url, user).then((resp) => {
      const list = this.getUpdatedList(resp.data);
      this.setState({ user: initialState.user, list });
      console.log(resp.data);
      console.log(list);
    });
  }

  getUpdatedList(user, add = true) {
    const list = this.state.list.filter((u) => u._id !== user._id);
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
      <div>
        <h1>Vagas cadastradas</h1>
      </div>
    );
  }

  load(user) {
    this.setState({ user });
  }

  remove(dashboard) {
    axios.delete(`${baseUrl}/vacancy/delete/${vacancy._id}`).then((resp) => {
      const list = this.getUpdatedList(dashboard, false);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Ações</th>
            <th>Abertura</th>
            <th>Cargo</th>
            <th>Setor</th>
            <th>Gestor</th>
            <th>Responsável</th>
            <th>Motivo</th>
            <th>A ser substituído</th>
            <th>Salário</th>
            <th>Status</th>
            <th>Admitido</th>
            <th>Fechamento</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.map((dashboard) => {
      return (
        <tr key={dashboard._id}>
          <td>
            <button
              className="btn btn-success ml-2"
              id="btn-check"
              onClick={() => this.load(dashboard)}
            >
              <i className="fa-solid fa-circle-check"></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              id="btn-delete"
              onClick={() => this.remove(dashboard)}
            >
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          </td>
          <td>{dashboard.vacancyDateOpen}</td>
          <td>{dashboard.positionOrFunction}</td>
          <td>{dashboard.sector}</td>
          <td>{dashboard.manager}</td>
          <td>{dashboard.responsible}</td>
          <td>{dashboard.hiringReason}</td>
          <td>{dashboard.replacedEmployee}</td>
          <td>{dashboard.initialSalary}</td>
          <td>{dashboard.status}</td>
          <td>{dashboard.admissionDate}</td>
          <td>{dashboard.vacancyDateClose}</td>
          
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
