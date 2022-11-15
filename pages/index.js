import useSWR from 'swr'
import React from 'react'
import ReactDom from 'react-dom'
import { fetcher2 } from '../src/utils/defaults'
import PropertyForm from '../src/components/PropertyForm'
import PropertySelect from '../src/components/PropertySelect'


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

  function addImovel() {
    const root = ReactDom.createRoot(document.getElementById('panel'));

    const propertyForm = React.createElement(PropertyForm, {id: undefined, parentRef: { mutate } }, null);
    root.render(propertyForm);
  }

  return (
    <>
      <div id="panel"></div>

      <button onClick={addImovel} >Novo</button>
      <h1>GraphQL</h1>
      <pre>{JSON.stringify(imoveis, null, 2)}</pre>

      <PropertySelect imoveis={imoveis} parentRef={{mutate}} ></PropertySelect>
    </>
  )
}

export default Index
