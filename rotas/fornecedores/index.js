import express from "express";
import TabelaFornecedor from "./TabelaFornecedor.js";
import Fornecedor from "./Fornecedor.js";
import { SerializadorFornecedor } from "../../Serializador.js";
import roteadorProdutos from "./produtos/index.js";

const roteador = express.Router();

roteador.options("/", (requisicao,resposta) => {
    resposta
        .set("Access-Control-Allow-Methods", "GET, POST")
        .set("Access-Control-Allow-Headers", "Content-Type")
        .status(200)
        .end();
});

roteador.options("/:idFornecedor", (requisicao,resposta) => {
    resposta
        .set("Access-Control-Allow-Methods", "GET, PUT, DELETE")
        .set("Access-Control-Allow-Headers", "Content-Type")
        .status(200)
        .end();
});

roteador.get("/", async (requisicao,resposta) => {
    const resultados = await TabelaFornecedor.listar()
    const serializador = new SerializadorFornecedor(
        resposta.getHeader('Content-Type'), ['empresa']);
    resposta.status(200).send(
        serializador.serializar(resultados)
    );
});

roteador.get("/:idFornecedor", async (requisicao,resposta,proximo) => {
    try {
        const id = requisicao.params.idFornecedor;
        const serializador = new SerializadorFornecedor(
            resposta.getHeader('Content-Type'),
            ['email', 'empresa', 'data_criacao', 'data_atualizacao', 'versao']
        );
        const fornecedor = new Fornecedor({id:id});
        await fornecedor.carregar();
        resposta.status(200).send(
            serializador.serializar(fornecedor)
        );
    } catch (error) {
        proximo(error);
    }
});

roteador.post("/", async (requisicao,resposta,proximo) => {
    try {
        const dadosRecebidos = requisicao.body;
        const serializador = new SerializadorFornecedor(
            resposta.getHeader('Content-Type'), ['empresa']);
        const fornecedor = new Fornecedor(dadosRecebidos);
        await fornecedor.criar();
        resposta.status(201).send(
            serializador.serializar(fornecedor)
        );    
    } catch (error) {
        proximo(error);
    }
});

roteador.put("/:idFornecedor", async (requisicao,resposta,proximo) => {
    try {
        const id = requisicao.params.idFornecedor;
        const dadosRecebidos = requisicao.body;
        const dados = Object.assign({}, dadosRecebidos, { id: id });
        const fornecedor = new Fornecedor(dados);
        await fornecedor.atualizar();
        resposta.status(204).end()
    } catch (error) {
        proximo(error);
    }
});

roteador.delete("/:idFornecedor", async (requisicao,resposta,proximo) => {
    try {
        const id = requisicao.params.idFornecedor;
        const fornecedor = new Fornecedor({id:id});
        await fornecedor.carregar();
        await fornecedor.remover();
        resposta.status(204).end();
    } catch (error) {
        proximo(error);
    }
});

const verificarFornecedor = async (requisicao,resposta,proximo) => {
    try {
        const id = requisicao.params.idFornecedor;
        const fornecedor = new Fornecedor({ id: id });
        await fornecedor.carregar();
        requisicao.fornecedor = fornecedor;
        proximo()
    } catch(error){
        proximo(error);
    }
};

roteador.use("/:idFornecedor/produtos", verificarFornecedor, roteadorProdutos);

export default roteador;