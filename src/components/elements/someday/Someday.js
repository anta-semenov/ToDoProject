import React from 'react'
import './Someday.less'

export default class Someday extends React.Component {
  render() {
    return(
      <div className={`someday someday--${this.props.appearance} ${this.props.checked ? 'is-checked' : ''} ${this.props.dimmed ? 'is-dimmed' : ''} ${this.props.disabled ? 'is-disabled' : ''}`} onClick={() => this.props.onClick()} >
        ...
      </div>
    )
  }
}

Someday.propTypes = {
  appearance: React.PropTypes.oneOf(['task-info', 'tasks-list', 'default']),
  checked: React.PropTypes.bool,
  dimmed: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired
}
Someday.defaultProps = {
  appearance: 'default',
  checked: false,
  dimmed: false,
  disabled: false
}
