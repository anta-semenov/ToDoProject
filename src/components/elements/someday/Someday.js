import React from 'react'
import './Someday.less'

const Someday = ({ appearance = 'default', checked = false, dimmed = false, disabled = false, onClick }) => (
  <div className={`someday someday--${appearance} ${checked ? 'is-checked' : ''} ${dimmed ? 'is-dimmed' : ''} ${disabled ? 'is-disabled' : ''}`} onClick={() => onClick()} >
    ...
  </div>
)

Someday.propTypes = {
  appearance: React.PropTypes.oneOf(['task-info', 'tasks-list', 'default']),
  checked: React.PropTypes.bool,
  dimmed: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired
}

export default Someday
