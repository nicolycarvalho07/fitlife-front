"use client";
import { useState, useEffect } from "react";

function App() {
  const [planos, setPlanos] = useState<any[]>([]);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");

  async function carregarPlanos() {
    const response = await fetch("http://localhost:3333/planos");
    const data = await response.json();
    setPlanos(data);
  }

  useEffect(() => {
    carregarPlanos();
  }, []);

  async function cadastrar(e: React.FormEvent) {
    e.preventDefault();

    await fetch("http://localhost:3333/planos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, valor: Number(valor) })
    });

    setNome("");
    setValor("");
    carregarPlanos();
  }

  return (
    <div>
      <h1>FitLife - Planos</h1>

      <form onSubmit={cadastrar}>
        <input 
          placeholder="Nome do plano" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
        />
        <input 
          placeholder="Valor" 
          value={valor} 
          onChange={(e) => setValor(e.target.value)} 
        />
        <button type="submit">Cadastrar</button>
      </form>

      <h2>Lista de Planos</h2>
      <ul>
        {planos.map((plano: any) => (
          <li key={plano.id}>
            {plano.nome} - R$ {plano.valor}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;