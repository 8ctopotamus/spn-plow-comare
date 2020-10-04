import React, {
  useContext,
  useEffect,
  useReducer,
} from 'react'
import useMedia from '../hooks/useMedia'
import AppContext from './index'
import appReducer from './reducer'
import WP_DATA from './wp_data'
const {plows, controls} = WP_DATA

export default ({ children }) => {
  const initialState = useContext(AppContext)
  const [state, dispatch] = useReducer(appReducer, initialState)
  const isSmallScreen = useMedia(['(max-width: 767px)'], [true], false)
  
  useEffect(() => {
    if (isSmallScreen)
      dispatch({ type: 'SET_SIDEBAR', payload: false })
  }, [])

  return (
    <AppContext.Provider value={{ state, dispatch, plows, controls }}>
      { children }
    </AppContext.Provider>
  )
}