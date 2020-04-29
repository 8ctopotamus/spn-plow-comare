import React, { useContext } from 'react'
import styled from 'styled-components'
import AppContext from '../context'

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  text-transform: uppercase;
`;

export default () => {
  const {state, dispatch, plows} = useContext(AppContext)
  return (
    <List>
      { plows
          .filter(p => {
            if (state.search === '')
              return true
            const keyword = state.search.toLowerCase()
            return p.post_name.toLowerCase().includes(keyword)
          })
          .map(p => <div key={p.id}><h3>{p.post_name}</h3></div>)
      }
    </List>
  );
}