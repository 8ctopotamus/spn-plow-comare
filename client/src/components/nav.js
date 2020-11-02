import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { MdFilterList, MdClose, MdRemoveCircleOutline } from 'react-icons/md'
import { darken } from 'polished'
import AppContext from '../context'
import CONSTANTS from '../constants'

const Nav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
  background: #23448a;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 20;
  @media (min-width: ${CONSTANTS.BREAKPOINTS.MD}) {
    height: 60px;
  }
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
  background-color: ${darken(0.1, CONSTANTS.COLORS.PRIMARY)};
  ${({backgroundImage}) => backgroundImage ? `background-image: url(${backgroundImage})` : null};
  background-blend-mode: overlay;
  background-size: cover;
  background-position: 0;
  color: ${CONSTANTS.COLORS.SECONDARY};
  font-weight: bold;
  padding: 5px 10px;
  height: 100%;
  width: 160px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: inset -16px 0px 26px black;
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
  @media (min-width: ${CONSTANTS.BREAKPOINTS.MD}) {
    font-size: 22px;
    padding: 15px;
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
          backgroundImage={p.featured_image}
          onClick={() => dispatch({
            type: 'TOGGLE_COMPARE',
            payload: p,
          })}
          key={p.ID}
        >
          {/* {p.featured_image && (
            <Image
              src={p.featured_image}
              alt={p.post_name}
            />
          )} */}
          {p.post_title}
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