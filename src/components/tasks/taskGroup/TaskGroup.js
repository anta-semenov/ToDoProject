import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import FlipMove from 'react-flip-move'
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
          <FlipMove enterAnimation='fade' leaveAnimation='fade'>
            {this.props.tasks.map(task =>
              <Task
                key={`task-${task.get('id')}`}
                id={task.get('id')}
                title={task.get('title')}
                completed={task.get('completed')}
                today={task.get('today')}
                someday={task.get('someday', false)}

                description={task.get('description')}
                priority={task.get('priority')}
                date={task.get('date') ? new Date(task.get('date')) : undefined}
                active={this.props.activeItem === task.get('id')}
                latent={this.props.latentTasks ? this.props.latentTasks.has(task.get('id')) : undefined}
                isTracking={this.props.trackingTask === task.get('id')}

                onTaskClick={this.props.onTaskClick}
                onTaskCheckboxClick={this.props.onTaskCheckboxClick}
                onTaskTodayClick={this.props.onTaskTodayClick}
                onPriorityClick={this.props.onPriorityClick}
                onTrackingClick={this.props.onTrackingClick}
                onTaskSomedayClick={this.props.onTaskSomedayClick}
              />
            )}
          </FlipMove>
        </ul>
      </li>)
  }
}

TaskGroup.propTypes = {
  groupTitle: React.PropTypes.string,
  tasks: ImmutablePropTypes.listOf(
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
  activeItem: React.PropTypes.string,
  latentTasks: ImmutablePropTypes.mapOf(React.PropTypes.number),
  trackingTask: React.PropTypes.string,
  onTaskClick: React.PropTypes.func.isRequired,
  onTaskCheckboxClick: React.PropTypes.func.isRequired,
  onTaskTodayClick: React.PropTypes.func.isRequired,
  onPriorityClick: React.PropTypes.func.isRequired,
  onTrackingClick: React.PropTypes.func.isRequired,
  onTaskSomedayClick: React.PropTypes.func.isRequired
}
