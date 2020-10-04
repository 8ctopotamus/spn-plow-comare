import React from 'react'

export default ({ name, value, onChange }) => (
  <label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      type="checkbox"
    /> {value}
  </label>
)