import React, { useContext, useState } from 'react';

import { Context } from './Machine'
import { games } from './games'

const App = () => {
  const { game, setGame } = useContext(Context)
  const [ result, setResult ] = useState('')

  const gameFn = games[game]

  return (
    <div className="App">
      <h1>{game || "choose a game"}</h1>

      <select onChange={setGame} value={game}>
        <option value=''>Choos</option>
        {
          Object.keys(games).map(game =>
            <option key={game} value={game}>{game}</option>
          )
        }
      </select>

      <p>{gameFn && gameFn(result)}</p>

      <input 
        type='text' 
        placeholder='your name here' 
        onKeyUp={({ target: {value} }) => setResult(value)} />
    </div>
  )
}

export default App;
