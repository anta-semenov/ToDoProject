import React from 'react'
import { PRIORITY_NONE, PRIORITY_MAX, PRIORITY_HIGH, PRIORITY_MEDIUM, PRIORITY_LOW } from '../../../constants/priorityLevels'
import './Priority.less'

const Priority = ({ priority = PRIORITY_NONE, appearance = 'default', disabled = false, dimmed = false, onClick }) => (
  <div className={`priority priority--${priority} priority--${appearance}${dimmed ? ' is-dimmed' : ''}${disabled ? ' is-disabled' : ''}`} >
    <div className='priority-level priority-level--none' onClick={() => onClick(PRIORITY_NONE)} />
    <div className='priority-level priority-level--max' onClick={() => onClick(PRIORITY_MAX)} />
    <div className='priority-level priority-level--high' onClick={() => onClick(PRIORITY_HIGH)} />
    <div className='priority-level priority-level--medium' onClick={() => onClick(PRIORITY_MEDIUM)} />
    <div className='priority-level priority-level--low' onClick={() => onClick(PRIORITY_LOW)} />
  </div>
)

Priority.propTypes = {
  priority: React.PropTypes.oneOf([PRIORITY_NONE, PRIORITY_LOW, PRIORITY_MEDIUM, PRIORITY_HIGH, PRIORITY_MAX]),
  appearance: React.PropTypes.oneOf(['task-info', 'tasks-list', 'default']),
  disabled: React.PropTypes.bool,
  dimmed: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired
}

export default Priority
