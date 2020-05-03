import React, { useContext, useState } from 'react'
import AppContext from '../context'

export default () => {
  const { state } = useContext(AppContext)
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(!open)}>
        Compare ({state.compare.length})
      </button>

      { state.compare.map(p => <span>{p.post_name}</span>) }

      {open && (
        <p>Show comparison table here</p>
      )}
    </>
  )
}