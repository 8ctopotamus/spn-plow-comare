import React, { useContext } from 'react'
import styled from 'styled-components'
import AppContext from '../context'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  text-transform: uppercase;
`;

const Item = styled.div``;

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
          .map(p => (
            <Item 
              onClick={() => dispatch({ type:'UPDATE_COMPARE', payload: p })}
              key={p.ID}>
              <h3>{p.post_name}</h3>
            </Item>
          ))
      }
    </Grid>
  );
}