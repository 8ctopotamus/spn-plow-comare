import React from 'react'
import styled from 'styled-components'

const Sidebar = styled.div`
  background: #666;
`

export default ({ children }) => (
  <Sidebar>
    { children }
  </Sidebar>
)