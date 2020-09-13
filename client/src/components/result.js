import React, { useState } from 'react'
import styled from 'styled-components'
import { darken, lighten } from 'polished'
import { MdCompare } from 'react-icons/md'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import Grid from './grid'
import CONSTANTS from '../constants'

const Result = styled.div`
  background: ${({selected}) => selected ? lighten(0.42, CONSTANTS.COLORS.SECONDARY) : 'white'};
  border: 1px solid ${({selected}) => selected ? CONSTANTS.COLORS.SECONDARY : lighten(0.3, CONSTANTS.COLORS.PRIMARY)};
  border-top-width: 2px;
  border-radius: 0px 0px 8px 8px;
  cursor: pointer;
  padding-bottom: 12px;
  text-align: left;
  @media(max-width: ${CONSTANTS.BREAKPOINTS.MD}) {
    border-radius: 0px;
    margin-bottom: 25px;
  }
`;

const GridItem = styled.div`
  padding-left: 12px;
  padding-right: 12px;
`

const CompareFAB = styled.div`
  background: ${({selected}) => selected ? darken(0.1, CONSTANTS.COLORS.SECONDARY) : lighten(0.1, CONSTANTS.COLORS.PRIMARY)};
  color: ${({selected}) => selected ? CONSTANTS.COLORS.PRIMARY : CONSTANTS.COLORS.SECONDARY};
  margin-bottom: 12px;
  padding: 4px 12px;
`

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
      <CompareFAB selected={selected}>
        <MdCompare/>
        <span>
          {selected ? 'REMOVE' : 'COMPARE'}
        </span>
      </CompareFAB>

      <Grid cols={2} gap={12}>
        <GridItem>
          {plow_categories && plow_categories.length > 0 && (
            <span>{plow_categories[0]}</span>
          )}
          <h3 style={{marginTop: 0}}>{plow.post_name}</h3>

          {/* TODO: width should be ft in, ex: 8'2" */}
          <p>W: {blade_width_expanded}" x H: {blade_height_max}"</p>
        </GridItem>
        <GridItem>
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
        </GridItem>
      </Grid>
    </Result>
  )
}