import "./Vacancies.css";
import React, { Component } from "react";
import axios from "axios";
import Main from "../../template/main/Main";
import InputMoneyMask from "../../template/inputMask/InputMoneyMask";


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
    status: "",
    vacancyDateOpen: "",
    requesterName: "",
    requesterArea: "",
    admissionDate: "",
    positionOrFunction: "",
    replacedEmployee: "",
    initialSalary: "",
    sector: "",
    postExpSalary: "",
    workDay: "",
    obsOrSalaryRemarks: "",
    selectiveProcess: "",
    entranceDayHour: "",
    exitDayHour: "",
    firstWeekDay: "",
    lastWeekDay: "",
    entranceLunchHour: "",
    exitLunchHour: "",
    obsOfficeHour: "",
    requerimentsForPosition: "",
  },
  list: [],
};

export default class Vacancies extends Component {
  state = { ...initialState };

  componentWillMount() {
    axios(`${baseUrl}/vacancy/${"list/"}`).then((resp) => {
      this.setState({ list: resp.data });
      console.log(`Dados da lista:${JSON.stringify(resp.data)}`);
      //axios.delete(`${baseUrl}/${user._id}`)
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
              <label>Status</label>
              <select
              defaultValue={'DEFAULT'}
                type="text"
                className="form-control"
                name="status"
                onChange={(e) => this.updateField(e)}
              >
                <option value="DEFAULT" disabled>Choose</option>
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
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                name="requesterName"
                value={this.state.requester.requesterName}
                onChange={(e) => this.updateField(e)}
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
                name="requesterArea"
                onChange={(e) => this.updateField(e)}
              >
                <option selected>{this.state.requester.requesterArea}</option>
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
              <label>Processo Seletivo</label>
              <select
                type="text"
                className="form-control"
                name="selectiveProcess"
                onChange={(e) => this.updateField(e)}
              >
                <option selected>
                  {this.state.requester.selectiveProcess}
                </option>
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
              <label>Funcionário suplente</label>
              <input
                type="text"
                className="form-control"
                name="replacedEmployee"
                value={this.state.requester.replacedEmployee}
                onChange={(e) => this.updateField(e)}
                placeholder="Insira o nome"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Abertura</label>
              <input
                type="date"
                className="form-control"
                name="vacancyDateOpen"
                value={this.state.requester.vacancyDateOpen}
                onChange={(e) => this.updateField(e)}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Admissão/Início</label>
              <input
                type="date"
                className="form-control"
                name="admissionDate"
                value={this.state.requester.admissionDate}
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
              <label>Salário inicial</label>
              <InputMoneyMask
                type="text"
                className="form-control"
                name="initialSalary"
                value={this.state.requester.initialSalary}
                onChange={(e) => this.updateField(e)}
                placeholder="R$00.00"
              />
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
              <label>Jornada de trabalho</label>
              <select
                type="text"
                className="form-control"
                name="workDay"
                onChange={(e) => this.updateField(e)}
              >
                <option value="industryHour">Horário da Fábrica</option>
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
                <option value={this.state.requester.entranceDayHour}></option>
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
              <label>Saída expediente</label>
              <select
                type="number"
                className="form-control"
                name="exitDayHour"
                onChange={(e) => this.updateField(e)}
              >
                <option value={this.state.requester.exitDayHour}></option>
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
              <label>Primeiro dia</label>
              <select
                type="text"
                className="form-control"
                name="firstWeekDay"
                
                onChange={(e) => this.updateField(e)}
              >
                <option value={this.state.requester.firstWeekDay}></option>
                <option value="monday">Segunda</option>
                <option value="third">Terça</option>
                <option value="fourth">Quarta</option>
                <option value="thursday">Quinta</option>
                <option value="friday">Sexta</option>
                <option value="saturday">Sábado</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Último dia</label>
              <select
                type="text"
                className="form-control"
                name="lastWeekDay"
                onChange={(e) => this.updateField(e)}
              >
                <option value={this.state.requester.lastWeekDay}></option>
                <option value="monday">Segunda</option>
                <option value="third">Terça</option>
                <option value="fourth">Quarta</option>
                <option value="thursday">Quinta</option>
                <option value="friday">Sexta</option>
                <option value="saturday">Sábado</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Entrada intervalo</label>
              <select
                type="number"
                className="form-control"
                name="entranceLunchHour"
                onChange={(e) => this.updateField(e)}
              >
                <option value={this.state.requester.entranceLunchHour}></option>
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
              <label>Saída intervalo</label>
              <select
                type="number"
                className="form-control"
                name="exitLunchHour"
                onChange={(e) => this.updateField(e)}
              >
                <option value={this.state.requester.exitLunchHour}></option>
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
              <label>Observações sobre o salário</label>
              <textarea
                rows="5"
                type="text"
                className="form-control"
                name="obsOrSalaryRemarks"
                value={this.state.requester.obsOrSalaryRemarks}
                onChange={(e) => this.updateField(e)}
                placeholder="Insira as observações"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Observações sobre o expediente</label>
              <textarea
                rows="5"
                type="text"
                className="form-control"
                name="obsOfficeHour"
                value={this.state.requester.obsOfficeHour}
                onChange={(e) => this.updateField(e)}
                placeholder="Insira as observações"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Requisitos para o cargo</label>
              <textarea
                rows="5"
                type="text"
                className="form-control"
                name="requerimentsForPosition"
                value={this.state.requester.requerimentsForPosition}
                onChange={(e) => this.updateField(e)}
                placeholder="Insira as observações"
              />
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
            <th>Status</th>
            <th>Abertura da vaga</th>
            <th>Cargo</th>
            <th>Setor</th>
            <th>Gestor</th>
            <th>Responsável</th>
            <th>Motivo</th>
            <th>Salário</th>
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
          <td>{requester.status}</td>
          <td>{requester.vacancyDateOpen}</td>
          <td>{requester.positionOrFunction}</td>
          <td>{requester.requesterName}</td>
          <td>{requester.sector}</td>
          <td>{requester.manager}</td>
          <td>{requester.responsible}</td>
          <td>{requester.requesterArea}</td>
          <td>{requester.replacedEmployee}</td>
          <td>{requester.admissionDate}</td>
          <td>{requester.initialSalary}</td>
          <td>{requester.postExpSalary}</td>
          <td>{requester.obsOrSalaryRemarks}</td>
          <td>{requester.entranceDayHour}</td>
          <td>{requester.firstDayWeek}</td>
          <td>{requester.lastDayWeek}</td>
          <td>{requester.exitDayHour}</td>
          <td>{requester.entranceLunchHour}</td>
          <td>{requester.exitLunchHour}</td>
          <td>{requester.workDay}</td>
          <td>{requester.requerimentsForPosition}</td>
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
