import express from "express";
import TabelaProduto from "./TabelaProduto.js";
import Produto from "./Produto.js";

const roteador = express.Router({ mergeParams: true});

roteador.get('/', async (requisicao,resposta) => {
    const produtos = await TabelaProduto.listar(requisicao.fornecedor.id);
    resposta.send(JSON.stringify(produtos));
});

roteador.post('/', async (requisicao,resposta,proximo) => {
    try {
        const idFornecedor = requisicao.fornecedor.id;
        const corpo = requisicao.body;
        const dados = Object.assign({}, corpo, { fornecedor: idFornecedor});
        const produto = new Produto(dados);
        await produto.criar();
        resposta.status(201).send(JSON.stringify(produto));
    } catch (error) {
        proximo(error);
    }
});

roteador.delete('/:id', async (requisicao,resposta) => {
    const dados = {
        id: requisicao.params.id,
        fornecedor: requisicao.fornecedor.id
    }

    const produto = new Produto(dados);
    await produto.apagar();
    resposta.status(204).end();
});

export default roteador;