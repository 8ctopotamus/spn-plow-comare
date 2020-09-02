import React, { useContext } from 'react'
import AppContext from '../context'
import Compare from '../views/compare'

export default () => {
  const { state } = useContext(AppContext)
  return state.view === 'COMPARE' 
    ? <Compare />
    : <Search />
}