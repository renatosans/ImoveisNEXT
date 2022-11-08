import useSWR from 'swr'
import React, { useState } from 'react'
import { fetcher2 } from '../src/utils/defaults'
import { mutation } from '../src/utils/mutation'
import { PropertySelect } from '../src/components/PropertySelect'


const url = '/api/graphql'
const query = `
  query {
    getImoveis {
      id
      endereco
      descricao
      valorVenda
      valorLocacao
  }
}
`

const Index = () => {
  const { data: imoveis, error, isValidating, mutate } = useSWR(query, fetcher2)

  const [imovel, setImovel] = useState({
    "endereco": "",
    "descricao": "",
    "valorVenda": 0.01,     // faz a coerção do tipo, API GraphQL fortemente tipada
    "valorLocacao": 0.01
  })

  const onChange = (e) => {
    if (e.target.type === 'number') {
      // fixa em 2 casas decimais o valor do campo, API GraphQL fortemente tipada
      setImovel({...imovel, [e.target.name]: parseFloat(e.target.value) + 0.01, })
      return;
    }

    setImovel({...imovel, [e.target.name]: e.target.value, })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutation(`createImovel`, imovel)
    .then( (response) => {
      mutate() // atualiza a lista de imóveis
    })
    .catch((error) => console.error(error))
  }

  return (
    <>
      <h1>GraphQL</h1>
      <pre>{JSON.stringify(imoveis, null, 2)}</pre>

      <PropertySelect imoveis={imoveis} parentRef={{mutate}} ></PropertySelect>
      <form>
        <fieldset style={{"display": "flex", "flexDirection": "column", "width": "25rem"}}>
          <label htmlFor="endereco">Endereço</label>
          <input type="text" name="endereco" onChange={onChange} />
          <label htmlFor="descricao">Descricao</label>
          <input type="text" name="descricao" onChange={onChange} />
          <label htmlFor="valorVenda">Valor de Venda</label>
          <input type="number" step="9.99" name="valorVenda" onChange={onChange} />
          <label htmlFor="valorLocacao">Valor de Locação</label>
          <input type="number" step="9.99" name="valorLocacao" onChange={onChange} />
        </fieldset>
        <button type="submit" onClick={handleSubmit} >Salvar</button>
      </form>
    </>
  )
}

export default Index
