import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import * as priorityLevels from '../../constants/priorityLevels'

export default class TaskPrority extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    return (
      <div className={`task__priority task__priority--${this.props.priority ? this.props.priority : 'none'}`} >
        <div className='task__priority-level task__priority-level--none' onClick={() => this.props.onPriorityClick(this.props.taskId, priorityLevels.PRIORITY_NONE)} />
        <div className='task__priority-level task__priority-level--max' onClick={() => this.props.onPriorityClick(this.props.taskId, priorityLevels.PRIORITY_MAX)} />
        <div className='task__priority-level task__priority-level--high' onClick={() => this.props.onPriorityClick(this.props.taskId, priorityLevels.PRIORITY_HIGH)} />
        <div className='task__priority-level task__priority-level--medium' onClick={() => this.props.onPriorityClick(this.props.taskId, priorityLevels.PRIORITY_MEDIUM)} />
        <div className='task__priority-level task__priority-level--low' onClick={() => this.props.onPriorityClick(this.props.taskId, priorityLevels.PRIORITY_LOW)} />
      </div>
    )
  }
}

TaskPrority.propTypes = {
  taskId: React.PropTypes.number.isRequired,
  priority: React.PropTypes.string,
  onPriorityClick: React.PropTypes.func.isRequired
}
