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
  const filtered = plows
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

  return (
    <Grid>
      { filtered.map(p => {
        const selected = state.compare
          .find(c => c.ID === p.ID) 
            ? true 
            : false
        return (
          <Result
            plow={p}
            dispatch={dispatch}
            selected={selected}
            key={p.ID}
          />
        )
      }) }
    </Grid>
  );
}