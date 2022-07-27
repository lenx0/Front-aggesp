import "./Vacancies.css";
import React, { Component } from "react";
import axios from "axios";
import Main from "../../template/main/Main";
import InputHourMask from "../../template/inputMask/InputHourMask";
import InputMoneyMask from "../../template/inputMask/InputMoneyMask";
import DatePicker from "../../template/inputMask/InputDateMask";

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
  vacancies: {
    status: "",
    dateTime: "",
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
    axios(`${baseUrl}/vacancy${"/list/"}`).then((resp) => {
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
      this.setState({ vacancies: initialState.requester, list });
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
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Status</label>
              <select type="text" className="form-control" name="workDay">
                <option value="opened">Aberta</option>
                <option value="canceled">Cancelada</option>
                <option value="frozen">Congelada</option>
                <option value="closed">Fechada</option>
                <option value="suspended">Suspensa</option>
              </select>
            </div>
          </div>
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
          <div className="col-12 col-md-3">
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
          <div className="col-12 col-md-4">
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
          <div className="col-12 col-md-8">
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
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Abertura</label>
              <DatePicker />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Admissão/Início</label>
              <DatePicker />
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
          <div className="col-12 col-md-2">
            <div className="form-group">
              <label>Salário inicial</label>
              <InputMoneyMask
                type="text"
                className="form-control"
                name="name"
                placeholder="R$00.00"
              />
            </div>
          </div>
          <div className="col-12 col-md-2">
            <div className="form-group">
              <label>Pós experiência</label>
              <InputMoneyMask
                type="text"
                className="form-control"
                name="name"
                placeholder="R$00.00"
              />
            </div>
          </div>
          <div className="col-12 col-md-2">
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
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Entrada expediente</label>
              <InputHourMask />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Saída expediente</label>
              <InputHourMask />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Primeiro dia</label>
              <select type="text" className="form-control" name="workDay">
                <option value="monday">Segunda</option>
                <option value="third">Terça</option>
                <option value="fourth">Quarta</option>
                <option value="thursday">Quinta</option>
                <option value="friday">Sexta</option>
                <option value="saturday">Sábado</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Último dia</label>
              <select type="text" className="form-control" name="workDay">
                <option value="monday">Segunda</option>
                <option value="third">Terça</option>
                <option value="fourth">Quarta</option>
                <option value="thursday">Quinta</option>
                <option value="friday">Sexta</option>
                <option value="saturday">Sábado</option>
              </select>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Entrada intervalo</label>
              <InputHourMask />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Saída intervalo</label>
              <InputHourMask />
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
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Observações sobre o expediente</label>
              <textarea
                rows="5"
                type="text"
                className="form-control"
                name="name"
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
                name="name"
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
  load(vacancies) {
    this.setState({ vacancies });
  }

  remove(vacancies) {
    axios.delete(`${baseUrl}/${vacancies._id}`).then((resp) => {
      const list = this.getUpdatedList(vacancies, false);
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
            <th>Salário</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }
  renderRows() {
    return this.state.list.map((vacancies) => {
      return (
        <tr key={vacancies._id}>
          <td>{vacancies.status}</td>
          <td>{vacancies.dateTime}</td>
          <td>{vacancies.name}</td>
          <td>{vacancies.area}</td>
          <td>{vacancies.replacement}</td>
          <td>{vacancies.temporary}</td>
          <td>{vacancies.intern}</td>
          <td>{vacancies.apprentice}</td>
          <td>{vacancies.admissionDateOrExpectDate}</td>
          <td>{vacancies.positionOrFunction}</td>
          <td>{vacancies.initialSalary}</td>
          <td>{vacancies.sector}</td>
          <td>{vacancies.postExpSalary}</td>
          <td>{vacancies.obsOrSalaryRemarks}</td>
          <td>{vacancies.industryHour}</td>
          <td>{vacancies.administrativeHour}</td>
          <td>{vacancies.shopHour}</td>
          <td>{vacancies.differentHour}</td>
          <td>{vacancies.noJourneyControl}</td>
          <td>{vacancies.entranceDay}</td>
          <td>{vacancies.exitDay}</td>
          <td>{vacancies.entranceLunch}</td>
          <td>{vacancies.exitLunch}</td>
          <td>{vacancies.requerimentsForPosition}</td>
          <td>{vacancies.status}</td>
          <td>
            <button
              className="btn btn-warning ml-2"
              onClick={() => this.load(vacancies)}
            >
              <i className="fa fa-pencil"></i>
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.remove(vacancies)}
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
