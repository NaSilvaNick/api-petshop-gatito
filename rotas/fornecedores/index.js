import express from "express";
import TabelaFornecedor from "./TabelaFornecedor.js";
import Fornecedor from "./Fornecedor.js";

const roteador = express.Router();

roteador.get("/", async (requisicao,resposta) => {
    const resultados = await TabelaFornecedor.listar()
    resposta.send(JSON.stringify(resultados));
});

roteador.post("/", async (requisicao,resposta) => {
    const dadosRecebidos = requisicao.body;
    const fornecedor = new Fornecedor(dadosRecebidos);
    await fornecedor.criar();
    resposta.send(JSON.stringify(fornecedor));
});

roteador.get("/:idFornecedor", async (requisicao,resposta) => {
    try {
        const id = requisicao.params.idFornecedor;
        const fornecedor = new Fornecedor({id:id});
        await fornecedor.carregar();
        resposta.send(JSON.stringify(fornecedor));
    } catch (error) {
        resposta.send(JSON.stringify({message: error.message}));
    }
});

roteador.put("/:idFornecedor", async (requisicao,resposta) => {
    try {

        const id = requisicao.params.idFornecedor;
        const dadosRecebidos = requisicao.body;
        const dados = Object.assign({}, dadosRecebidos, { id: id });
        const fornecedor = new Fornecedor(dados);
        await fornecedor.atualizar();
        resposta.end()

    } catch (error) {
        resposta.send(JSON.stringify({message: error.message}));
    }
});

export default roteador;