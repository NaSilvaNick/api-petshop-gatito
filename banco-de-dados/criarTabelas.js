import ModeloTabelaFornecedor from "../rotas/fornecedores/ModeloTabelaFornecedor.js";

ModeloTabelaFornecedor
    .sync()
    .then(() => console.log("\nTabela criada com sucesso!"))