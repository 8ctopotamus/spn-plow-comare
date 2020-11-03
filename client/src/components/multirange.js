import * as React from 'react';
import { Range, getTrackBackground } from 'react-range';
import { darken } from 'polished'
import CONSTANTS from '../constants'
import { convertInchestoFtAndIn } from '../utils/helpers'

const STEP = 0.1;
const COLORS = ['#0C2960', darken(0.1, CONSTANTS.COLORS.SECONDARY), '#0C2960'];

class MultipleThumbs extends React.Component {
  state = {
    values: [this.props.min, this.props.max]
  };

  render() {
    const { min, max } = this.props

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}
      >
        <Range
          values={this.state.values}
          step={STEP}
          min={min}
          max={max}
          onChange={values => this.setState({ values })}
          onFinalChange={this.props.handleFinalRangeChange}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: '36px',
                display: 'flex',
                width: '100%'
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: '15px',
                  width: '100%',
                  borderRadius: '4px',
                  background: getTrackBackground({
                    values: this.state.values,
                    colors: COLORS,
                    min: min,
                    max: max
                  }),
                  alignSelf: 'center'
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged, index }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '42px',
                width: '42px',
                borderRadius: '4px',
                backgroundColor: '#FFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 2px 6px #AAA'
              }}
            >
              <div
                style={{
                  height: '16px',
                  width: '5px',
                  backgroundColor: isDragged ? COLORS[index] : '#CCC'
                }}
              />
            </div>
          )}
        />
        <output style={{ marginTop: '30px' }}>
          {convertInchestoFtAndIn(this.state.values[0].toFixed(1))}  {convertInchestoFtAndIn(this.state.values[1].toFixed(1))}{' '}
        </output>
      </div>
    );
  }
}

export default MultipleThumbs;
