import useSWR from 'swr'
import { fetcher2 } from '../src/utils/defaults'
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

  return (
    <>
      <div id="panel"></div>

      <h1>GraphQL</h1>
      <pre>{JSON.stringify(imoveis, null, 2)}</pre>

      <PropertySelect imoveis={imoveis} parentRef={{mutate}} ></PropertySelect>
    </>
  )
}

export default Index
