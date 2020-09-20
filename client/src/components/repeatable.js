import React from 'react'

export default ({ num, children }) => (
  <div>{ num && parseInt(num) ? Array(parseInt(num)).fill().map(i => children) : null}</div>
)