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
    // by search
    .filter(p => {
      if (state.search.length < 2) return true
      const keyword = state.search.toLowerCase()
      return p.post_name.toLowerCase().includes(keyword)
    })
    .filter(p => {
      // TODO: works for now, improve later
      const matches = Object.entries(state.filters).map(filt => {
        let [key, values] = filt

        if (key === 'blade_width_expanded') {
          const [min, max] = values
          const pWidth = parseFloat(p.acf.blade_width_expanded)
          if (min <= pWidth && pWidth <= max) {
            return true
          }
        }

        if (key === 'manufacturers' && p.plow_categories && p.plow_categories.length > 0) {
          const match = p.plow_categories.find(cat => values.includes(cat))
          if (match) return true
        } 

        return values.length === 0 
          ? true : values.includes(p.acf[key])
      })
      return !matches.includes(false)
    })

  return (
    <Grid>
      {/*<pre>{JSON.stringify(state, null, 2)}</pre>*/}
      { filtered.map(p => {
        const selected = state.compare
          .find(c => c.ID === p.ID) ? true : false
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