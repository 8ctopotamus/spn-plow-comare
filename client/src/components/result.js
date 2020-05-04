import React from 'react'
import styled from 'styled-components'

const Result = styled.div``;

export default ({ ID, post_name}) => (
  <Result
    onClick={() => dispatch({ type: 'TOGGLE_COMPARE', payload: p })}
    key={ID}
  >
    <h3>{post_name}</h3>
  </Result>
)