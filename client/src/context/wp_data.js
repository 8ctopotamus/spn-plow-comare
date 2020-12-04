const WP_DATA = (window && window.wp_data) && window.wp_data

const plows = WP_DATA && WP_DATA.plows 
  ? WP_DATA.plows
  : null;
  
const controls = (WP_DATA && WP_DATA.controls) && WP_DATA.controls
  ? WP_DATA.controls
  : null

export default {
  ...WP_DATA,
  plows,
  controls
}