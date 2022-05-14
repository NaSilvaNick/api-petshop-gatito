import TabelaProduto from "./TabelaProduto.js"


export default class Produto {
    constructor({id, titulo, preco, estoque, fornecedor, data_criacao, data_atualizacao, versao}){
        Object.assign(this, {id, titulo, preco, estoque, fornecedor, data_criacao, data_atualizacao, versao})
    }

    async criar() {
        this.validar()
        const resultado = await TabelaProduto.inserir({
            titulo: this.titulo,
            preco: this.preco,
            estoque: this.estoque,
            fornecedor: this.fornecedor
        })

        this.id = resultado.id;
        this.data_criacao = resultado.data_criacao;
        this.data_atualizacao = resultado.data_atualizacao;
        this.versao = resultado.versao;
    }

    apagar () {
        return TabelaProduto.remover(this.id,this.fornecedor)
    }

    validar () {
        if(typeof this.titulo !== 'string' || this.titulo.length === 0) {
            throw new Error("O campo titulo está inválido");
        }

        if(typeof this.preco !== 'number' || this.preco == 0){
            throw new Error("O campo preco está inválido");
        }
    }
}