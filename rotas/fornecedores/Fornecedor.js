import TabelaFornecedor from "./TabelaFornecedor.js"
import CampoInvalido from "../../erros/CampoInvalido.js";
import DadosNaoFornecidos from "../../erros/DadosNaoFornecidos.js";

export default class Fornecedor {
    constructor({id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao}){
        Object.assign(this, {id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao})
    }

    async criar () {
        this.validar();
        const resultado = await TabelaFornecedor.inserir({
            empresa: this.empresa,
            email: this.email,
            categoria: this.categoria
        });

        this.id = resultado.id;
        this.dataCriacao = resultado.dataCriacao;
        this.dataAtualizacao = resultado.dataAtualizacao;
        this.versao = resultado.versao;
    }

    async carregar () {

        const encontrado = await TabelaFornecedor.pegarPorId(this.id)
        const {empresa, email, categoria, dataCriacao, dataAtualizacao, versao} = encontrado;
        Object.assign(this, {empresa, email, categoria, dataCriacao, dataAtualizacao, versao});
    }

    async atualizar () {
        await TabelaFornecedor.pegarPorId(this.id);
        const campos = ['empresa','email','categoria'];
        const dadosParaAtualizar = {};

        campos.forEach(campo => {
            const valor = this[campo];
            if(typeof valor === "string" && valor.length > 0)
                dadosParaAtualizar[campo] = valor;
        });

        if(Object.keys(dadosParaAtualizar).length === 0)
            throw new DadosNaoFornecidos();

        await TabelaFornecedor.atualizar(this.id, dadosParaAtualizar);
    }

    async remover () {
        return TabelaFornecedor.remover(this.id);
    }

    validar () {
        const campos = ['empresa','email','categoria'];

        campos.forEach(campo => {
            const valor = this[campo];
            if (typeof valor !== 'string' || valor.length == 0)
                throw new CampoInvalido(campo);
        });
    }
}