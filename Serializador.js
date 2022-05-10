import ValorNaoSuportado from "./erros/ValorNaoSuportado.js";

export class Serializador {
    json (dado) {
        return JSON.stringify(dado);
    }

    serializar (dados) {
        if (this.contentType === "application/json")
            return this.json(
                this.filtrar(dados)
            );

        throw new ValorNaoSuportado(this.contentType);
    }

    filtrarObjetos(dados){
        const novoObjeto = {};
        
        this.camposPublicos.forEach(campo => {
            if(dados.hasOwnProperty(campo))
                novoObjeto[campo] = dados[campo];
        });

        return novoObjeto;
    }

    filtrar(dados){
        if(Array.isArray(dados))
            dados = dados.map(fornecedor => this.filtrarObjetos(fornecedor));
        else {
            dados = this.filtrarObjetos(dados);
        }
        return dados;
    }
}

export class SerializadorFornecedor extends Serializador {
    constructor(contentType){
        super();
        this.contentType = contentType;
        this.camposPublicos = ['id','empresa','categoria'];
    }
}

export const formatosAceitos = ['application/json'];