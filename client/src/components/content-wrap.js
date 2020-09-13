import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import CONSTANTS from '../constants'

// padding: 20px 30px 60px calc(${CONSTANTS.NAV_WIDTH} + 30px);
const ContentWrap = styled.section`
  min-height: ${CONSTANTS.APP_MIN_HEIGHT};
  background: ${lighten(0.45, CONSTANTS.COLORS.PRIMARY)};
  padding: 30px;
  @media(max-width: ${CONSTANTS.BREAKPOINTS.MD}) {
    padding: 12px;
    overflow-y: initial;
    height: auto;
  }
`

export default ({ children }) => (
  <ContentWrap>
    { children }
  </ContentWrap>
)