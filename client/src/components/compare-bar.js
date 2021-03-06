import React, { useContext, useEffect } from 'react'
import { MdClose, MdRemoveCircleOutline, MdCompareArrows, MdSearch, MdControlPoint } from 'react-icons/md'
import { BiSlider } from 'react-icons/bi'
import styled, { keyframes } from 'styled-components'
import { darken, lighten } from 'polished'
import AppContext from '../context'
import CONSTANTS from '../constants'
import WP_DATA from '../context/wp_data'

const breathe = keyframes`
  0% { background: ${darken(0.2, CONSTANTS.COLORS.PRIMARY)}; }
  50% { background: ${lighten(0.1, CONSTANTS.COLORS.PRIMARY)}; }
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
  &:focus {
    background: ${darken(0.15, CONSTANTS.COLORS.SECONDARY)};
  }
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
      return <><MdCompareArrows size="30" />{' '}COMPARE {numLoaded} PLOW{numLoaded === 1 ? '' : 's'}</>
    }
    return <><MdSearch/>{' '}PLOW SEARCH</>
  }

  useEffect(() => { 
    if (isCompareView && notEnoughPlows)
      dispatch({ type: 'CHANGE_VIEW', payload: 'SEARCH' })
  }, [numLoaded])

  return (
    <Nav>
      {state.view === 'SEARCH' && (
        <SidebarToggle onClick={() => dispatch({type: 'SET_SIDEBAR', payload: !state.sidebarOpen})}>
          { state.sidebarOpen 
            ? <MdClose size="30" />
            : <BiSlider size="30" /> }
        </SidebarToggle>
      )}

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
        disabled={notEnoughPlows}
        onClick={() => {
          // Note: SPN decided that we will no longer show the comparison in-app...
          // dispatch({ type: 'CHANGE_VIEW' })

          // ...instead, we will open to another page to show the comparison.
          const compareSlug = state.compare
            .map(({plow_categories, post_name}) => `${plow_categories && plow_categories.length > 0 && `${plow_categories[0]}_`  }${post_name}`)
            .join('__vs__')
          window.open(`${WP_DATA.site_url}/compare/${compareSlug}`)
        }}
      >
        { renderButtonText() }
      </Button>
    </Nav>
  )
}