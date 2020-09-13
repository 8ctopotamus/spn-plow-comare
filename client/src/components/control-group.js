import React, { useState } from 'react'
import styled from 'styled-components'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { darken } from 'polished'
import CONSTANTS from '../constants'

const ControlGroup = styled.div`
  display:flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  :hover {
    background: ${darken(0.1, CONSTANTS.COLORS.PRIMARY)};
  }
`

export default ({ heading, children }) => {
  const [open, setOpen] = useState(false)

  return (
    <ControlGroup>
      <Header onClick={() => setOpen(!open)}>
        {heading} 
        {' '}
        {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </Header>
      {open && children}
    </ControlGroup>
  )
}