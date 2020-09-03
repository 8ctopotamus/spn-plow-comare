import React from 'react'
import styled from 'styled-components'
import CONSTANTS from '../constants'
import { lighten } from 'polished'

const ContentWrap = styled.section`
  background: ${lighten(0.55, CONSTANTS.COLORS.PRIMARY)};
  padding: 20px 30px 60px calc(${CONSTANTS.NAV_WIDTH} + 30px);
  @media(max-width: ${CONSTANTS.BREAKPOINTS.MD}) {
    grid-template-columns: 1fr;
    padding: 0;
    overflow-y: initial;
    height: auto;
  }
`

export default ({ children }) => (
  <ContentWrap>
    { children }
  </ContentWrap>
)