import React from 'react'
import PureRenderMixins from 'react-addons-pure-render-mixin'
import { Map, Set } from 'immutable'

import TaskTitle from './taskTitle/TaskTitle'
import TaskDescription from './taskDescription/TaskDescription'
import TaskCalendar from './taskCalendar/TaskCalendar'
import Today from '../controls/today/Today'
import Checkbox from '../controls/checkbox/Checkbox'
import CloseBtn from '../controls/closeBtn/CloseBtn'

import * as priorityLevels from '../../constants/priorityLevels'
import './TaskInfo.less'

export default class TaskInfo extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixins.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <div className={`task-info ${this.props.id != -1 ? 'is-open' : ''}` }>
        <CloseBtn appearance='task-info' onClick={this.props.onCloseClick} />
        {this.props.id != -1 ?
          <div className='task-info__content'>
            <div className='task-info__controls'>
              <Checkbox appearance={'task-info'} checked={this.props.completed} onClick={() => this.props.onTaskCheckboxClick(this.props.id, !this.props.completed)} />
              <Today appearance={'task-info'} checked={this.props.today} onClick={() => this.props.onTaskTodayClick(this.props.id, !this.props.today)}/>
              <div className={`task__priority task__priority--${this.props.priority ? this.props.priority : 'none'}`} >
                <div className='task__priority-level task__priority-level--none' onClick={() => this.props.onPriorityClick(this.props.id, priorityLevels.PRIORITY_NONE)} />
                <div className='task__priority-level task__priority-level--max' onClick={() => this.props.onPriorityClick(this.props.id, priorityLevels.PRIORITY_MAX)} />
                <div className='task__priority-level task__priority-level--high' onClick={() => this.props.onPriorityClick(this.props.id, priorityLevels.PRIORITY_HIGH)} />
                <div className='task__priority-level task__priority-level--medium' onClick={() => this.props.onPriorityClick(this.props.id, priorityLevels.PRIORITY_MEDIUM)} />
                <div className='task__priority-level task__priority-level--low' onClick={() => this.props.onPriorityClick(this.props.id, priorityLevels.PRIORITY_LOW)} />
              </div>
            </div>
            <div className='task-info__body'>
              <div className='task-info__body-top'>
                <TaskTitle id={this.props.id} title={this.props.title} onChange={this.props.onTitleChange} />
                <TaskDescription id={this.props.id} description={this.props.description} onChange={this.props.onDescriptionChange} />
                <TaskCalendar id={this.props.id} selectedDate={this.props.date} onChange={this.props.onDateChange}/>
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
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string,
  completed: React.PropTypes.bool,
  today: React.PropTypes.bool,

  description: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.instanceOf(Map)
  ]),
  priority: React.PropTypes.string,
  date: React.PropTypes.instanceOf(Date),
  project: React.PropTypes.number,
  contexts: React.PropTypes.instanceOf(Set),

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
