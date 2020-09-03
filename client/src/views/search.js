import React from 'react';
import Sidebar from '../components/sidebar'
import Filters from '../components/filters'
import Results from '../components/results'
import ContentWrap from '../components/content-wrap';

export default () => (
  <>
    <Sidebar>
      <Filters/>
    </Sidebar>
    <ContentWrap>
      <Results />
    </ContentWrap>
  </>
)