import React, { Component } from 'react';

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

export default class Data extends Component {
  state = { ...initialState };

  componentWillMount() {
    axios(`${baseUrl}/vacancy${"/list"}`).then((resp) => {
      const result = resp.data;
      this.setState({ list: result });
    });
  }

  clear() {
    this.setState({ requester: initialState.requester });
  }
}
