import Modelo from "./ModeloTabelaProduto.js";

export default {
    listar (idFornecedor){
        return Modelo.findAll({
            where: {
                fornecedor: idFornecedor
            }
        });
    },
    inserir(dados){
        return Modelo.create(dados);
    },
    remover (idProduto, idFornecedor) {
        return Modelo.destroy({
            where: {
                id: idProduto,
                fornecedor: idFornecedor
            }
        })
    }
}