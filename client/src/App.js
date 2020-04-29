import React, { useState } from 'react';
import AppProvider from './context/provider'
import HUD from './context/hud'
import Search from './components/search'
import Results from './components/results'

function App() {
  return (
    <AppProvider>
      <Search />
      <HUD />
      <Results />
    </AppProvider>
  )
}

export default App;
