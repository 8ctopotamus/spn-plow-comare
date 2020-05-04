import React, { useContext } from 'react'
import styled from 'styled-components'
import AppContext from '../context'

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
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

const Button = styled.button`
  margin-right: auto;
  &:disabled {
    opacity: 0.5;
  }
`

export default () => {
  const { state, dispatch } = useContext(AppContext)
  const numLoaded = state.compare.length
  return (
    <Flex>
      <Button
        onClick={() => dispatch({ type: 'CHANGE_VIEW' })}
        disabled={numLoaded < 2}
      >
        {`Compare ${numLoaded} plow${numLoaded === 1 ? '' : 's'}`}
      </Button>
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