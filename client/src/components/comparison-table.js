import React, { useContext } from 'react'
import styled from 'styled-components'
import AppContext from '../context'

const Grid = styled.div`
  // display: grid;
  // grid-template-columns: 1fr 1fr 1fr;
  // grid-gap: 30px;
`

export default () => {
  const { state } = useContext(AppContext)
  return (
    <Grid>
      {state.compare.map(p => {
        return (
          <div key={p.ID}>
            <h4>{p.post_name}</h4>
            <pre>{JSON.stringify(p.acf, null, 2)}</pre>
          </div>
        )
      })}
    </Grid>
  )
}