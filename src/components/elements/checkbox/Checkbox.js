import React from 'react'
import './Checkbox.less'

export default class Checkbox extends React.Component {
  render() {
    return (
      <input type='checkbox' className={`checkbox checkbox--${this.props.appearance} ${this.props.dimmed ? 'is-dimmed' : ''}`} checked={this.props.checked} onChange={() => this.props.onChange()} />
    )
  }
}

Checkbox.propTypes = {
  appearance: React.PropTypes.oneOf(['task-info', 'tasks-list', 'default']),
  checked: React.PropTypes.bool,
  dimmed: React.PropTypes.bool,
  onChange: React.PropTypes.func.isRequired
}

Checkbox.defaultProps = {
  appearance: 'default',
  checked: false,
  dimmed: false
}
