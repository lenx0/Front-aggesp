import React, { Component } from 'react';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import axios from "axios";



const baseUrl = "https://aggesp-api.altogiro.net/v1/agesp";
const initialState = {
  requester: [{
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
  }],
  list: [],
};

export default class Vagas extends Component {
  state = { ...initialState };

  componentWillMount() {
    axios(`${baseUrl}/vacancy${"/list"}`).then((resp) => {
      const result = resp.data;
      console.log(`Dados da lista:${JSON.stringify(resp.data)}`);
    });
  }

  clear() {
    this.setState({ requester: initialState.requester });
  }

  load(requester) {
    this.setState({ requester });
  }
}
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: "Clientes",
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45], // left, top, right, bottom
    },
  ];

  const dados = this.state.list.map((requester) => {
    return [
      { text: requester.vacancyDateOpen, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: requester.requesterName, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: requester.manager, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: requester.responsible, fontSize: 9, margin: [0, 2, 0, 2] },
    ];
  });

  const details = [
    {
      table: {
        headerRows: 1,
        widths: ["*", "*", "*", "*"],
        body: [
          [
            { text: "Código", style: "tableHeader", fontSize: 10 },
            { text: "Nome", style: "tableHeader", fontSize: 10 },
            { text: "E-mail", style: "tableHeader", fontSize: 10 },
            { text: "Telefone", style: "tableHeader", fontSize: 10 },
          ],
          ...dados,
        ],
      },
      layout: "lightHorizontalLines", // headerLineOnly
    },
  ];

  function Rodape(currentPage, pageCount) {
    return [
      {
        text: currentPage + " / " + pageCount,
        alignment: "right",
        fontSize: 9,
        margin: [0, 10, 20, 0], // left, top, right, bottom
      },
    ];
  }

  const docDefinitios = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],

    header: [reportTitle],
    content: [details],
    footer: Rodape,
  };

  pdfMake.createPdf(docDefinitios).download();
