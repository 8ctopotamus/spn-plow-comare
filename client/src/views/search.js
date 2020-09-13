import React, { useContext } from 'react'
import styled from 'styled-components'
import Sidebar from '../components/sidebar'
import Controls from '../components/controls'
import Results from '../components/results'
import ContentWrap from '../components/content-wrap';
import Affix from '../components/affix'
import AppContext from '../context'
import CONSTANTS from '../constants'

// grid-template-columns: ${({sidebarOpen}) => sidebarOpen ? `1fr 1fr` : '1fr'};
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  @media (max-width: ${CONSTANTS.BREAKPOINTS.MD}) {
    display: block;
  }
`

export default () => {
  const { state } = useContext(AppContext)
  return (
    <Grid sidebarOpen={state.sidebarOpen}>
      <Sidebar>
        <Affix offset={80}>
          <Controls/>
        </Affix>
      </Sidebar>
      <ContentWrap>
        <Results />
      </ContentWrap>
    </Grid>
  )
}