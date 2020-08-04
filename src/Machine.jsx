import React, { useState } from 'react';
import { Machine, interpret } from 'xstate'

import { games } from './games'

export const Context = React.createContext({})
export const { Provider } = Context

const STATES = Object.keys(games)

// machine setup
const remove = (list, item) => list.filter(i => i !== item)
const objify = list => list.reduce((acc, obj) => 
  ({ ...acc, [obj]: obj }), {})

const mutuallyExclusiveStates = states => states.reduce(
  (machineStates, state) => ({
    ...machineStates,
    [state]: { 
      on: {
        ...objify(remove(states, state))
      }, 
      activities: ['keepTime']
    }
  })
, {})

const Model = Machine({
  id: 'game',
  initial: STATES[0],
  states: mutuallyExclusiveStates(STATES),
  context: {
    time: new Date(),
    interval: 1000
  },
},
{
  activities: {
    keepTime: (context, activity) => {
      const interval = setInterval(() => { 
        Model.context.time = new Date()
      }, context.interval)

      return () => clearInterval(interval)
    }
  }
})

const service = interpret(Model)
  
const MachineProvider = ({ children }) => {
  const [ game, _setGame ] = useState('')

  service.start()

  const setGame = ({ target: {value} }) =>
    _setGame(service.send(value).value)

  return (
    <Provider value={{ game, setGame }}>
      { children }
    </Provider>
  )
}


export default MachineProvider
