import React, { Component } from "react";
import axios from "axios";
import Main from "../../template/main/Main";
import InputMoneyMask from "../../template/inputMask/InputMoneyMask";

const headerProps = {
  icon: "users",
  title: " Vagas",
  subtitle: "Cadastro de vagas",
};

const baseUrl = "http://localhost:3005/v1/agesp";
const initialState = {
  requester: {
    vacancyDateOpen: "",
    requesterName: "",
    manager: "",
    responsible: "",
    hiringReason: "",
    replacedEmployee: "",
    initialSalary: "",
    status: "",
    admissionDate: "",
    obsToHiring: "",
    vacancyDateClose: "",
    requesterName: "",
    requesterArea: "",
    postExpSalary: "",
    obsOrSalaryRemarks: "",
    workDayStyle: "",
    entranceDayHour: "",
    exitDayHour: "",
  },
  list: [],
};

export default class Vacancies extends Component {
  state = { ...initialState };

  componentWillMount() {
    axios(`${baseUrl}/vacancy/${"list/"}`).then((resp) => {
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
      ? `${baseUrl}/vacancy/update/${requester._id}`
      : `${baseUrl}/vacancy/create/`;
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
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Abertura</label>
              <input
                type="date"
                className="form-control"
                name="vacancyDateOpen"
                required
                pattern="\d{4}-\d{2}-\d{2}"
                value={this.state.requester.vacancyDateOpen}
                onChange={(e) => this.updateField(e)}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Cargo/Função</label>
              <input
                type="text"
                className="form-control"
                name="positionOrFunction"
                value={this.state.requester.positionOrFunction}
                onChange={(e) => this.updateField(e)}
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
                name="sector"
                onChange={(e) => this.updateField(e)}
              >
                <option selected>{this.state.requester.sector}</option>
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
              <label>Gestor</label>
              <input
                type="text"
                className="form-control"
                name="manager"
                value={this.state.requester.manager}
                onChange={(e) => this.updateField(e)}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Responsável</label>
              <input
                type="text"
                className="form-control"
                name="responsible"
                value={this.state.requester.responsible}
                onChange={(e) => this.updateField(e)}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Motivo</label>
              <select
                type="text"
                className="form-control"
                name="hiringReason"
                onChange={(e) => this.updateField(e)}
              >
                <option selected>{this.state.requester.hiringReason}</option>
                <option value="Aumento Efetivo">Aumento Efetivo</option>
                <option value="Substituição">Substituição</option>
                <option value="Temporário">Temporário</option>
                <option value="Estagiário">Estagiário</option>
                <option value="Aprendiz">Aprendiz</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>A ser substituído</label>
              <input
                type="text"
                className="form-control"
                name="replacedEmployee"
                value={this.state.requester.replacedEmployee}
                onChange={(e) => this.updateField(e)}
              ></input>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Salário Inicial</label>
              <input
                type="text"
                className="form-control"
                name="initialSalary"
                value={this.state.requester.initialSalary}
                onChange={(e) => this.updateField(e)}
              ></input>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Status da vaga</label>
              <select
                type="text"
                className="form-control"
                name="status"
                onChange={(e) => this.updateField(e)}
              >
                <option selected>{this.state.requester.status}</option>
                <option value="Aberta">Aberta</option>
                <option value="Cancelada">Cancelada</option>
                <option value="Congelada">Congelada</option>
                <option value="Fechada">Fechada</option>
                <option value="Suspensa">Suspensa</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Data da Admissão</label>
              <input
                type="date"
                className="form-control"
                name="admissionDate"
                onChange={(e) => this.updateField(e)}
                value={this.state.requester.adminissionDate}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Obs da contratação</label>
              <textarea
                rows="5"
                type="text"
                className="form-control"
                name="obsToHiring"
                value={this.state.requester.obsToHiring}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite qualquer comentário sobre a contratação se necessário..."
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Fechamento da vaga</label>
              <input
                type="date"
                className="form-control"
                name="vacancyDateClose"
                onChange={(e) => this.updateField(e)}
                value={this.state.requester.vacancyDateClose}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Solicitante</label>
              <input
                type="text"
                className="form-control"
                name="requesterName"
                value={this.state.requester.requesterName}
                onChange={(e) => this.updateField(e)}
              ></input>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Área do solicitante</label>
              <select
                type="text"
                className="form-control"
                name="requesterArea"
                onChange={(e) => this.updateField(e)}
              >
                <option selected>{this.state.requester.requesterArea}</option>
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
              <label>Pós experiência</label>
              <InputMoneyMask
                type="text"
                className="form-control"
                name="postExpSalary"
                value={this.state.requester.postExpSalary}
                onChange={(e) => this.updateField(e)}
                placeholder="R$00.00"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Obs da contratação</label>
              <textarea
                rows="5"
                type="text"
                className="form-control"
                name="obsOrSalaryRemarks"
                value={this.state.requester.obsOrSalaryRemarks}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite qualquer comentário sobre o salário da contratação se necessário..."
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Jornada de trabalho</label>
              <select
                type="text"
                className="form-control"
                name="workDayStyle"
                onChange={(e) => this.updateField(e)}
              >
                <option selected>{this.state.requester.workDayStyle}</option>
                <option value="Horário da Fábrica">Horário da Fábrica</option>
                <option value="administrativeHour">
                  Horário Administrativo
                </option>
                <option value="Horário Lojas">Horário Lojas</option>
                <option value="Horário Diferenciado">
                  Horário Diferenciado
                </option>
                <option value="Sem controle de jornada">
                  Sem controle de jornada
                </option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Entrada expediente</label>
              <select
                type="number"
                className="form-control"
                name="entranceDayHour"
                onChange={(e) => this.updateField(e)}
              >

                <option selected>{this.state.requester.entranceDayHour}</option>
                <option value="06:00">06:00</option>
                <option value="06:30">06:30</option>
                <option value="07:00">07:00</option>
                <option value="07:30">07:30</option>
                <option value="08:00">08:00</option>
                <option value="08:30">08:30</option>
                <option value="09:00">09:00</option>
                <option value="09:30">09:30</option>
                <option value="10:00">10:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
                <option value="11:30">11:30</option>
                <option value="12:00">12:00</option>
                <option value="12:30">12:30</option>
                <option value="13:00">13:00</option>
                <option value="13:30">13:30</option>
                <option value="14:00">14:00</option>
                <option value="14:30">14:30</option>
                <option value="15:00">15:00</option>
                <option value="15:30">15:30</option>
                <option value="16:00">16:00</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Entrada expediente</label>
              <select
                type="number"
                className="form-control"
                name="exitDayHour"
                onChange={(e) => this.updateField(e)}
              >

                <option selected>{this.state.requester.exitDayHour}</option>
                <option value="10:00">10:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
                <option value="11:30">11:30</option>
                <option value="12:00">12:00</option>
                <option value="12:30">12:30</option>
                <option value="13:00">13:00</option>
                <option value="13:30">13:30</option>
                <option value="14:00">14:00</option>
                <option value="14:30">14:30</option>
                <option value="15:00">15:00</option>
                <option value="15:30">15:30</option>
                <option value="16:00">16:00</option>
                <option value="16:30">16:30</option>
                <option value="17:00">17:00</option>
                <option value="17:30">17:30</option>
                <option value="18:00">18:00</option>
                <option value="18:30">18:30</option>
                <option value="19:00">19:00</option>
                <option value="19:30">19:30</option>
                <option value="20:00">20:00</option>
                <option value="20:30">20:30</option>
                <option value="21:00">21:00</option>
                <option value="21:30">21:30</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <button className="btn btn-primary" onClick={(e) => this.save(e)}>
              Salvar
            </button>
            <button
              className="btn btn-secondary ml-2"
              onClick={(e) => this.clear(e)}
            >
              Limpar
            </button>
          </div>
        </div>
      </div>
    );
  }
  load(requester) {
    this.setState({ requester });
  }

  remove(requester) {
    axios.delete(`${baseUrl}/vacancy/delete/${requester._id}`).then((resp) => {
      const list = this.getUpdatedList(requester, false);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
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
            <th>Observações da contratação</th>
            <th>Ações</th>
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
          <td>{requester.obsToHiring}</td>
          <td>
            <button
              className="btn btn-warning ml-2"
              onClick={() => this.load(requester)}
            >
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.remove(requester)}
            >
              <i className="fa-solid fa-trash"></i>
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
