import React, { useContext } from 'react'
import AppContext from '../context/index'

export default () => {
  const { state, dispatch, controls } = useContext(AppContext)
  
  return (
    <>
      <input 
        onChange={e => dispatch({ type: 'UPDATE_SEARCH', payload: e.target.value })} 
        value={state.search}
        placeholder="Keyword search" 
        type="search"
      />
      {Object.entries(controls).map(entry => {
        const [key, val] = entry
        return val !== '' ? (
          <div key={key}>
            <h4>{key}</h4>
            {Object.values(val).map(v => {
              return (
                <label key={v}>
                  <input
                    name={key}
                    value={v}
                    onChange={e => dispatch({ type: 'TOGGLE_FILTER', payload: e.target })}
                    type="checkbox"
                  /> {v}
                </label>
              )
            })}
          </div>
        ) : null
      })}      
    </>
  )
}