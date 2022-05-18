import ModeloTabelaFornecedor from './ModeloTabelaFornecedor.js'
import NaoEncontrado from '../../erros/NaoEncontrado.js'

export default {
  listar () {
    return ModeloTabelaFornecedor.findAll({ raw: true })
  },
  inserir (fornecedor) {
    return ModeloTabelaFornecedor.create(fornecedor)
  },
  async pegarPorId (id) {
    const encontrado = await ModeloTabelaFornecedor.findOne({ where: { id } })

    if (!encontrado) throw new NaoEncontrado('Fornecedor')

    return encontrado
  },

  atualizar (id, dadosParaAtualizar) {
    return ModeloTabelaFornecedor.update(
      dadosParaAtualizar, { where: { id } }
    )
  },

  remover (id) {
    return ModeloTabelaFornecedor.destroy({ where: { id } })
  }
}
