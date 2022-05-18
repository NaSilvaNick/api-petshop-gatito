export default class DadosNaoFornecidos extends Error {
  constructor () {
    super('Sem dados para atualizar')
    this.name = 'DadosNaoFornecidos'
    this.idErro = 2
  }
}
