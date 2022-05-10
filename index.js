import express from "express";
import bodyParser from "body-parser";
import config from "config";
import roteador from "./rotas/fornecedores/index.js";
import NaoEncontrado from "./erros/NaoEncontrado.js";
import CampoInvalido from "./erros/CampoInvalido.js";
import DadosNaoFornecidos from "./erros/DadosNaoFornecidos.js";
import ValorNaoSuportado from "./erros/ValorNaoSuportado.js";
import { formatosAceitos, SerializadorError } from "./Serializador.js";

const app = express();

app.use(bodyParser.json());

app.use((requisicao,resposta,proximo) => {
    let formatoRequisitado = requisicao.header('Accept');

    if(formatoRequisitado === "*/*") { formatoRequisitado = "application/json"; }

    if (formatosAceitos.indexOf(formatoRequisitado) === -1){
        resposta.status(406).end();
        return;
    }

    resposta.setHeader('Content-Type', formatoRequisitado);
    proximo();
});

app.use("/api/fornecedores", roteador);

app.use((error, requisicao, resposta, proximo) => {
    const serializador = new SerializadorError(resposta.getHeader("Content-Type"))
    let status = 500;
    
    if (error instanceof NaoEncontrado) status = 404;
    if (error instanceof CampoInvalido || error instanceof DadosNaoFornecidos) status = 400;
    if (error instanceof ValorNaoSuportado) status = 406;

    resposta.status(status).send(
        serializador.serializar({
            message: error.message,
            id: error.idErro
        })
    );
});

app.listen(
    config.get("api.port"),
    () => console.log(`A API está funcionando na porta ${config.get("api.port")}`)
)

export default app;