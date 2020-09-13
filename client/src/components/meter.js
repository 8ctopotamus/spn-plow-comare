import React from 'react'

export default ({ num, children }) => num && (
  Array(parseInt(num)).fill().map(i => children)
)