import React from 'react';
import AppProvider from './context/provider'
import Router from './components/router'

const App = () => (
  <AppProvider>
    <Router />
  </AppProvider>
)

export default App;
