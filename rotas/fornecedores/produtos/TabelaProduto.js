import Modelo from "./ModeloTabelaProduto.js";
import instancia from "../../../banco-de-dados/index.js";
import NaoEncontrado from "../../../erros/NaoEncontrado.js";

export default {
    listar (idFornecedor){
        return Modelo.findAll({
            where: {
                fornecedor: idFornecedor
            },
            raw: true
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
    },
    async pegarPorId(id, idFornecedor) {
        const encontrado = await Modelo.findOne({
            where: {
                id: id,
                fornecedor: idFornecedor
            },
            raw: true
        });

        if(!encontrado) {
            throw new NaoEncontrado("Produto");
        }

        return encontrado;
    },
    atualizar(dadosDoProduto,dadosParaAtualizar){
        return Modelo.update(
            dadosParaAtualizar,
            {
                where: dadosDoProduto
            }
        );
    },
    subtrair(idProduto, idFornecedor, campo, quantidade){
        return instancia.transaction(async transacao => {
            const produto = await Modelo.findOne({
                where: {
                    id: idProduto,
                    fornecedor: idFornecedor
                }
            });

            produto[campo] = quantidade;

            await produto.save();

            return produto;
        });
    }
}