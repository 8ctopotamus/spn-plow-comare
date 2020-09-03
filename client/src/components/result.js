import React, { useState } from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import CONSTANTS from '../constants'

const Result = styled.div`
  background: ${props => props.selected ? lighten(.4, CONSTANTS.COLORS.SECONDARY) : 'white'};
  border: 1px solid ${props => props.selected ? CONSTANTS.COLORS.SECONDARY : 'lightgrey'};
  border-radius: 0px 0px 6px 6px;
  cursor: pointer;
  padding: 12px;
  text-align: left;
`;

export default ({ plow, dispatch, selected }) => {
  const { acf, plow_categories } = plow
  const { blade_height_max, blade_width_expanded, } = acf
  const [ready, setReady] = useState(false)

  return (
    <Result
      selected={selected}
      onClick={() => dispatch({
        type: 'TOGGLE_COMPARE',
        payload: plow,
      })}
    >
      {plow_categories && plow_categories.length > 0 && (
        <span>{plow_categories[0]}</span>
      )}
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
        src="https://snowplownews.com/cm/images/meyer_SuperV.jpg"
        onLoad={() => setReady(true)}
        alt={plow.post_name}
        style={{ display: ready ? 'block': 'none' }}
      />

      {/* TODO: width should be ft in, ex: 8'2" */}
      <p>W: {blade_width_expanded}" x H: {blade_height_max}"</p>
    </Result>
  )
}