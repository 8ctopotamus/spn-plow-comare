import React, { useContext } from 'react'
import styled from 'styled-components'
import AppContext from '../context'

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Badge = styled.span`
  background: #cd2653;
  border-radius: 8px;
  padding: 5px 10px;
  color: white;
  cursor: pointer;
`
export default () => {
  const { state, dispatch } = useContext(AppContext)
  return (
    <Flex>
      <button
        onClick={() => dispatch({ type: 'CHANGE_VIEW' })} 
        style={{ marginRight: 'auto' }}
      >
        Compare ({state.compare.length})
      </button>

      { state.compare.map(p => (
        <Badge
          onClick={() => dispatch({ type: 'TOGGLE_COMPARE', payload: p })}
        >
          {p.post_name}
        </Badge>
      )) }
    </Flex>
  )
}