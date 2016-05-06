import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Map } from 'immutable'
import * as priorityLevels from '../../constants/priorityLevels'
import { DATE_FORMAT } from '../../constants/defaults'
import { descriptionToString } from '../../utils/descriptionTransform'

import './Task.less'

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <li className={`task ${this.props.completed ? 'is-completed' : ''} ${this.props.active ? 'is-active' : ''} ${this.props.latentToday ? 'is-latent-today' : ''} `}>
        <input type='checkbox' className='task__completed' checked={this.props.completed} onChange={() => this.props.onTaskCheckboxClick(this.props.id, !this.props.completed)} />
        <div className={`task__today ${this.props.today ? 'is-checked' : ''}`} onClick={() => this.props.onTaskTodayClick(this.props.id, !this.props.today)} />
        <div className={`task__priority task__priority--${this.props.priority ? this.props.priority : 'none'}`} >
          <div className='task__priority-level task__priority-level--none' onClick={() => this.props.onPriorityClick(this.props.id, priorityLevels.PRIORITY_NONE)} />
          <div className='task__priority-level task__priority-level--max' onClick={() => this.props.onPriorityClick(this.props.id, priorityLevels.PRIORITY_MAX)} />
          <div className='task__priority-level task__priority-level--high' onClick={() => this.props.onPriorityClick(this.props.id, priorityLevels.PRIORITY_HIGH)} />
          <div className='task__priority-level task__priority-level--medium' onClick={() => this.props.onPriorityClick(this.props.id, priorityLevels.PRIORITY_MEDIUM)} />
          <div className='task__priority-level task__priority-level--low' onClick={() => this.props.onPriorityClick(this.props.id, priorityLevels.PRIORITY_LOW)} />
        </div>
        <div className='task__body' onClick={() => this.props.onTaskClick(this.props.id)}>
          <div className='task__main'>
            <div className='task__title'>{this.props.title}</div>
            {descriptionToString(this.props.description) ? <div className='task__description'>{descriptionToString(this.props.description)}</div> : null}
          </div>
          {this.props.date ? <div className='task__date'>{this.props.date.toLocaleDateString('en-US', DATE_FORMAT)}</div> : null}
        </div>
      </li>
    )
  }
}

Task.propTypes = {
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  completed: React.PropTypes.bool.isRequired,
  today: React.PropTypes.bool.isRequired,

  onTaskClick: React.PropTypes.func.isRequired,
  onTaskCheckboxClick: React.PropTypes.func.isRequired,
  onTaskTodayClick: React.PropTypes.func.isRequired,
  onPriorityClick: React.PropTypes.func.isRequired,

  description: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.instanceOf(Map)
  ]),
  priority: React.PropTypes.string,
  date: React.PropTypes.instanceOf(Date),
  active: React.PropTypes.bool,
  latentToday: React.PropTypes.bool
}
