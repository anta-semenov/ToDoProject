import React from 'react'
import './RepeatValueInput.less'

class RepeatValueInput extends React.PureComponent {
  onChange = (e) => {
    const {onChange: originalOnChange} = this.props
    const newValue = e.target.value

    if (/\D/.test(newValue)) return

    originalOnChange(newValue)
  }

  render() {
    const {value} = this.props
    return(
      <input
        type='text'
        onChange={this.onChange}
        value={value}
        className='repeat-value'
      />
    )
  }
}

RepeatValueInput.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
}

export default RepeatValueInput
