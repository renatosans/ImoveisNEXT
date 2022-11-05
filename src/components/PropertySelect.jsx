import useSWR from 'swr'
import React, { useState } from 'react'
import { fetcher2 } from '../utils/defaults'
import { mutation } from '../utils/mutation'


const query = `{
  getImoveis {
    id
    endereco
  }
}
`

export const PropertySelect = ({parentRef}) => {
    const [selected, setSelected] = useState(0);
    const { data: imoveis, error, isValidating, mutate } = useSWR(query, fetcher2)

    const deleteImovel = () => {
        // const message = 'Deseja realmente excluir o imóvel ?';

        mutation('deleteImovel', { id: parseInt(selected)}, )
        .then( (response) => {
            mutate() // atualiza as opções do dropdown
            parentRef.mutate() // atualiza o componente pai
            imoveis ? setSelected(imoveis.data.getImoveis[0].id) : selected(0)
        })
        .catch((error) => console.error(error))
    }

	return (
        <>
            <select onChange={(e) => setSelected(e.target.value)} >{
                imoveis ?
                imoveis.data.getImoveis.map( (imovel) => <option value={imovel.id} key={imovel.id}>{imovel.endereco}</option> ) :
                <option value={0} key={0} >Nenhum imóvel encontrado</option>
            }
            </select>
            <button onClick={deleteImovel} >Retirar do Site</button>
        </>
    )
}
