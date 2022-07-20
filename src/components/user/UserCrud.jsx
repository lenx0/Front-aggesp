import React, { Component } from "react";
import axios from "axios";
import Main from "../template/Main";

const headerProps = {
  icon: "users",
  title: " Usuários",
  subtitle: "Cadastro de usuários",
};

const baseUrl = "http://localhost:3001/users";
const initialState = {
  user: { name: "", email: "" },
  list: [],
};

export default class UserCrud extends Component {
  state = { ...initialState };

  clear() {
    this.setState({ user: initialState.user });
  }

  save() {
    const user = this.state.user; //obtém o usuário
    const method = user.id ? "put" : "post"; //se o id existir, então atualiza, senão, cria o usuário
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl; //se o id exisitr, passe a url + o id, senão passe apenas a url para criar o usuário
    axios[method](url, user).then((resp) => {
      const list = this.getUpdatedList(resp.data);
      this.setState({ user: initialState.user, list });
    });
  }

  getUpdatedList(user) {
    const list = this.state.list.filter((u) => u.id !== user.id);
    list.unshift(user);
    return list;
  }

  render() {
    return <Main {...headerProps}>Cadastro de Usuário</Main>;
  }
}
