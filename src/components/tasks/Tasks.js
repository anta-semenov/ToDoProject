import React, { Component } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import TaskGroup from './taskGroup/TaskGroup'
import AddTask from './addTask/AddTask'
import TasksHeader from './tasksHeader/TasksHeader'
import { NEXT, INBOX, TODAY, PROJECT, CONTEXT, PROJECTS, CONTEXTS } from '../../constants/sectionTypes.js'

import './Tasks.less'

export default class Tasks extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className={`tasks ${this.props.activeItem != '' ? 'has-active-item' : ''}`}>
        <TasksHeader sectionName={this.props.sectionName} sectionType={this.props.sectionType} onNameChange={this.props.onSectionNameChange} onDelete={this.props.onSectionDelete} />
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
                trackingTask={this.props.trackingTask}
                onTaskClick={this.props.onTaskClick}
                onTaskCheckboxClick={this.props.onTaskCheckboxClick}
                onTaskTodayClick={this.props.onTaskTodayClick}
                onPriorityClick={this.props.onTaskPriorityClick}
                onTrackingClick={this.props.onTrackingClick}
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
  groups: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      items: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
          id: React.PropTypes.string.isRequired,
          title: React.PropTypes.string.isRequired,
          completed: React.PropTypes.bool.isRequired,
          today: React.PropTypes.bool.isRequired,
          priority: React.PropTypes.string.isRequired,
          description: React.PropTypes.oneOfType([
            React.PropTypes.string,
            ImmutablePropTypes.map
          ]),
          date: React.PropTypes.number
        })
      ).isRequired,
      title: React.PropTypes.string
    })
  ),
  sectionName: React.PropTypes.string.isRequired,
  sectionType: React.PropTypes.oneOf([NEXT, INBOX, TODAY, PROJECT, CONTEXT, PROJECTS, CONTEXTS]).isRequired,
  activeItem: React.PropTypes.string,
  latentTasks: ImmutablePropTypes.mapOf(React.PropTypes.number),
  trackingTask: React.PropTypes.string,

  onSectionNameChange: React.PropTypes.func.isRequired,
  onSectionDelete: React.PropTypes.func.isRequired,
  onTaskClick: React.PropTypes.func.isRequired,
  onTaskCheckboxClick: React.PropTypes.func.isRequired,
  onTaskTodayClick: React.PropTypes.func.isRequired,
  onTaskPriorityClick: React.PropTypes.func.isRequired,
  onTrackingClick: React.PropTypes.func.isRequired,
  addTask: React.PropTypes.func.isRequired
}
