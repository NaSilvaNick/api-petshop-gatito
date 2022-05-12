import express from "express";
import TabelaProduto from "./TabelaProduto.js";

const roteador = express.Router({ mergeParams: true});

roteador.get('/', async (requisicao,resposta) => {
    const produtos = await TabelaProduto.listar(requisicao.params.idFornecedor);

    resposta.send(
        JSON.stringify(
            [{certinho: "Deu certo papai", produtos}]
        )
    )
});

export default roteador;