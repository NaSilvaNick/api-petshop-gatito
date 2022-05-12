import ModeloTabelaProduto from "./ModeloTabelaProduto.js";

export default {
    listar (idFornecedor){
        return ModeloTabelaProduto.findAll({
            where: {
                fornecedor: idFornecedor
            }
        });
    }
}