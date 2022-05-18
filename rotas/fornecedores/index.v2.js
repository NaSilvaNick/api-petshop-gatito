import express from 'express'
import TabelaFornecedor from './TabelaFornecedor.js'
import Fornecedor from './Fornecedor.js'
import { SerializadorFornecedor } from '../../Serializador.js'
import roteadorProdutos from './produtos/index.js'

const roteador = express.Router()

roteador.options('/', (requisicao, resposta) => {
  resposta
    .set('Access-Control-Allow-Methods', 'GET')
    .set('Access-Control-Allow-Headers', 'Content-Type')
    .status(200)
    .end()
})

roteador.get('/', async (requisicao, resposta) => {
  const resultados = await TabelaFornecedor.listar()
  const serializador = new SerializadorFornecedor(resposta.getHeader('Content-Type'))
  resposta.status(200).send(
    serializador.serializar(resultados)
  )
})

const verificarFornecedor = async (requisicao, resposta, proximo) => {
  try {
    const id = requisicao.params.idFornecedor
    const fornecedor = new Fornecedor({ id })
    await fornecedor.carregar()
    requisicao.fornecedor = fornecedor
    proximo()
  } catch (error) {
    proximo(error)
  }
}

roteador.use('/:idFornecedor/produtos', verificarFornecedor, roteadorProdutos)

export default roteador
