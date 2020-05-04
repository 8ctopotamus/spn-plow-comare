import React, { useContext } from 'react'
import styled from 'styled-components'
import AppContext from '../context'

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Icon = styled.span`
  margin-left: 6px;
  &::after {
    content: '⊚';
  }
`

const Badge = styled.span`
  display: flex;
  align-items: center;
  background: #cd2653;
  border-radius: 8px;
  padding: 5px 10px;
  color: white;
  cursor: pointer;
  margin-left: 12px;
  &:hover ${Icon} {
    &::after {
      content: '⊗';
    }
  }
`

export default () => {
  const { state, dispatch } = useContext(AppContext)
  return (
    <Flex>
      <button
        onClick={() => dispatch({ type: 'CHANGE_VIEW' })} 
        style={{ marginRight: 'auto' }}
      >
        {`Compare ${state.compare.length} plow${state.compare.length === 1 ? '' : 's'}`}
      </button>
      { state.compare.map(p => (
        <Badge
          onClick={() => dispatch({
            type: 'TOGGLE_COMPARE',
            payload: p,
          })}
          key={p.ID}
        >
          {p.post_name}
          <Icon />
        </Badge>
      )) }
    </Flex>
  )
}