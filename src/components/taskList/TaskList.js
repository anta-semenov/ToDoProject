import React, { Component } from 'react'
import TaskGroup from '../taskGroup/TaskGroup'

require('./TaskList.less')

export default class TaskList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <ul className='taskList'>
        {this.props.groups.map(group => {
          <TaskGroup
            groupName={group.title}
            tasks={group.items}
            onTaskClick={this.props.onTaskClick}
            onTaskCheckboxClick={this.props.onTaskCheckboxClick}
            onTaskTodayClick={this.props.onTaskTodayClick}
            onPriorityClick={this.props.onPriorityClick}
          />
        })}
      </ul>
    )
  }
}

TaskList.propTypes = {
  groups: React.PropTypes.array.isRequired,
  onTaskClick: React.PropTypes.func.isRequired,
  onTaskCheckboxClick: React.PropTypes.func.isRequired,
  onTaskTodayClick: React.PropTypes.func.isRequired,
  onPriorityClick: React.PropTypes.func.isRequired
}
