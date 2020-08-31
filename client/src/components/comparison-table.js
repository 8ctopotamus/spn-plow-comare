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
    <Grid>
      
      
      {state.compare.map(plow => {
        const { title } = plow
        console.log(plow)
        return <div>
      <pre>{JSON.stringify(plow, null, 2)}</pre>

        </div>
      })}


      {/* {state.compare.map(p => {
        return (
          <div key={p.ID}>
            <h4>{p.post_name}</h4>
          </div>
        )
      })} */}
    </Grid>
  )
}