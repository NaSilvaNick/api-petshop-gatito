import Sequelize from 'sequelize'
import instancia from '../../banco-de-dados/index.js'

const colunas = {
  empresa: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  categoria: {
    type: Sequelize.ENUM('ração', 'brinquedos'),
    allowNull: false
  }
}

const opcoes = {
  freezeTableName: true,
  tableName: 'fornecedores',
  timestamps: true,
  createdAt: 'data_criacao',
  updatedAt: 'data_atualizacao',
  version: 'versao'
}

export default instancia.define('fornecedor', colunas, opcoes)
