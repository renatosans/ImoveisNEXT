import ReactDom from 'react-dom'
import React, { useState } from 'react'
import PropertyForm from './PropertyForm'
import { mutation } from '../utils/mutation'


export const PropertySelect = ({imoveis, parentRef }) => {
    const [selected, setSelected] = useState(0);

    const updateImovel = () => {
        const root = ReactDom.createRoot(document.getElementById('panel'));

        const propertyForm = React.createElement(PropertyForm, { id: parseInt(selected), parentRef: parentRef }, null);
        root.render(propertyForm);
    }

    const deleteImovel = () => {
        // const message = 'Deseja realmente excluir o imóvel ?';

        mutation('deleteImovel', { id: parseInt(selected) }, )
        .then( (response) => {
            parentRef.mutate() // atualiza o componente pai
            imoveis ? setSelected(imoveis.data.getImoveis[0].id) : setSelected(0)
        })
        .catch((error) => console.error(error))
    }

	return (
        <>
            <select onChange={(e) => setSelected(e.target.value)} >{
                imoveis ?
                imoveis.data.getImoveis.map( (imovel) => 
                    <option value={imovel.id} key={imovel.id} selected={imovel.id == selected}>{imovel.endereco}</option> ) :
                <option value={0} key={0} >Nenhum imóvel encontrado</option>
            }
            </select>
            <button onClick={updateImovel} style={{"margin-left": "0.5rem"}}>Editar</button>
            <button onClick={deleteImovel} style={{"margin-left": "0.5rem"}}>Excluir</button>
        </>
    )
}
