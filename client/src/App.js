import React, { useState } from 'react';
import styled from 'styled-components'
import AppProvider from './context/provider'
import HUD from './components/hud'
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
    <HUD />
      <Grid>
        <div>
          <Search />
        </div>
        <Results />
      </Grid>
    </AppProvider>
  )
}

export default App;
