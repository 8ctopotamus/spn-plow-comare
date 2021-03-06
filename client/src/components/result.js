import React, { useState } from 'react'
import styled from 'styled-components'
import { darken, lighten } from 'polished'
import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import CONSTANTS from '../constants'
import { convertInchestoFtAndIn } from '../utils/helpers'

const Result = styled.div`
  background: ${({ selected }) => selected ? lighten(0.42, CONSTANTS.COLORS.SECONDARY) : 'white'};
  border: 1px solid ${({ selected }) => selected ? CONSTANTS.COLORS.SECONDARY : lighten(0.3, CONSTANTS.COLORS.PRIMARY)};
  border-top-width: 2px;
  border-radius: 0px 0px 8px 8px;
  cursor: pointer;
  padding-bottom: 6px;
  text-align: left;
  @media(max-width: ${CONSTANTS.BREAKPOINTS.MD}) {
    border-radius: 0px;
    margin-bottom: 25px;
  }
`;

const ResultInner = styled.div`
  padding-left: 12px;
  padding-right: 12px;
`

const CompareBar = styled.div`
  color: ${({ selected }) => selected ? CONSTANTS.COLORS.PRIMARY : CONSTANTS.COLORS.SECONDARY};
  margin-bottom: 12px;
  font-size: small;
  font-weight: bold;
  padding: 4px 12px;  
  position: relative;
  overflow: hidden;
  z-index: 0;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ selected }) => selected ? darken(0.1, CONSTANTS.COLORS.SECONDARY) : lighten(0.1, CONSTANTS.COLORS.PRIMARY)};
    transform-origin: 100% 0;
    transform: skew(-45deg);
    z-index: -1;
  }
`

const Image = styled.img`
  mix-blend-mode: ${({ selected }) => selected ? 'multiply' : 'none'}
`

export default ({ idx, plow, dispatch, selected, numSelected }) => {
  const { acf, plow_categories, featured_image } = plow
  const { blade_height_max, blade_width_expanded, } = acf
  const [ready, setReady] = useState(false)

  const handleResultClick = () => {
    if (numSelected <= 4 || selected) {
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
      idx={idx}
    >
      <CompareBar selected={selected}>
        {selected ? <MdRemoveCircleOutline /> : <MdAddCircleOutline />}
        <span>{selected ? ' ADDED' : ' COMPARE'}</span>
      </CompareBar>

      <ResultInner>
        {plow_categories && plow_categories.length > 0 && (
          <span>{plow_categories[0]}</span>
        )}
        
        <h3 style={{ marginTop: 0 }} dangerouslySetInnerHTML={{ __html: plow.post_title }} />

        {!ready && (
          <ReactPlaceholder
            showLoadingAnimation={true}
            type='rect'
            style={{ width: '100%', height: 180 }}
          />
        )}
        {featured_image && (
          <Image
            selected={selected}
            src={featured_image}
            onLoad={() => setReady(true)}
            alt={plow.post_name}
            style={{ display: ready ? 'block' : 'none', margin: '0 auto' }}
          />
        )}

        {/* TODO: width should be ft in, ex: 8'2" */}
        <p>W: {convertInchestoFtAndIn(blade_width_expanded)} x H: {convertInchestoFtAndIn(blade_height_max)}</p>
      </ResultInner>
    </Result>
  )
}