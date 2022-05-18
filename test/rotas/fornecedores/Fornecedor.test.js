import Fornecedor from "../../../rotas/fornecedores/Fornecedor.js"
// jest.mock("../../../rotas/fornecedores/TabelaFornecedor.js")

describe('Classe Fornecedor', () => {

  test('O método validar() retorna true', async () => {
    const fornecedor = new Fornecedor({
      empresa: 'Gatito',
      email: 'contato@gatito.com.br',
      categoria: 'brinquedos'
    })

    await fornecedor.criar()

    expect(fornecedor.validar()).toBe(true)
  })

  // test('O método criar() retorna true', async () => {
  //   const fornecedor = new Fornecedor({
  //     empresa: 'Gatito',
  //     email: 'contato@gatito.com.br',
  //     categoria: 'brinquedos'
  //   })

  //   await fornecedor.criar()

  //   expect(fornecedor.id).toBe(500)
  //   expect(fornecedor.data_criacao).toBe("10/12/3420")
  //   expect(fornecedor.data_atualizacao).toBe("10/12/3420")
  //   expect(fornecedor.versao).toBe(90)
  // })

})
