import React from 'react'
import './Today.less'

export default class Today extends React.Component {
  render() {
    return (
      <div
        className={`today today--${this.props.appearance} ${this.props.checked ? 'is-checked' : ''} ${this.props.dimmed ? 'is-dimmed' : ''} ${this.props.disabled ? 'is-disabled' : ''}`}
        onClick={() => this.props.onClick()}
      />
    )
  }
}

Today.propTypes = {
  appearance: React.PropTypes.oneOf(['task-info', 'tasks-list', 'default']),
  checked: React.PropTypes.bool,
  dimmed: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired
}
Today.defaultProps = {
  appearance: 'default',
  checked: false,
  dimmed: false,
  disabled: false
}
