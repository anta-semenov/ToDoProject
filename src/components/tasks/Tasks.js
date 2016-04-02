import React, { Component } from 'react'
import TaskGroup from '../taskGroup/TaskGroup'
import AddTask from '../addTask/AddTask'

require('./Tasks.less')

export default class Tasks extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className='tasks'>
        <AddTask addTask={this.props.addTask} />
        <ul className='tasks__list'>
          {this.props.groups.map(group => {
            <TaskGroup
              groupTitle={group.get('title')}
              tasks={group.get('items')}
              onTaskClick={this.props.onTaskClick}
              onTaskCheckboxClick={this.props.onTaskCheckboxClick}
              onTaskTodayClick={this.props.onTaskTodayClick}
              onPriorityClick={this.props.onTaskPriorityClick}
            />
          })}
        </ul>
      </div>
    )
  }
}

Tasks.propTypes = {
  groups: React.PropTypes.object.isRequired,
  onTaskClick: React.PropTypes.func.isRequired,
  onTaskCheckboxClick: React.PropTypes.func.isRequired,
  onTaskTodayClick: React.PropTypes.func.isRequired,
  onTaskPriorityClick: React.PropTypes.func.isRequired,
  addTask: React.PropTypes.func.isRequired
}
