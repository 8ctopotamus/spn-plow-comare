import React, { useState } from 'react'
import styled from 'styled-components'
import { MdFilterList, MdClose } from 'react-icons/md'
import CONSTANTS from '../constants'

const Sidebar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${CONSTANTS.NAV_WIDTH};
  background: ${CONSTANTS.COLORS.PRIMARY};
  color: white;
  height: 100%;
  z-index: 100;
  padding: 82px 15px;
  ul {
    list-style-type: none;
    margin-left: 0;
  }
  input[type="checkbox"] {
    margin: 0 10px 0 0;
  }
  @media (max-width: ${CONSTANTS.BREAKPOINTS.MD}) {
    display: ${props => props.open ? 'block' : 'none'};
  }
`

const SidebarToggle = styled.div`
  display: none;
  position: absolute;
  top: 22px;
  left: 30px;
  z-index: 1000;
  cursor: pointer;
  svg { fill: white; }
  @media (max-width: ${CONSTANTS.BREAKPOINTS.MD}) {
    display: block;
  }
`

export default ({ children }) => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!open)
  return (
    <>
    <SidebarToggle>
      <div onClick={toggleOpen}>
        { open 
          ? <MdClose size="30" />
          : <MdFilterList size="30" />
        }
      </div>
    </SidebarToggle>
    <Sidebar open={open} className="animated slideInLeft">
      { children }
    </Sidebar>
    </>
  )
}