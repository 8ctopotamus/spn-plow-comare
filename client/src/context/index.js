import React, { createContext } from 'react'

const AppContext = createContext({
  search: '',
  filters: [],
})

export default AppContext

export const LS_KEY = 'SPN_PLOW_COMPARE_CTX'