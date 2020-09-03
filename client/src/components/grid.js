import React from 'react';
import styled from 'styled-components'
import CONSTANTS from '../constants.js'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 60px;
  @media(max-width: ${CONSTANTS.BREAKPOINTS.SM}) {
    .grid {
      display: block;
    }
  }
`;

export default ({ children }) => <Grid>{ children }</Grid>