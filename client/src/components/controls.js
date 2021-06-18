import React, { useContext } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { MdRestore } from 'react-icons/md'
import AppContext from '../context/index'
import MultiRange from './multirange'
import Checkbox from './checkbox'
import ControlGroup from './control-group'
import CONSTANTS from '../constants'

const Heading = styled.p`
  color: ${CONSTANTS.COLORS.SECONDARY};
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 5px;
  padding: 0 15px;
  text-transform: uppercase;
  
`

const SearchInput = styled.input`
  padding: 15px;
  color: white;
  border-top: none;
  border-left: none;
  border-right: none;
  border-color: transparent;
  width: 100% !important;
  outline: none;
  margin-bottom: 0;
  background: ${darken(0.1, CONSTANTS.COLORS.PRIMARY)};
  ::placeholder {
    color: white;
  }
  &:focus {
    outline: none;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom-color: ${CONSTANTS.COLORS.SECONDARY};
    background: ${darken(0.2, CONSTANTS.COLORS.PRIMARY)};
  }
`

const Reset = styled.button`
  cursor: pointer;
  text-align: right;
  width: auto;
  margin: 15px;
  &:hover {
    background: rgba(255,255,255,.25);
  }
`

export default () => {
  const { state, dispatch, controls } = useContext(AppContext)

  return (
    <>
      <div style={{padding: '0 15px'}}>
        <Heading>SEARCH</Heading>
      </div>
        <SearchInput 
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
            // TODO: memoize min max
            const min = Math.min(...controls.blade_width_expanded)
            const max = Math.max(...controls.blade_width_expanded)
            Control = (
              <div style={{paddingLeft: 12, paddingRight: 12}}>
                <MultiRange 
                  min={min}
                  max={max}
                  handleFinalRangeChange={values => dispatch({ 
                    type: 'BLADE_WIDTH_CHANGE', 
                    payload: {
                      name: key,
                      values,
                    } 
                  })}           
                />
              </div>
            )
            break
          default:
            Control = Object.values(val).map(v => (val !== '' ? (
              <Checkbox 
                name={key}
                value={v} 
                onChange={e => dispatch({ type: 'TOGGLE_FILTER', payload: e.target })}
                key={`${key}-${val}`} 
              />
            ) : null))
        }

        return val !== '' ? (
          <ControlGroup key={key} heading={<Heading>{key}</Heading>}>
            {Control}
          </ControlGroup>
        ) : null
      })}
      <Reset onClick={() => dispatch({ type: 'RESET' })} type="button">
        <MdRestore size="14px" />
        {' '}
        Reset
      </Reset>      
    </>
  )
}