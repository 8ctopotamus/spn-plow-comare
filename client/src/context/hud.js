import React, {useContext} from 'react'
import AppContext from './index'

export default () => {
const { state, controls } = useContext(AppContext)
  return (
    <>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </>
  )
}