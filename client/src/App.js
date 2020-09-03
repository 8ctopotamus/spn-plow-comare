import React from 'react';
import AppProvider from './context/provider'
import Router from './components/router'
import Nav from './components/nav'

const App = () => (
  <AppProvider>
    <Nav/>
    <Router />
  </AppProvider>
)

export default App;
