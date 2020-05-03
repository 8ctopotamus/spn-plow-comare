import React, {useContext} from 'react'
import AppContext from '../context/index'

export default () => {
const { state } = useContext(AppContext)
  return (
    <>
      <pre>{JSON.stringify({state}, null, 2)}</pre>
    </>
  )
}