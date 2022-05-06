import ModeloTabelaFornecedor from "./ModeloTabelaFornecedor.js";

export default {
    listar() {
        return ModeloTabelaFornecedor.findAll();
    },
    inserir(fornecedor) {
        return ModeloTabelaFornecedor.create(fornecedor);
    },
    async pegarPorId(id) {
        const encontrado = await ModeloTabelaFornecedor.findOne({ where: { id: id }});

        if(!encontrado) throw new Error("Fornecedor não encontrado");

        return encontrado;
    },

    atualizar (id, dadosParaAtualizar) {
        return ModeloTabelaFornecedor.update(
            dadosParaAtualizar, { where: { id: id }}
        )
    }
}