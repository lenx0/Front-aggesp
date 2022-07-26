import "./Vacancies.css";
import React, { Component } from "react";
import axios from "axios";
import Main from "../../template/main/Main";
import InputMask from "../../../components/template/inputMask/InputMask";

const headerProps = {
  icon: "users",
  title: " Vagas",
  subtitle: "Cadastro de vagas",
};

/*json server
const baseUrl = "http://localhost:3001/users";*/

//API
const baseUrl = "http://localhost:3005/v1/agesp";
const initialState = {
  requester: {
    name: "",
    area: "",
    effectiveInc: "",
    replacement: "",
    temporary: "",
    intern: "",
    apprentice: "",
    admissionDateOrExpectDate: "",
    positionOrFunction: "",
    initialSalary: "",
    sector: "",
    postExpSalary: "",
    obsOrSalaryRemarks: "",
    industryHour: "",
    administrativeHour: "",
    shopHour: "",
    differentHour: "",
    noJourneyControl: "",
    entranceDay: "",
    exitDay: "",
    entranceLunch: "",
    exitLunch: "",
    requerimentsForPosition: "",
  },
  list: [],
};

export default class Vacancy extends Component {
  state = { ...initialState };

  componentWillMount() {
    axios(`${baseUrl}/${"list-vacancies"}`).then((resp) => {
      this.setState({ list: resp.data });
      console.log(`Dados da lista:${JSON.stringify(resp.data)}`);
      //axios.delete(`${baseUrl}/${user._id}`)
    });
  }

  clear() {
    this.setState({ requester: initialState.requester });
  }

  /*remove(user) {
    axios.delete(`${baseUrl}/${user.userName}`).then((resp) => {
      const list = this.getUpdatedList(user, false);
      this.setState({ list });
    });
  }*/

  save() {
    const requester = this.state.requester;
    const method = requester._id ? "put" : "post";
    const url = requester._id
      ? `${baseUrl}/update/${requester._id}`
      : `${baseUrl}/`;
    console.log(method);
    console.log(url);
    console.log(requester);
    axios[method](url, requester).then((resp) => {
      const list = this.getUpdatedList(resp.data);
      this.setState({ user: initialState.requester, list });
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
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Solicitante"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Área</label>
              <select
                type="text"
                className="form-control"
                name="selectiveProcess"
              >
                <option value="Aviamento">Aviamento</option>
                <option value="Almoxarifado">Almoxarifado</option>
                <option value="Comercial">Comercial</option>
                <option value="Compras">Compras</option>
                <option value="Corte">Corte</option>
                <option value="Costura">Costura</option>
                <option value="Desenvolvimento">Desenvolvimento</option>
                <option value="DP">DP</option>
                <option value="Ecommerce">Ecommerce</option>
                <option value="Engenharias">Engenharias</option>
                <option value="Estilo">Estilo</option>
                <option value="Expedição">Expedição</option>
                <option value="Financeiro">Financeiro</option>
                <option value="Fiscal">Fiscal</option>
                <option value="Lojas">Lojas</option>
                <option value="Marketing">Marketing</option>
                <option value="Modelagem">Modelagem</option>
                <option value="PCP">PCP</option>
                <option value="Portaria">Portaria</option>
                <option value="Qualidade">Qualidade</option>
                <option value="RH">RH</option>
                <option value="TI">TI</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Processo Seletivo</label>
              <select
                type="text"
                className="form-control"
                name="selectiveProcess"
              >
                <option value="effectiveInc">Aumento Efetivo</option>
                <option value="replacement">Substituição</option>
                <option value="temporary">Temporário</option>
                <option value="intern">Estagiário</option>
                <option value="apprentice">Aprendiz</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Funcionário suplente</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Insira o nome"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Previsão de Admissão/Início</label>
              <input type="date" className="form-control" name="sector"></input>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Cargo/Função</label>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Digite o cargo"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Setor</label>
              <select
                type="text"
                className="form-control"
                name="selectiveProcess"
              >
                <option value="Aviamento">Aviamento</option>
                <option value="Almoxarifado">Almoxarifado</option>
                <option value="Comercial">Comercial</option>
                <option value="Compras">Compras</option>
                <option value="Corte">Corte</option>
                <option value="Costura">Costura</option>
                <option value="Desenvolvimento">Desenvolvimento</option>
                <option value="DP">DP</option>
                <option value="Ecommerce">Ecommerce</option>
                <option value="Engenharias">Engenharias</option>
                <option value="Estilo">Estilo</option>
                <option value="Expedição">Expedição</option>
                <option value="Financeiro">Financeiro</option>
                <option value="Fiscal">Fiscal</option>
                <option value="Lojas">Lojas</option>
                <option value="Marketing">Marketing</option>
                <option value="Modelagem">Modelagem</option>
                <option value="PCP">PCP</option>
                <option value="Portaria">Portaria</option>
                <option value="Qualidade">Qualidade</option>
                <option value="RH">RH</option>
                <option value="TI">TI</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Salário inicial</label>
              <input
                type="number"
                className="form-control"
                name="name"
                placeholder="ex: 1500"
              />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Salário pós experiência</label>
              <input
                type="number"
                className="form-control"
                name="name"
                placeholder="ex: 2500"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Observações sobre o salário</label>
              <textarea
                rows="5"
                type="text"
                className="form-control"
                name="name"
                placeholder="Insira as observações"
              />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Jornada de trabalho</label>
              <select type="text" className="form-control" name="workDay">
                <option value="industryHour">Horário da Fábrica</option>
                <option value="administrativeHour">
                  Horário Administrativo
                </option>
                <option value="shopHour">Horário Lojas</option>
                <option value="differentHour">Horário Diferenciado</option>
                <option value="noJourneyControl">
                  Sem controle de jornada
                </option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-1">
              <div className="form-group">
                <label>Entrada</label>
                <InputMask />
              </div>
            </div>
            <div className="col-12 col-md-1">
              <div className="form-group">
                <label>Saída</label>
                <InputMask />
              </div>
            </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={(e) => this.save(e)}>
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
            <th>Usuário</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Senha</th>
            <th>Setor</th>
            <th>Nível de acesso</th>
            <th>Função na empresa</th>
            <th>Empresa</th>
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
          <td>{user.userName}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.password}</td>
          <td>{user.sector}</td>
          <td>{user.level}</td>
          <td>{user.function}</td>
          <td>{user.company}</td>
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
