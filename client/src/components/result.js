import React, { useState } from 'react'
import styled from 'styled-components'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

const Result = styled.div`
  background: ${props => props.selected ? '#cd2653' : 'transparent'};
  cursor: pointer;
`;

export default ({ plow, dispatch, selected }) => {
  const { blade_height_max, blade_width_expanded, } = plow.acf
  const [ready, setReady] = useState(false)
  console.log(plow)
  return (
    <Result
      selected={selected}
      onClick={() => dispatch({
        type: 'TOGGLE_COMPARE',
        payload: plow,
      })}
    >
      <span>MANUFACTURER HERE</span>
      <h3 style={{marginTop: 0}}>{plow.post_name}</h3>
      
      {!ready && (
        <ReactPlaceholder
          showLoadingAnimation={true}
          type='rect'
          style={{width: '100%', height: 180}}
        />
      )}
      
      <img 
        // src={`https://snowplownews.com/cm/images/${plow.acf.image}`}
        onLoad={() => setReady(true)}
        alt={plow.post_name}
        style={{ display: ready ? 'block': 'none' }}
      />

      <p>W: {blade_width_expanded}" x H: {blade_height_max}"</p>
    </Result>
  )
}