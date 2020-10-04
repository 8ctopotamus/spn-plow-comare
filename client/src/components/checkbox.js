import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import CONSTANTS from '../constants'

const Checkmark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 7px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`

const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  &:checked ~ ${Checkmark} {
    background-color: ${darken(0.2, CONSTANTS.COLORS.SECONDARY)};
    &:after {
      display: block;
    }
  }
`

const Label = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 18px;
  user-select: none;
  &:hover input ~ ${Checkmark} {
    background-color: ${CONSTANTS.COLORS.SECONDARY};
  }
`

export default ({ name, value, onChange }) => (
  <Label>
    <Input
      name={name}
      value={value}
      onChange={onChange}
      type="checkbox"
    /> {value}
    <Checkmark />
  </Label>
)