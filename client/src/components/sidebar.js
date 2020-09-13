import React, { useContext } from 'react'
import styled from 'styled-components'
import CONSTANTS from '../constants'
import AppContext from '../context'

const Sidebar = styled.div`
  background: ${CONSTANTS.COLORS.PRIMARY};
  color: white;
  height: 100%;
  min-height: ${CONSTANTS.APP_MIN_HEIGHT};
  padding-top: 60px;
  @media (max-width: ${CONSTANTS.BREAKPOINTS.MD}) {
    display: ${props => props.open ? 'block' : 'none'};
    position: absolute;
    width: 100%;
  }
`

export default ({ children }) => {
  const { state } = useContext(AppContext)
  return (    
    <Sidebar open={state.sidebarOpen} className="animated slideInLeft">
      { children }
    </Sidebar>
  )
}