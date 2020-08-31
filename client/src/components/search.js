import React, { useContext } from 'react'
import styled from 'styled-components'
import AppContext from '../context/index'
import MultiRange from './multirange'

const FieldGroup = styled.div`
  display:flex;
  flex-direction: column;
`

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
        let Control
        switch(key) {
          case 'blade_width_expanded':
            Control = (
              <MultiRange 
                handleFinalRangeChange={values => dispatch({ 
                  type: 'BLADE_WIDTH_CHANGE', 
                  payload: {
                    name: key,
                    values,
                  } 
                })}           
              />
            )
            break
          default:
            Control = Object.values(val).map(v => (val !== '' ? (
              <label key={v}>
                <input
                  name={key}
                  value={v}
                  onChange={e => dispatch({ type: 'TOGGLE_FILTER', payload: e.target })}
                  type="checkbox"
                /> {v}
              </label>
            ) : null))
        }

        return val !== '' ? (
          <FieldGroup key={key}>
            <h4>{key}</h4>
            {Control}
          </FieldGroup>
        ) : null
      })}      
    </>
  )
}