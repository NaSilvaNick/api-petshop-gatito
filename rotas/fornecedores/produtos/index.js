import express from "express";
import TabelaProduto from "./TabelaProduto.js";
import Produto from "./Produto.js";
import { SerializadorProduto } from "../../../Serializador.js";

const roteador = express.Router({ mergeParams: true});

roteador.get('/', async (requisicao,resposta) => {
    const produtos = await TabelaProduto.listar(requisicao.fornecedor.id);
    const serializador = new SerializadorProduto(resposta.getHeader("Content-Type"));
    resposta.status(200).send(serializador.serializar(produtos));
});

roteador.get('/:id', async (requisicao,resposta,proximo) => {
    try {
        const dados = {
            id: requisicao.params.id,
            fornecedor: requisicao.fornecedor.id
        }
        const produto = new Produto(dados);
        await produto.carregar()
        const serializador = new SerializadorProduto(
            resposta.getHeader("Content-Type"),
            ['preco','estoque','fornecedor','data_criacao','data_atualizacao','versao']
        );
        
        resposta.status(200).send(serializador.serializar(produto));
    } catch (error) {
        proximo(error);
    }
});

roteador.post('/', async (requisicao,resposta,proximo) => {
    try {
        const idFornecedor = requisicao.fornecedor.id;
        const corpo = requisicao.body;
        const dados = Object.assign({}, corpo, { fornecedor: idFornecedor});
        const produto = new Produto(dados);
        await produto.criar();
        const serializador = new SerializadorProduto(resposta.getHeader("Content-Type"));
        resposta.status(201).send(serializador.serializar(produto));
    } catch(error) {
        proximo(error);
    }
});

roteador.put("/:id", async (requisicao,resposta,proximo) => {
    try {
        const dados = Object.assign(
            {},
            requisicao.body,
            {
                id: requisicao.params.id,
                fornecedor: requisicao.fornecedor.id
            }
        );
        const produto = new Produto(dados);
        await produto.atualizar();
        resposta.status(204).end();
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

roteador.post("/:id/diminuir-estoque", async (requisicao,resposta,proximo) => {
    try {
        const produto = new Produto({
            id: requisicao.params.id,
            fornecedor: requisicao.fornecedor.id
        });
        await produto.carregar();
        produto.estoque = produto.estoque - requisicao.body.quantidade
        await produto.diminuirEstoque();
        resposta.status(204).end();
    } catch (error) {
        proximo(error);
    }
});

export default roteador;