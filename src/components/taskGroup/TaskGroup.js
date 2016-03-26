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
    return (<div className='group'>
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

            onClick={() => this.props.onTaskClick(task.get('id'))}
            onCheckboxClick={() => this.props.onTaskCheckboxClick(task.get('id'))}
            onTaskTodayClick={() => this.props.onTaskTodayClick(task.get('id'))}
            onPriorityClick={() => this.props.onPriorityClick(task.get('id'))}
          />
        )}
      </ul>
    </div>)
  }
}

TaskGroup.propTypes = {
  groupName: React.PropTypes.string,
  tasks: React.PropTypes.array.isRequired,
  onTaskClick: React.PropTypes.func.isRequired,
  onTaskCheckboxClick: React.PropTypes.func.isRequired,
  onTaskTodayClick: React.PropTypes.func.isRequired,
  onPriorityClick: React.PropTypes.func.isRequired,
}
