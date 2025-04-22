import React from 'react'
import './Dropdown.scss'

const Dropdown = () => {
  return (
    <div>
      <select>
        <option value="option1">Newest </option>
        <option value="option2">Oldest</option>
        <option value="option3">Days Ago</option>
      </select>
    </div>
  )
}

export default Dropdown
