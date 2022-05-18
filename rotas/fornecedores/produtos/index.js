import express from 'express'
import TabelaProduto from './TabelaProduto.js'
import Produto from './Produto.js'
import { SerializadorProduto } from '../../../Serializador.js'

const roteador = express.Router({ mergeParams: true })

roteador.options('/', (requisicao, resposta) => {
  resposta
    .set('Access-Control-Allow-Methods', 'GET, POST')
    .set('Access-Control-Allow-Headers', 'Content-Type')
    .status(200)
    .end()
})

roteador.options('/:id', (requisicao, resposta) => {
  resposta
    .set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, HEAD')
    .set('Access-Control-Allow-Headers', 'Content-Type')
    .status(200)
    .end()
})

roteador.options('/:id/diminuir-estoque', (requisicao, resposta) => {
  resposta
    .set('Access-Control-Allow-Methods', 'POST')
    .set('Access-Control-Allow-Headers', 'Content-Type')
    .status(200)
    .end()
})

roteador.get('/', async (requisicao, resposta) => {
  const produtos = await TabelaProduto.listar(requisicao.fornecedor.id)
  const serializador = new SerializadorProduto(resposta.getHeader('Content-Type'))
  resposta.status(200).send(serializador.serializar(produtos))
})

roteador.head('/:id', async (requisicao, resposta, proximo) => {
  try {
    const dados = {
      id: requisicao.params.id,
      fornecedor: requisicao.fornecedor.id
    }
    const produto = new Produto(dados)
    await produto.carregar()

    const timestamp = new Date(produto.data_atualizacao).getTime()

    resposta
      .set('x-powered-by', 'Nickolas, o cara')
      .set('ETag', produto.versao)
      .set('Last-Modified', timestamp)
      .status(200)
      .end()
  } catch (error) {
    proximo(error)
  }
})

roteador.get('/:id', async (requisicao, resposta, proximo) => {
  try {
    const dados = {
      id: requisicao.params.id,
      fornecedor: requisicao.fornecedor.id
    }
    const produto = new Produto(dados)
    await produto.carregar()
    const serializador = new SerializadorProduto(
      resposta.getHeader('Content-Type'),
      ['preco', 'estoque', 'fornecedor', 'data_criacao', 'data_atualizacao', 'versao']
    )

    const timestamp = new Date(produto.data_atualizacao).getTime()

    resposta
      .set('ETag', produto.versao)
      .set('Last-Modified', timestamp)
      .status(200)
      .send(serializador.serializar(produto))
  } catch (error) {
    proximo(error)
  }
})

roteador.post('/', async (requisicao, resposta, proximo) => {
  try {
    const idFornecedor = requisicao.fornecedor.id
    const corpo = requisicao.body
    const dados = Object.assign({}, corpo, { fornecedor: idFornecedor })
    const produto = new Produto(dados)
    await produto.criar()
    const serializador = new SerializadorProduto(resposta.getHeader('Content-Type'))

    const timestamp = new Date(produto.data_atualizacao).getTime()

    resposta
      .set('ETag', produto.versao)
      .set('Last-Modified', timestamp)
      .set('Location', `/api/fornecedores/${produto.fornecedor}/produtos/${produto.id}`)
      .status(201)
      .send(serializador.serializar(produto))
  } catch (error) {
    proximo(error)
  }
})

roteador.put('/:id', async (requisicao, resposta, proximo) => {
  try {
    const dados = Object.assign(
      {},
      requisicao.body,
      {
        id: requisicao.params.id,
        fornecedor: requisicao.fornecedor.id
      }
    )
    const produto = new Produto(dados)
    await produto.atualizar()
    await produto.carregar()

    const timestamp = new Date(produto.data_atualizacao).getTime()

    resposta
      .set('ETag', produto.versao)
      .set('Last-Modified', timestamp)
      .status(204)
      .end()
  } catch (error) {
    proximo(error)
  }
})

roteador.delete('/:id', async (requisicao, resposta) => {
  const dados = {
    id: requisicao.params.id,
    fornecedor: requisicao.fornecedor.id
  }

  const produto = new Produto(dados)
  await produto.apagar()
  resposta.status(204).end()
})

roteador.post('/:id/diminuir-estoque', async (requisicao, resposta, proximo) => {
  try {
    const produto = new Produto({
      id: requisicao.params.id,
      fornecedor: requisicao.fornecedor.id
    })
    await produto.carregar()
    produto.estoque = produto.estoque - requisicao.body.quantidade
    await produto.diminuirEstoque()
    await produto.carregar()

    const timestamp = new Date(produto.data_atualizacao).getTime()

    resposta
      .set('ETag', produto.versao)
      .set('Last-Modified', timestamp)
      .status(204)
      .end()
  } catch (error) {
    proximo(error)
  }
})

export default roteador
