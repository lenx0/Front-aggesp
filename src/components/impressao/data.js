import React from "react";

const baseUrl = "http://localhost:3005/v1/agesp";


axios(`${baseUrl}/vacancy${"/list"}`).then((resp) => {
    this.setState({ list: resp.data });
    console.log(`Dados da lista:${JSON.stringify(resp.data)}`);
});
