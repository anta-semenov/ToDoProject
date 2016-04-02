import React from 'react'
import Task from '../task/Task'
import PureRenderMixin from 'react-addons-pure-render-mixin'

require('./TaskGroup.less')

export default class TaskGroup extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <li className='group'>
        {this.props.groupName ? <div className='group__name'>{this.props.groupName}</div> : null}
        <ul className='group__list'>
          {this.props.tasks.map(task =>
            <Task
              id={task.get('id')}
              title={task.get('title')}
              completed={task.get('completed')}
              today={task.get('today')}

              description={task.get('description')}
              priority={task.get('prioroty')}
              date={task.get('date')}
              active={this.props.activeItem === task.get('id')}

              onTaskClick={this.props.onTaskClick}
              onCheckboxClick={this.props.onTaskCheckboxClick}
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
  onTaskClick: React.PropTypes.func.isRequired,
  onTaskCheckboxClick: React.PropTypes.func.isRequired,
  onTaskTodayClick: React.PropTypes.func.isRequired,
  onPriorityClick: React.PropTypes.func.isRequired
}
