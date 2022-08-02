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
  requester: {
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

export default class Vacancies extends Component {
  state = { ...initialState };

  componentWillMount() {
    axios(`${baseUrl}/vacancy${"/list"}`).then((resp) => {
      this.setState({ list: resp.data });
      console.log(`Dados da lista:${JSON.stringify(resp.data)}`);
    });
  }

  clear() {
    this.setState({ requester: initialState.requester });
  }

  save() {
    const requester = this.state.requester;
    const method = requester._id ? "put" : "post";
    const url = requester._id
      ? `${baseUrl}/user/update/${vacancy._id}`
      : `${baseUrl}/user/create/`;
    console.log(method);
    console.log(url);
    console.log(requester);
    axios[method](url, requester).then((resp) => {
      const list = this.getUpdatedList(resp.data);
      this.setState({ requester: initialState.requester, list });
      console.log(resp.data);
      console.log(list);
    });
  }

  getUpdatedList(requester, add = true) {
    const list = this.state.list.filter((u) => u._id !== requester._id);
    if (add) list.unshift(requester);
    return list;
  }

  updateField(event) {
    const requester = { ...this.state.requester };
    requester[event.target.name] = event.target.value;
    this.setState({ requester });
  }

  renderForm() {
    return (
      <div>
        <h1>Vagas cadastradas</h1>
      </div>
    );
  }

  load(requester) {
    this.setState({ requester });
  }

  remove(requester) {
    axios.delete(`${baseUrl}/vacancy/delete/${vacancy._id}`).then((resp) => {
      const list = this.getUpdatedList(requester, false);
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
    return this.state.list.map((requester) => {
      return (
        <tr key={requester._id}>
          <td>
            <button
              className="btn btn-success ml-2"
              id="btn-check"
              onClick={() => this.load(requester)}
            >
              <i className="fa-solid fa-circle-check"></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              id="btn-delete"
              onClick={() => this.remove(requester)}
            >
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          </td>
          <td>{requester.vacancyDateOpen}</td>
          <td>{requester.positionOrFunction}</td>
          <td>{requester.sector}</td>
          <td>{requester.manager}</td>
          <td>{requester.responsible}</td>
          <td>{requester.hiringReason}</td>
          <td>{requester.replacedEmployee}</td>
          <td>{requester.initialSalary}</td>
          <td>{requester.status}</td>
          <td>{requester.admissionDate}</td>
          <td>{requester.vacancyDateClose}</td>
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
