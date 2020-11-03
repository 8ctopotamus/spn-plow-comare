import React, { useContext, useEffect } from 'react'
import { MdClose, MdRemoveCircleOutline, MdCompareArrows, MdSearch, MdControlPoint } from 'react-icons/md'
import { BiSlider } from 'react-icons/bi'
import styled, { keyframes } from 'styled-components'
import { darken, lighten } from 'polished'
import AppContext from '../context'
import CONSTANTS from '../constants'

const breathe = keyframes`
  0% { background: ${darken(0.2, CONSTANTS.COLORS.PRIMARY)}; }
  50% { background: ${CONSTANTS.COLORS.PRIMARY}; }
  100% { background: ${darken(0.2, CONSTANTS.COLORS.PRIMARY)}; }
`

const Nav = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #072056;
  width: 100%;
  z-index: 20;
  @media (min-width: ${CONSTANTS.BREAKPOINTS.MD}) {
    align-items: stretch;
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
  background-color: ${darken(0.15, CONSTANTS.COLORS.PRIMARY)};
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
  &:hover {
    background-color: ${lighten(0.15, CONSTANTS.COLORS.PRIMARY)};
    background-blend-mode: color-dodge;
  }
  @media(max-width: ${CONSTANTS.BREAKPOINTS.MD}) {
    display: none;
  }
`

// color: ${darken(0.2, CONSTANTS.COLORS.PRIMARY)};
const Button = styled.button`
  display: grid;
  place-items: center;
  grid-gap: 10px;
  grid-template-columns: 1fr 4fr;
  border: none;
  background: ${darken(0.1, CONSTANTS.COLORS.SECONDARY)};
  font-weight: bold;
  color: white;
  &:disabled {
    animation: ${breathe} 2.5s ease-in-out infinite;
    background: ${darken(0.1, CONSTANTS.COLORS.PRIMARY)};
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

  const renderButtonText = () => {
    if (!isCompareView) {
      if (numLoaded < 2) {
        return <><MdControlPoint />{' '}Select plows</>
      }
      return <><MdCompareArrows />{' '}COMPARE {numLoaded} PLOW{numLoaded === 1 ? '' : 's'}</>
    }
    return <><MdSearch/>{' '}PLOW SEARCH</>
  }

  useEffect(() => { 
    if (isCompareView && notEnoughPlows)
      dispatch({ type: 'CHANGE_VIEW', payload: 'SEARCH' })
  }, [numLoaded])

  return (
    <Nav>
      <SidebarToggle onClick={() => dispatch({type: 'SET_SIDEBAR', payload: !state.sidebarOpen})}>
        { state.sidebarOpen 
          ? <MdClose size="30" />
          : <BiSlider size="30" /> }
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
          {p.post_title}
          {' '}
          <MdRemoveCircleOutline />
        </Badge>
      )) }

      <Button
        onClick={() => dispatch({ type: 'CHANGE_VIEW' })}
        disabled={notEnoughPlows}
      >
        { renderButtonText() }
      </Button>
    </Nav>
  )
}