import ValorNaoSuportado from "./erros/ValorNaoSuportado.js";

export default class Serializador {
    json (dado) {
        return JSON.stringify(dado);
    }

    serializar (dados) {
        if (this.contentType === "application/json") {
            return this.json(dados);
        }

        throw new ValorNaoSuportado(this.contentType);
    }

}