import React, { useState } from 'react';
import styled from 'styled-components'
import AppProvider from './context/provider'
import HUD from './context/hud'
import Search from './components/search'
import Results from './components/results'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 30px;
`;

function App() {
  return (
    <AppProvider>
      <Search />
      <Grid>
        <HUD />
        <Results />
      </Grid>
    </AppProvider>
  )
}

export default App;
