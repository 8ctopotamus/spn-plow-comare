import React from 'react'
import styled from 'styled-components'

const Result = styled.div``;

export default ({ plow, dispatch }) => (
  <Result
    onClick={() => dispatch({
      type: 'TOGGLE_COMPARE',
      payload: plow,
    })}
  >
    <h3>{plow.post_name}</h3>
  </Result>
)