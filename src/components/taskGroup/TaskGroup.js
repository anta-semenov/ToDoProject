import React from 'react'
import Task from '../task/Task'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './TaskGroup.less'

export default class TaskGroup extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <li className='task-group'>
        {this.props.groupTitle ? <div className='task-group__title'>{this.props.groupTitle}</div> : null}
        <ul className='task-group__list'>
          {this.props.tasks.map(task =>
            <Task
              key={`task-${task.get('id')}`}
              id={task.get('id')}
              title={task.get('title')}
              completed={task.get('completed')}
              today={task.get('today')}

              description={task.get('description')}
              priority={task.get('priority')}
              date={task.get('date')}
              active={this.props.activeItem === task.get('id')}
              latentToday={this.props.todayLatentTasks ? this.props.todayLatentTasks.includes(task.get('id')) : undefined}

              onTaskClick={this.props.onTaskClick}
              onTaskCheckboxClick={this.props.onTaskCheckboxClick}
              onTaskTodayClick={this.props.onTaskTodayClick}
              onPriorityClick={this.props.onPriorityClick}
            />
          )}
        </ul>
      </li>)
  }
}

TaskGroup.propTypes = {
  groupTitle: React.PropTypes.string,
  tasks: React.PropTypes.object.isRequired,
  activeItem: React.PropTypes.number,
  todayLatentTasks: React.PropTypes.object,
  onTaskClick: React.PropTypes.func.isRequired,
  onTaskCheckboxClick: React.PropTypes.func.isRequired,
  onTaskTodayClick: React.PropTypes.func.isRequired,
  onPriorityClick: React.PropTypes.func.isRequired
}
