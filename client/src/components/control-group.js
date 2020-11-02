import React, { useState } from 'react'
import styled from 'styled-components'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { darken } from 'polished'
import CONSTANTS from '../constants'

const iconSize = '30px'
const padding = '15px'

const ControlGroup = styled.div`
  & ul {
    list-style-type: none;
    margin-left: 0;
  }
  & input[type="checkbox"] {
    margin: 0 10px 0 0;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: ${padding};
  background: ${({active}) => active ? darken(0.1, CONSTANTS.COLORS.PRIMARY) : 'none'};
  &:hover {
    background: ${darken(0.15, CONSTANTS.COLORS.PRIMARY)};
  }
  @media (min-width: ${CONSTANTS.BREAKPOINTS.MD}) {
    & p {
      font-size: 18px;
    }
  }
`

const Body = styled.div`
  display:flex;
  flex-direction: column;
  background: ${darken(0.1, CONSTANTS.COLORS.PRIMARY)};
`

export default ({ heading, children }) => {
  const [open, setOpen] = useState(false)

  return (
    <ControlGroup>
      <Header active={open} onClick={() => setOpen(!open)}>
        {heading} 
        {' '}
        {open ? (
          <MdKeyboardArrowUp color={CONSTANTS.COLORS.SECONDARY} size={iconSize} />
        ) : ( 
          <MdKeyboardArrowDown color={CONSTANTS.COLORS.SECONDARY} size={iconSize} />
        )}
      </Header>
      {open && (
        <Body style={{ padding }}>{children}</Body>
      )}
    </ControlGroup>
  )
}