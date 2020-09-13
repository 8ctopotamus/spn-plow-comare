import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import AppProvider from './context/provider'
import Router from './components/router'
import Nav from './components/nav'
import Affix from './components/affix'
import CONSTANTS from './constants'

const AppBackground = styled.div`
  background: ${lighten(0.45, CONSTANTS.COLORS.PRIMARY)};
`

const App = () => (
  <AppBackground>
    <AppProvider>
      <Affix offset={0}>
        <Nav/>
      </Affix>
      <Router />
    </AppProvider>
  </AppBackground>
)

export default App;
