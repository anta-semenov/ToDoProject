import React from 'react'
import './Checkbox.less'

const Checkbox = ({ appearance, dimmed, checked, onChange }) =>
  <input type='checkbox' className={`checkbox checkbox--${appearance} ${dimmed ? 'is-dimmed' : ''}`} checked={checked} onChange={() => onChange()} />


Checkbox.propTypes = {
  appearance: React.PropTypes.oneOf(['task-info', 'tasks-list', 'default', 'section-header']),
  checked: React.PropTypes.bool,
  dimmed: React.PropTypes.bool,
  onChange: React.PropTypes.func.isRequired
}

Checkbox.defaultProps = {
  appearance: 'default',
  checked: false,
  dimmed: false
}

export default Checkbox
