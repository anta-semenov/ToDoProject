import React, { Component } from 'react'
import { List, Set } from 'immutable'
import TaskGroup from '../taskGroup/TaskGroup'
import AddTask from '../addTask/AddTask'

import './Tasks.less'

export default class Tasks extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className={`tasks ${this.props.activeItem != '' ? 'has-active-item' : ''}`}>
        {this.props.header ? <h1 className='tasks__header'>{this.props.header}</h1> : null}
        <AddTask addTask={this.props.addTask} />
        {this.props.groups ?
          <ul className='tasks__list'>
            {this.props.groups.map((group, index) =>
              <TaskGroup
                key={index}
                groupTitle={group.get('title')}
                tasks={group.get('items')}
                activeItem={this.props.activeItem}
                latentTasks={this.props.latentTasks}
                onTaskClick={this.props.onTaskClick}
                onTaskCheckboxClick={this.props.onTaskCheckboxClick}
                onTaskTodayClick={this.props.onTaskTodayClick}
                onPriorityClick={this.props.onTaskPriorityClick}
              />
            )}
          </ul>
          :
          <div className='tasks__empty-state'>This section doesn't have any tasks. This text should be replaced with a component for empty space.</div>
        }
      </div>
    )
  }
}

Tasks.propTypes = {
  groups: React.PropTypes.instanceOf(List),
  header: React.PropTypes.string,
  activeItem: React.PropTypes.string,
  latentTasks: React.PropTypes.instanceOf(Set),

  onTaskClick: React.PropTypes.func.isRequired,
  onTaskCheckboxClick: React.PropTypes.func.isRequired,
  onTaskTodayClick: React.PropTypes.func.isRequired,
  onTaskPriorityClick: React.PropTypes.func.isRequired,
  addTask: React.PropTypes.func.isRequired
}
