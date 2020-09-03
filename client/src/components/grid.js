import React from 'react';
import styled from 'styled-components'
import CONSTANTS from '../constants.js'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ cols }) => cols ? cols : 1}, 1fr);
  grid-gap: ${({ gap }) => gap ? gap : 0};
  @media(max-width: ${CONSTANTS.BREAKPOINTS.SM}) {
    display: block;
  }
`;

export default ({ children, cols, gap }) => (
  <Grid cols={cols} gap={gap}>
    { children }
  </Grid>
)