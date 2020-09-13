import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { MdFilterList, MdClose } from 'react-icons/md'
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

const Icon = styled.span`
  margin-left: 6px;
  &::after {
    content: '⊚';
  }
`
// background: ${darken(0.3), CONSTANTS.COLORS.PRIMARY}
const Badge = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 5px 10px;
  color: white;
  cursor: pointer;
  margin-left: 12px;
  &:hover {
    background: rgba(255,255,255,0.25);
    ${Icon} {
      &::after {
        content: '⊗';
      }
    }
  }
  @media(max-width: ${CONSTANTS.BREAKPOINTS.MD}) {
    display: none;
  }
`

const Button = styled.button`
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
    ? `Back to Search`
    : `Compare ${numLoaded} plow${numLoaded === 1 ? '' : 's'}`

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
          <Icon />
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