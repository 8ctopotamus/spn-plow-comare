import React, { useContext } from 'react'
import styled from 'styled-components'
import AppContext from '../context'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
`

export default () => {
  const { state } = useContext(AppContext)
  return (
    <>
      <button onClick={() => dispatch({ type: 'CHANGE_VIEW', payload: 'SEARCH' })}></button>
      <Grid>
        {state.compare.map(p => {
          return (
            <div key={p.ID}>{p.post_name}</div>
          )
        })}
      </Grid>
    </>
  )
}