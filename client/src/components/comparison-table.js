import React, { useContext } from 'react'
import styled from 'styled-components'
import AppContext from '../context'

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${({colCount}) => `repeat(${colCount}, 1fr)`};
  & > div {
    background: white;
    border: .5px solid black;
    padding: 12px;
  }
`
const specsToShow = [
  'Availability',
  'Plow Type',
  'Paint',
  'E-Coat Primer',
  'Controls Style',
  'Control Type',
  'Mount',
  'Snow Deflector',
  'Down Pressure',
  'Closed Loop Electrical',
  'LED Lights',
  'Blade Width',
  'Angled Blade Width',
  'Blade Height (min)',
  'Blade Height (max)',
  'Blade Gauge',
  'Blade Thickness',
  'Blade Weight',
  'Blade Material',
  'Plow Shoes',
  'Blade Cutting Edge Thickness',
  'Blade Cutting Edge Height',
  'Vertical Ribs',
  'Trip Feature',
  'Trip Springs',
  'Trip Spring Type',
  'Angle Cylinder Diameter',
  'Angle Cylinder Length',
  'Lift Cylinder Diameter',
  'Lift Cylinder Length',
]

export default () => {
  const { state } = useContext(AppContext)
  const colCount = state.compare.length + 1
  console.log(state.compare)
  return (
    <>
      <Grid colCount={colCount}>
        <div><h2>Snow plow news</h2></div>
        {state.compare.map(({ post_title, ID }) => <div key={ID}>{post_title}</div>)}
      </Grid>
      <Grid colCount={colCount}>
        <div>Does it Fit?</div>
        {state.compare.map(({ ID }) => (
          <div key={ID}>
            <a href="https://www.snoway.com/what-plow-fits-my-truck/" target="_blank" rel="noreferrer noopener">Click Here</a> to see if this plow will fit your exact model truck.)
          </div>
        ))}
      </Grid>
      <Grid colCount={colCount}>
        <div>Where To Buy?</div>
        {state.compare.map(({ ID }) => (
          <div key={ID}>
            Find a Sno-Way Dealer near you.
            {/* <form name="findDealerByBrand" action="https://dealers.snowplownews.com?bd=1" method="post" target="_blank">
              <input type="hidden" name="mfg_id" value="18"/>
              <input type="hidden" name="distance" value="50"/>
              <input type="hidden" name="locationsubmitted" value="1"/>
              <input type="text" name="postalcode" value="" placeholder="Zipcode"/> 
              <input type="submit" value="Find Dealers"/>
            </form> */}
          </div>
        ))}
      </Grid>
      <Grid colCount={colCount}>
        <div>Price</div>
        {state.compare.map(({ acf, ID }) => (
          <div key={ID}>
            {acf.price}
          </div>
        ))}
      </Grid>
      <Grid colCount={colCount}>
        <div>Moving Capacity</div>
        {state.compare.map(({ acf, ID }) => (
          <div key={ID}>
            {acf.moving_capacity}
          </div>
        ))}
      </Grid>
      <Grid colCount={colCount}>
        <div>SPN Rating</div>
        {state.compare.map(({ acf, ID }) => (
          <div key={ID}>
            {acf.spn_rank}
          </div>
        ))}
      </Grid>
      <Grid colCount={colCount}>
        <div>Warranty</div>
        {state.compare.map(({ acf, ID }) => (
          <div key={ID}>
            {acf.warranty ? acf.warranty : 'N/A'}
          </div>
        ))}
      </Grid>
      <Grid colCount={colCount}>
        <div>Product Video</div>
        {state.compare.map(({ acf, ID }) => (
          <div key={ID}>
            {acf.youtube_video_id ? (
              <a 
                href={`https://www.youtube.com/watch?v=${acf.youtube_video_id}`}
                target="_blank"
                rel="noreferrer noopener"
                title="Watch Product Video"
              >Watch Video</a>
            ) : 'N/A'}
          </div>
        ))}
      </Grid>
      <Grid colCount={colCount}>
        <div>Product Video</div>
        {state.compare.map(({ acf, ID }) => (
          <div key={ID}>
            {acf.pdf ? (
              <a 
                href={`http://snowplownews.com/cm/pdfs/?v=${acf.pdf}`}
                target="_blank"
                rel="noreferrer noopener"
                title="View Product PDF"
              >
                Watch Video
              </a>
            ) : 'N/A'}
          </div>
        ))}
      </Grid>
      
      <br/><br/>
      
      {/* SPECS */}
      <Grid colCount={colCount}>
        <div><h2>Specs</h2></div>
        {state.compare.map(({ post_title, ID }) => <div key={ID}>{post_title}</div>)}
      </Grid>

      {specsToShow.map(spec => (
        <Grid colCount={colCount} key={spec}>
          <div>{spec}</div>
          {state.compare.map(({ post_title, ID }) => <div key={ID}>{post_title}</div>)}
        </Grid>
      ))}
    </>
  )
}