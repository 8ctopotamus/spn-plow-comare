import React from 'react';
import Grid from '../components/grid'
import Sidebar from '../components/sidebar'
import Filters from '../components/filters'
import Results from '../components/results'

export default () => (
  <>
    <Sidebar>
      <Filters/>
    </Sidebar>
    <Results />
  </>
)