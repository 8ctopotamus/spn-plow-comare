import React, { useContext } from 'react'
import AppContext from '../context/index'

export default () => {
  const { state, dispatch, controls } = useContext(AppContext)
  
  return (
    <>
      {Object.entries(controls).map(entry => {
        const [key, val] = entry
        console.log(entry)
        return <div>
          <h4>{key}</h4>
          {Object.values(val).map(v => (
            <label>
              <input type="checkbox"/> {v}
            </label>
          ))}
        </div>
      })}

      <input 
        onChange={e => dispatch({ type: 'UPDATE_SEARCH', payload: e.target.value })} 
        placeholder="Keyword search" 
        type="search" 
      />
      
    </>
  )
}