import React from 'react'

export default ({ num, children }) => num && (
  <div>
    { Array(parseInt(num)).fill().map(i => children) }
  </div>
)