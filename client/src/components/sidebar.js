import React, { useContext } from 'react'
import styled from 'styled-components'
import { transparentize } from 'polished'
import CONSTANTS from '../constants'
import AppContext from '../context'

const Sidebar = styled.div`
  background: ${CONSTANTS.COLORS.PRIMARY};
  color: white;
  height: 100%;
  min-height: ${CONSTANTS.APP_MIN_HEIGHT};
  padding-top: 60px;
  z-index: 10;
  @media (max-width: ${CONSTANTS.BREAKPOINTS.MD}) {
    display: ${props => props.open ? 'block' : 'none'};
    position: absolute;
    width: 100%;
    background-color: ${transparentize(.05, CONSTANTS.COLORS.PRIMARY)};
  }
`

const Overflow = styled.div`
  max-height: 100vh;
  overflow-y: auto;
`

export default ({ children }) => {
  const { state } = useContext(AppContext)

  return (    
    <Sidebar open={state.sidebarOpen} className="animated slideInLeft">
      <Overflow>
        { children }
      </Overflow>
    </Sidebar>
  )
}