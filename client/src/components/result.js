import React, { useState } from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { MdCompare } from 'react-icons/md'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import CONSTANTS from '../constants'

const Result = styled.div`
  background: ${props => props.selected ? lighten(0.42, CONSTANTS.COLORS.SECONDARY) : 'white'};
  border: 1px solid ${props => props.selected ? CONSTANTS.COLORS.SECONDARY : lighten(0.3, CONSTANTS.COLORS.PRIMARY)};
  border-radius: 0px 0px 8px 8px;
  cursor: pointer;
  padding: 12px;
  text-align: left;
`;

// const CompareFAB = styled.div`

// `

export default ({ plow, dispatch, selected, numSelected }) => {
  const { acf, plow_categories } = plow
  const { blade_height_max, blade_width_expanded, } = acf
  const [ready, setReady] = useState(false)

  const handleResultClick = () => {
    if (numSelected <= 4 || selected ) {
      dispatch({
        type: 'TOGGLE_COMPARE',
        payload: plow,
      })
    }
  }

  return (
    <Result
      selected={selected}
      onClick={handleResultClick}
    >
      {/* <CompareFAB>
        <MdCompare/>
      </CompareFAB> */}

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
        src={plow.acf.image.url}
        onLoad={() => setReady(true)}
        alt={plow.post_name}
        style={{ display: ready ? 'block': 'none', margin: '0 auto' }}
      />

      {/* TODO: width should be ft in, ex: 8'2" */}
      <p>W: {blade_width_expanded}" x H: {blade_height_max}"</p>
    </Result>
  )
}