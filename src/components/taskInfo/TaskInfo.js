import React from 'react'
import PureRenderMixins from 'react-addons-pure-render-mixin'
import { Map } from 'immutable'
import TaskTitle from './taskTitle/TaskTitle'
import TaskDescription from './taskDescription/TaskDescription'
import * as priorityLevels from '../../constants/priorityLevels'
import './TaskInfo.less'

export default class TaskInfo extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixins.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <div className={`task-info ${this.props.id >= 0 ? 'is-open' : ''}` }>
        <div className='task-info__close' onClick={() => this.props.onCloseClick()} />
        {this.props.id >= 0 ?
          <div className='task-info__content'>
            <div className='task-info__controls'>
              <input type='checkbox' className='task__completed' checked={this.props.completed} onChange={() => this.props.onTaskCheckboxClick(this.props.id)} />
              <div className={`task__today ${this.props.today ? 'is-checked' : ''}`} onClick={() => this.props.onTaskTodayClick(this.props.id)} />
              <div className={`task__priority task__priority--${this.props.priority ? this.props.priority : 'none'}`} >
                <div className='task__priority-level task__priority-level--none' onClick={() => this.props.onPriorityClick(this.props.id, priorityLevels.PRIORITY_NONE)} />
                <div className='task__priority-level task__priority-level--max' onClick={() => this.props.onPriorityClick(this.props.id, priorityLevels.PRIORITY_MAX)} />
                <div className='task__priority-level task__priority-level--high' onClick={() => this.props.onPriorityClick(this.props.id, priorityLevels.PRIORITY_HIGH)} />
                <div className='task__priority-level task__priority-level--medium' onClick={() => this.props.onPriorityClick(this.props.id, priorityLevels.PRIORITY_MEDIUM)} />
                <div className='task__priority-level task__priority-level--low' onClick={() => this.props.onPriorityClick(this.props.id, priorityLevels.PRIORITY_LOW)} />
              </div>
            </div>
            <div className='task-info__body'>
              <div>
                <TaskTitle id={this.props.id} title={this.props.title} onChange={this.props.onTitleChange} />
                <TaskDescription id={this.props.id} description={this.props.description} onChange={this.props.onDescriptionChange} />
              </div>
              <button className='task-info__delete' onClick={() => this.props.onTaskDeleteClick(this.props.id)} tabIndex='0' >Delete task</button>
            </div>
          </div> : null
        }
      </div>
    )
  }
}

TaskInfo.propTypes = {
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string,
  completed: React.PropTypes.bool,
  today: React.PropTypes.bool,

  description: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.instanceOf(Map)
  ]),
  priority: React.PropTypes.string,
  date: React.PropTypes.object,
  project: React.PropTypes.number,
  contexts: React.PropTypes.object,

  onTaskCheckboxClick: React.PropTypes.func.isRequired,
  onTaskTodayClick: React.PropTypes.func.isRequired,
  onPriorityClick: React.PropTypes.func.isRequired,
  onTitleChange: React.PropTypes.func.isRequired,
  onDescriptionChange: React.PropTypes.func.isRequired,
  onProjectChange: React.PropTypes.func.isRequired,
  onContextsChange: React.PropTypes.func.isRequired,
  onDateChange: React.PropTypes.func.isRequired,
  onTaskDeleteClick: React.PropTypes.func.isRequired,
  onCloseClick: React.PropTypes.func.isRequired
}
