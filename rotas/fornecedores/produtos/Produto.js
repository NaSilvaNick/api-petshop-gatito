import TabelaProduto from "./TabelaProduto.js";
import CampoInvalido from "../../../erros/CampoInvalido.js";
import DadosNaoFornecidos from "../../../erros/DadosNaoFornecidos.js";

export default class Produto {
    constructor({id, titulo, preco, estoque, fornecedor, data_criacao, data_atualizacao, versao}){
        Object.assign(this, {id, titulo, preco, estoque, fornecedor, data_criacao, data_atualizacao, versao})
    }
    
    validar () {
        if(typeof this.titulo !== 'string' || this.titulo.length === 0) {
            throw new CampoInvalido("Titulo");
        }

        if(typeof this.preco !== 'number' || this.preco == 0){
            throw new CampoInvalido("Preço");
        }
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
        return TabelaProduto.remover(this.id,this.fornecedor);
    }

    async carregar () {
        const produto = await TabelaProduto.pegarPorId(this.id, this.fornecedor);
        const {titulo, preco, estoque, fornecedor, data_criacao, data_atualizacao, versao} = produto;
        Object.assign(this, {titulo, preco, estoque, fornecedor, data_criacao, data_atualizacao, versao});
    }

    atualizar () {
        const dadosParaAtualizar = {}

        if (typeof this.titulo === 'string' && this.titulo.length > 0)
            dadosParaAtualizar.titulo = this.titulo;

        if(typeof this.preco === 'number' && this.preco > 0)
            dadosParaAtualizar.preco = this.preco;
    
        if(typeof this.estoque === 'number')
            dadosParaAtualizar.estoque = this.estoque;

        if(Object.keys(dadosParaAtualizar).length === 0)
            throw new DadosNaoFornecidos();
        
        return TabelaProduto.atualizar(
            {
                id: this.id,
                fornecedor: this.fornecedor
            },
            dadosParaAtualizar
        );
    }

    diminuirEstoque(){
        return TabelaProduto.subtrair(this.id,this.fornecedor,'estoque',this.estoque);
    }
}