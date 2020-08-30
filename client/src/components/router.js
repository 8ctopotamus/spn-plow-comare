import React, { useContext } from 'react';
import styled from 'styled-components'
import AppContext from '../context'
import Search from '../components/search'
import Results from '../components/results'
import CompareLauncher from '../components/compare-launcher'
import ComparisonTable from '../components/comparison-table'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 60px;
`;

export default () => {
  const { state } = useContext(AppContext)
  return (
    <>
      <CompareLauncher />
      {state.view === 'COMPARE' ? (
        <ComparisonTable />
      ) : (
          <>
            <Grid>
              <div>
                <Search />
              </div>
              <div>
                <Results />
              </div>
            </Grid>
          </>
        )}
    </>
  )
}