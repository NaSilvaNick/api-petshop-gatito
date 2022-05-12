import Sequelize from "sequelize";
import instancia from "../../../banco-de-dados/index.js";
import ModeloTabelaFornecedor from "../ModeloTabelaFornecedor.js";

const colunas = {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    estoque: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    fornecedor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: ModeloTabelaFornecedor,
            key: "id"
        }
    }
}

const opcoes = {
    freezeTableName: true,
    tableName: "produtos",
    timestamps: true,
    createdAt: "data_criacao",
    updatedAt: "data_atualizacao",
    version: "versao"
}

export default instancia.define("produto", colunas, opcoes);