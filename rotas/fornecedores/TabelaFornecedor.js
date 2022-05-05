import ModeloTabelaFornecedor from "./ModeloTabelaFornecedor.js";

export default {
    listar() {
        return ModeloTabelaFornecedor.findAll()
    }
}