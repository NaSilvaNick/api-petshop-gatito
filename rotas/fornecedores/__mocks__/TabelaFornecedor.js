import ModeloTabelaFornecedor from './ModeloTabelaFornecedor.js'
import NaoEncontrado from '../../erros/NaoEncontrado.js'

export default {
  listar () {
    return []
  },
  inserir (fornecedor) {
    return {
      id: 500,
      data_criacao: "10/12/3420",
      data_atualizacao: "10/12/3420",
      versao: 90
    }
  },
  async pegarPorId (id) {
    return {
      id: 500,
      data_criacao: "10/12/3420",
      data_atualizacao: "10/12/3420",
      versao: 90
    }
  },

  async atualizar (id, dadosParaAtualizar) {
  },

  async remover (id) {
  }
}


