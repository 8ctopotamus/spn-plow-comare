import React, { useContext } from 'react'
import styled from 'styled-components'
import { MdAttachMoney, MdOndemandVideo, MdPictureAsPdf } from 'react-icons/md'
import { IoMdSnow } from 'react-icons/io'
import Repeatable from './repeatable'
import AppContext from '../context'
import CONSTANTS from '../constants'

const specsToShow = [
  'Availability',
  'Plow Type',
  'Paint',
  'E-Coat Primer',
  'Controls Style',
  'Controls Type',
  'Mount',
  'Snow Deflector',
  'Down Pressure',
  'Closed Loop Electric',
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${({colCount}) => `repeat(${colCount}, 1fr)`};
  & > div {
    border: .5px solid ${CONSTANTS.COLORS.PRIMARY};
    padding: 12px;
  }
`

const Img = styled.img`
  display: block;
  mix-blend-mode: multiply;
  margin: 0 auto;
`

export default () => {
  const { state } = useContext(AppContext)
  const colCount = state.compare.length + 1
  
  return (
    <div className="comparison-chart">
      <Grid colCount={colCount}>
        <div><h2>Snow plow news</h2></div>
        {state.compare.map(({ post_title, ID, featured_image, plow_categories }) => {
          return (
            <div key={ID}>
              {featured_image && <Img src={featured_image} alt={post_title} />}

              {plow_categories && plow_categories.length > 0 && (
                <p>{plow_categories[0]}</p>
              )}
              
              <h3>{post_title}</h3>
            </div>
          )
        })}
      </Grid>
      <Grid colCount={colCount}>
        <div>Price</div>
        {state.compare.map(({ acf, ID }) => (
          <Repeatable num={acf.price} key={ID}>
            <MdAttachMoney size={'25px'} />
          </Repeatable>
        ) )}
      </Grid>
      <Grid colCount={colCount}>
        <div>Moving Capacity</div>
        {state.compare.map(({ acf, ID }) => (
          <Repeatable num={acf.moving_capacity}  key={ID}>
            <IoMdSnow size={'25px'} />
          </Repeatable>
        ))}
      </Grid>
      <Grid colCount={colCount}>
        <div>SPN Rating</div>
        {state.compare.map(({ acf, ID }) => (
          <Repeatable num={Math.floor(acf.spn_rank/100*10)} key={ID}>
            <IoMdSnow size={'25px'} />
          </Repeatable>
        ) )}
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
              >
                <MdOndemandVideo />{' '}Watch Video
              </a>
            ) : 'N/A'}
          </div>
        ))}
      </Grid>
      <Grid colCount={colCount}>
        <div>Product PDF</div>
        {state.compare.map(({ acf, ID }) => (
          <div key={ID}>
            {acf.pdf ? (
              <a 
                href={`http://snowplownews.com/cm/pdfs/?v=${acf.pdf}`}
                target="_blank"
                rel="noreferrer noopener"
                title="View Product PDF"
              >
                <MdPictureAsPdf />{' '}Watch Video
              </a>
            ) : 'N/A'}
          </div>
        ))}
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
        {state.compare.map(({ ID, acf }) => {
          const { mfg_id } = acf
          return (
            <div key={ID}>
              Find a Sno-Way Dealer near you.
              <form name="findDealerByBrand" action="//dealers.snowplownews.com?bd=1" method="post" target="_blank">
                {mfg_id && ( <input type="hidden" name="mfg_id" value={mfg_id} /> )}
                <input type="hidden" name="distance" value="50"/>
                <input type="hidden" name="locationsubmitted" value="1"/>
                <input type="text" name="postalcode" placeholder="Zipcode"/> 
                <input type="submit" value="Find Dealers"/>
              </form>
            </div>
          )
        })}
      </Grid>
      
      <br/><br/>
      
      {/* SPECS */}
      <Grid colCount={colCount}>
        <div><h2>Specs</h2></div>
        {state.compare.map(({ post_title, ID }) => (
          <div key={ID}>
            <h3>{post_title}</h3>
          </div>
        ))}
      </Grid>

      {specsToShow.map(spec => {
        const key = spec.toLowerCase().replace(/ /g, '_').replace(/\(|\)/g, '')
        console.log(key)
        return (
          <Grid colCount={colCount} key={spec}>
            <div>{spec}</div>
            {state.compare.map(({ acf, ID }) => {
              return <div key={ID}>{acf[key] ? acf[key] : 'N/A'}</div>
            })}
          </Grid>
        )
      })}
    </div>
  )
}