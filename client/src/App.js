import React from 'react';
import AppProvider from './context/provider'
import Router from './components/router'
import Nav from './components/nav'
import Affix from './components/affix'

const App = () => (
  <AppProvider>
    <Affix offset={0}>
      <Nav/>
    </Affix>
    <Router />
  </AppProvider>
)

export default App;
