import React, { useContext } from 'react'
import styled from 'styled-components'
import AppContext from '../context'
import Result from './result'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  text-transform: uppercase;
`;

export default () => {
  const {state, dispatch, plows} = useContext(AppContext)
  return (
    <Grid>
      { plows
          .filter(p => {
            if (state.search === '')
              return true
            const keyword = state.search.toLowerCase()
            return p.post_name.toLowerCase().includes(keyword)
          })
          .filter(p => {
            // TODO: works for now, improve later
            const matches = Object.entries(state.filters).map(filt => {
              const [key, values] = filt
              return values.length === 0
                ? true
                : values.includes(p.acf[key])
            })
            return !matches.includes(false)
          })
          .map(p => <Result {...p} />)
      }
    </Grid>
  );
}