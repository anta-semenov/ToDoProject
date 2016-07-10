import React from 'react'
import './Today.less'

export default class Today extends React.Component {
  render() {
    return (
      <div className={`today today--${this.props.appearance} ${this.props.checked ? 'is-checked' : ''} ${this.props.dimmed ? 'is-dimmed' : ''} ${this.props.disabled ? 'is-disabled' : ''}`} onClick={() => this.props.onClick()} >
        <div className='today__beams'>
          <svg viewBox='0 0 26 26' >
            <circle cx='13' cy='13' r='13' fill='none' />
          </svg>
        </div>
        <div className='today__beams--active'>
          <svg viewBox='0 0 26 26' >
            <circle cx='13' cy='13' r='13' fill='none' />
          </svg>
        </div>
      </div>
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
