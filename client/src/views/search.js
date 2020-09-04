import React from 'react';
import Sidebar from '../components/sidebar'
import Controls from '../components/controls'
import Results from '../components/results'
import ContentWrap from '../components/content-wrap';
import Affix from '../components/affix'

export default () => (
  <>
    <Sidebar>
      <Affix className="some-cool-element" id="lalala" offset={200}>
        <Controls/>
      </Affix>
    </Sidebar>
    <ContentWrap>
      <Results />
    </ContentWrap>
  </>
)