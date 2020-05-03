import React, { useState } from 'react';
import styled from 'styled-components'
import AppProvider from './context/provider'
import HUD from './components/hud'
import Search from './components/search'
import Results from './components/results'
import Compare from './components/compare'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 30px;
`;

function App() {
  return (
    <AppProvider>
      {/* <HUD /> */}
      <Grid>
        <div>
          <Search />
        </div>
        <div>
          <Compare />
          <Results />
        </div>
      </Grid>
    </AppProvider>
  )
}

export default App;
