import PropTypes from 'prop-types';
import React from 'react'
import './Someday.less'

const Someday = ({ appearance = 'default', checked = false, dimmed = false, disabled = false, onClick }) => (
  <div className={`someday someday--${appearance} ${checked ? 'is-checked' : ''} ${dimmed ? 'is-dimmed' : ''} ${disabled ? 'is-disabled' : ''}`} onClick={() => onClick()} >
    ...
  </div>
)

Someday.propTypes = {
  appearance: PropTypes.oneOf(['task-info', 'tasks-list', 'default']),
  checked: PropTypes.bool,
  dimmed: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

export default Someday
