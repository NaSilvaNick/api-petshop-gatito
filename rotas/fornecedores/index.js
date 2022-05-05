import express from "express";
import TabelaFornecedor from "./TabelaFornecedor.js";

const roteador = express.Router();

roteador.use("/", async (requisicao,resposta) => {
    const resultados = await TabelaFornecedor.listar()
    resposta.send(JSON.stringify(resultados));
});

export default roteador;