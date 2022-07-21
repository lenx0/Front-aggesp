/*import { useState } from "react";

export default function Integration() {
  const [cliente, setCliente] = useState({});

  async function obterCliente() {
    const resp = await fetch("http://localhost:3005/v1/agesp/find/62d8556110321430e8c65925")
    const dados = await resp.json()
    setCliente(JSON.stringify(dados))
    console.log(`Dados: ${JSON.stringify(dados)}`)
    
    // fetch("http://localhost:3005/v1/agesp/list-all")
    // .then((resp) => resp.json())
    // .then((dados) => setCliente(JSON.stringify(dados)));
  }

  return (
    <div>
      <button onClick={obterCliente}>Obter Cliente</button>
      <ul>
        <li>Código: {cliente.id}</li>
        <li>Nome: {cliente.name}</li>
        <li>Email: {cliente.email}</li>
      </ul>
    </div>
  );
}*/
