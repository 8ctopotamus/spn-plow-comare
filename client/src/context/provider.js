import React, {
  useContext,
  useReducer,
  useEffect,
} from 'react'

import AppContext from './index'
import appReducer from './reducer'

const WP_DATA = (window && window.wp_data) && window.wp_data

const plows = WP_DATA && WP_DATA.plows 
  ? WP_DATA.plows
  : null;
  
const controls = (WP_DATA && WP_DATA.controls) && WP_DATA.controls
  ? WP_DATA.controls
  : null

export default ({ children }) => {
  const initialState = useContext(AppContext)
  const [state, dispatch] = useReducer(appReducer, initialState)

  useEffect(() => dispatch({
    type: 'GET_LOCALSTORAGE',
  }), [])

  return (
    <AppContext.Provider value={{state, dispatch, plows, controls}}>
      { children }
    </AppContext.Provider>
  )
}