import { request } from '../utils/request'
import { mutation } from '../utils/mutation'
import { notification} from '../utils/defaults'
import { useState, useEffect } from 'react'
import { Button, Dialog } from '@mui/material'
import toast, { Toaster } from 'react-hot-toast'


export default function PropertyForm({id, parentRef}) {
const [open, setOpen] = useState(true);

const close = () => {
    setOpen(false);
}

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

    if (imovel.endereco === "" || imovel.descricao === "" || imovel.valorVenda === "") {
      toast.error('Alguns campos obrigatórios não foram preenchidos!', notification.options);
      return;
    }

    let operation = `createImovel`
    let variables = imovel
    if (Number.isInteger(id)) {
      operation = `updateImovel`
      variables = {...imovel, id: parseInt(id)}
    }
    mutation(operation, variables)
    .then( (response) => {
      parentRef.mutate() // atualiza a lista de imóveis
      close()
    })
    .catch((error) => toast.error(error.message, notification.options))
}

function fixDecimalPlaces(num) {
  const decimalPlaces = num % 1
  if (decimalPlaces == 0) return num + 0.01

  return num;
}

useEffect(() => {
    if (id) {
        // const url = '/api/graphql'
        const query = `getImovel(id: ${parseInt(id)}) {
            endereco
            descricao
            valorVenda
            valorLocacao
        }`
        request(query)
        .then((response) => {
          // faz a coerção do tipo, API GraphQL fortemente tipada
          let dadosImovel = response.data.data.getImovel;
          dadosImovel[`valorVenda`] = fixDecimalPlaces(dadosImovel[`valorVenda`]);
          dadosImovel[`valorLocacao`] = fixDecimalPlaces(dadosImovel[`valorLocacao`]);
          setImovel(dadosImovel)
        })
        .catch((error) => toast.error(error, notification.options))
    }
}, []);

return (
<>
    <Toaster />

    <Dialog open={open} onClose={close} >
        <form>
          <fieldset style={{"display": "flex", "flexDirection": "column", "width": "25rem"}}>
              <label htmlFor="endereco">Endereço</label>
              <input type="text" name="endereco" value={imovel.endereco} onChange={onChange} />
              <label htmlFor="descricao">Descricao</label>
              <input type="text" name="descricao" value={imovel.descricao} onChange={onChange} />
              <label htmlFor="valorVenda">Valor de Venda</label>
              <input type="number" step="100" name="valorVenda" value={imovel.valorVenda} onChange={onChange} />
              <label htmlFor="valorLocacao">Valor de Locação</label>
              <input type="number" step="100" name="valorLocacao" value={imovel.valorLocacao} onChange={onChange} />
          </fieldset>
          <button type="submit" onClick={handleSubmit} >Salvar</button>
        </form>
    </Dialog>
</>
)
}
