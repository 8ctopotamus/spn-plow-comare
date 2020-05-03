import { createContext } from 'react'
import WP_DATA from './wp_data'

const filters = Object.keys(WP_DATA.controls)
  .reduce((prev, curr) => {
    prev[curr] = []
    return prev
  }, {})

const AppContext = createContext({
  search: '',
  filters,
  compare: [],
})

export default AppContext

export const LS_KEY = 'SPN_PLOW_COMPARE_CTX'