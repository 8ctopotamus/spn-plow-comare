import React, { useContext } from 'react'
import AppContext from '../context/index'

export default () => {
  const { state, dispatch, criteria } = useContext(AppContext)
  
  return (
    <input 
      onChange={e => dispatch({ type: 'UPDATE_SEARCH', payload: e.target.value })} 
      placeholder="Keyword search" 
      type="search" 
    />
  )
}