import React from 'react'
import * as priorityLevels from '../../../constants/priorityLevels'
import './Priority.less'

export default class Priority extends React.Component {

  render() {
    return (
      <div className={`priority priority--${this.props.priority} priority--${this.props.appearance} ${this.props.dimmed ? 'is-dimmed' : ''} ${this.props.disabled ? 'is-disabled' : ''}`} >
        <div className='priority-level priority-level--none' onClick={() => this.props.onClick(priorityLevels.PRIORITY_NONE)} />
        <div className='priority-level priority-level--max' onClick={() => this.props.onClick(priorityLevels.PRIORITY_MAX)} />
        <div className='priority-level priority-level--high' onClick={() => this.props.onClick(priorityLevels.PRIORITY_HIGH)} />
        <div className='priority-level priority-level--medium' onClick={() => this.props.onClick(priorityLevels.PRIORITY_MEDIUM)} />
        <div className='priority-level priority-level--low' onClick={() => this.props.onClick(priorityLevels.PRIORITY_LOW)} />
      </div>
    )
  }
}

Priority.propTypes = {
  priority: React.PropTypes.oneOf([priorityLevels.PRIORITY_NONE, priorityLevels.PRIORITY_LOW, priorityLevels.PRIORITY_MEDIUM, priorityLevels.PRIORITY_HIGH, priorityLevels.PRIORITY_MAX]),
  appearance: React.PropTypes.oneOf(['task-info', 'tasks-list', 'default']),
  disabled: React.PropTypes.bool,
  dimmed: React.PropTypes.bool,
  onClick: React.PropTypes.func.isRequired
}
Priority.defaultProps = {
  priority: priorityLevels.PRIORITY_NONE,
  appearance: 'default',
  disabled: false,
  dimmed: false
}
