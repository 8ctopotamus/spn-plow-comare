import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import AppProvider from './context/provider'
import Router from './components/router'
import CompareBar from './components/compare-bar'
import CONSTANTS from './constants'
import Affix from './components/affix'

const AppBackground = styled.div`
  background: ${lighten(0.40, CONSTANTS.COLORS.PRIMARY)};
`

const App = () => (
  <AppBackground>
    <AppProvider>
      <Affix offset={0}>
        <CompareBar/>
      </Affix>
      <Router />
    </AppProvider>
  </AppBackground>
)

export default App;
