import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { MdFilterList, MdClose, MdRemoveCircleOutline } from 'react-icons/md'
import { darken } from 'polished'
import AppContext from '../context'
import CONSTANTS from '../constants'

const Nav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #23448a;
`

const SidebarToggle = styled.div`
  display: none;
  cursor: pointer;
  svg { fill: white; }
  margin-left: 15px;
  margin-right: auto;
  @media (max-width: ${CONSTANTS.BREAKPOINTS.MD}) {
    display: block;
  }
`

// background: ${darken(0.3), CONSTANTS.COLORS.PRIMARY}
const Badge = styled.div`
  display: flex;
  align-items: center;
  color: ${CONSTANTS.COLORS.SECONDARY};
  font-weight: bold;
  border-radius: 8px;
  margin-left: 12px;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background: rgba(255,255,255,0.25);
  }
  @media(max-width: ${CONSTANTS.BREAKPOINTS.MD}) {
    display: none;
  }
`

const Button = styled.button`
  border: none;
  background: ${darken(0.1, CONSTANTS.COLORS.SECONDARY)};
  color: ${darken(0.2, CONSTANTS.COLORS.PRIMARY)};
  font-weight: bold;
  &:disabled {
    background: none;
    color: white;
    opacity: 0.5;
  }
`

export default () => {
  const { state, dispatch } = useContext(AppContext)
  const numLoaded = state.compare.length
  const notEnoughPlows = numLoaded < 2
  const isCompareView = state.view === 'COMPARE'
  const buttonText = isCompareView
    ? `PLOW SEARCH`
    : `COMPARE ${numLoaded} PLOW${numLoaded === 1 ? '' : 's'}`

  useEffect(() => { 
    if (isCompareView && notEnoughPlows)
      dispatch({ type: 'CHANGE_VIEW', payload: 'SEARCH' })
  }, [numLoaded])

  return (
    <Nav>
      <SidebarToggle onClick={() => dispatch({type: 'SET_SIDEBAR', payload: !state.sidebarOpen})}>
        { state.sidebarOpen 
          ? <MdClose size="30" />
          : <MdFilterList size="30" /> }
      </SidebarToggle>

      { state.compare.map(p => (
        <Badge
          onClick={() => dispatch({
            type: 'TOGGLE_COMPARE',
            payload: p,
          })}
          key={p.ID}
        >
          {p.post_name}
          {' '}
          <MdRemoveCircleOutline />
        </Badge>
      )) }

      <Button
        onClick={() => dispatch({ type: 'CHANGE_VIEW' })}
        disabled={notEnoughPlows}
      >
        {buttonText}
      </Button>
    </Nav>
  )
}