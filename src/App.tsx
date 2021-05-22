import React, { useState, useEffect, useCallback } from 'react';

import { uuid } from 'uuidv4'

import { api } from './services/api';

interface IData {
  id: string;
  name: string;
  price: number;
}

const App: React.FC = () => {
  const [data, setData] = useState<IData[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [fruta, setFruta] = useState<string>('')
  const [frutaValue, setFrutaValue] = useState<any>()

  useEffect(() => {
    console.log(isLoad)
    api.get('data').then(
      response => {
        setData(response.data)
      }
    )
  }, [isLoad]);

  const convertoToCurrency = useCallback(
    (value: number) => {
      return Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' })
        .format(value)
    }, []
  )

  const addToApi = useCallback(
    () => {
      setIsLoad(true)
      api.post('data', {
        id: uuid,
        name: fruta,
        price: frutaValue
      }).then(
        response => alert('Tudo certo')
      ).catch(e => alert('error')).finally(() => { setIsLoad(false) })
    }, [uuid, fruta, frutaValue]
  )

  return (
    <div>
      <h1>Hello</h1>

      <ul>
        {data.map(frut => (
          <li key={frut.id}>
            {frut.name} | {convertoToCurrency(frut.price)}
          </li>
        ))}
      </ul>
      <hr />
      { isLoad ? (
        <div>
          <p>Aguade, carregando....</p>
        </div>
      ) : (
        <div>
          <input type="text"
            onChange={e => setFruta(e.target.value)}
            placeholder="Qual fruta"
          />
          <input type="number"
            onChange={e => setFrutaValue(parseFloat(e.target.value))}
            placeholder="qual valor"
          />
          <button onClick={addToApi} >Adicionar</button>
        </div>
      )}
    </div>
  );
}

export default App;