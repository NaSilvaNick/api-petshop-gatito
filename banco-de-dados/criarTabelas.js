import ModeloTabelaFornecedor from "../rotas/fornecedores/ModeloTabelaFornecedor.js";
import ModeloTabelaProduto from "../rotas/fornecedores/produtos/ModeloTabelaProduto.js";

const modelos = [
  ModeloTabelaFornecedor,
  ModeloTabelaProduto
];

modelos.forEach(async modelo => {
    try {
        await modelo.sync()
        console.log("\nTabelas Criadas com sucesso\n")
    } catch (error) {
        console.log({ error: error.message });
    }
});