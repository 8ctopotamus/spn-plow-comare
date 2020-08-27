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


        <table class="comparison-table">
          <thead>
            <tr>
              {/* <th><strong>{{selections.make}} {{selections.model}} {{selections.year}}</strong></th> */}
              {/* <td v-for="model in modelsToCompare"><img :src="model.image" :alt="model.model_name"></td> */}
            </tr>
          </thead>
          {/* <tbody>
            <tr v-for="att in modelAttributes">
              <td class="attribute-name">{{att | formatKey}}</td>
              <td v-for="model in modelsToCompare">{{model[att]}}</td>
            </tr>
          </tbody>*/}
        </table> 



      {state.compare.map(p => {
        return (
          <div key={p.ID}>
            <h4>{p.post_name}</h4>
          </div>
        )
      })}
    </Grid>
  )
}