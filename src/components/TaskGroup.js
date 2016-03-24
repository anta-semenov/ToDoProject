import React, {PropTypes} from 'react'
import Task from './Task'

export default class TaskGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const name = this.props.groupName ? <div className='group__name'>{this.props.groupName}</div> : null
    return (<div className='group'>
      name
      <ul className='group__list'>
        {this.props.tasks.map(task =>
          <Task
            {...task}
            onClick = {() => this.props.onTaskClick(task.id)}
            onCheckboxClick = {() => this.props.onTaskCheckboxClick(task.id)}
          />
        )}
      </ul>
    </div>);
  }
}

TaskGroup.propTypes = {
  groupName: React.PropTypes.string,
  tasks: React.PropTypes.array.isRequired,
  onTaskClick: React.PropTypes.func.isRequired,
  onTaskCheckboxClick: React.PropTypes.func.isRequired
}
