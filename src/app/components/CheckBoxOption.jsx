'use client'

import React, { Component } from 'react'

class CheckboxOption extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChecked: false,
    }
  }

  toggleCheckboxChange = () => {
    this.setState(({ isChecked }) => ({
      isChecked: !isChecked,
    }))
  }

  render() {
    const { value } = this.props
    const { isChecked } = this.state

    const containerStyle = {
      backgroundColor: '#9696ffb3',
      fontWeight: 'bold',
      border: '2px solid #ccc',
      borderRadius: '30px',
      padding: '15px',
      margin: '15px',
    }

    const labelStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

    }
    const checkboxStyle = {
      width: '30px',
      height: '30px',
      cursor: 'pointer',
    }

    return (
      <div style={containerStyle}>
        <div style={labelStyle}>
          <span>{value}</span>
          <input
            style={checkboxStyle}
            type='checkbox'
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
            value={value}
          />
        </div>
      </div>
    )
  }
}

export default CheckboxOption
