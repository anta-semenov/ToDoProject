import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Map } from 'immutable'
import { DATE_FORMAT } from '../../../constants/defaults'
import { descriptionToString } from '../../../utils/descriptionTransform'
import Today from '../../elements/today/Today'
import Checkbox from '../../elements/checkbox/Checkbox'
import Priority from '../../elements/priority/Priority'
import Someday from '../../elements/someday/Someday'
import { DragSource } from 'react-dnd'
import { TODAY, SOMEDAY, PROJECT, CONTEXT } from '../../../constants/sectionTypes'
import { TASK } from '../../../constants/dndTypes'

import './Task.less'

const appearance = 'tasks-list'

//Declare drag source
const taskSource = {
  beginDrag: props => ({
    taskId: props.id
  }),

  canDrag: props => !props.completed || !props.latent,

  endDrag: (props, monitor) => {
    if (!monitor.didDrop()) {
      return
    }
    //at this point our item was droped to target, so we have data about target and can fire action
    const dropResult = monitor.getDropResult()
    switch (dropResult.type) {
      case TODAY:
        props.onTaskTodayClick(props.id, true)
        break
      case SOMEDAY:
        props.onTaskSomedayClick(props.id, true)
        break
      case PROJECT:
        props.addTaskToProject(props.id, dropResult.id)
        break
      case CONTEXT:
        props.addTaskContext(props.id, dropResult.id)
        break
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      this.props.connectDragSource(
        <li className={`task ${this.props.completed ? 'is-completed' : ''} ${this.props.active ? 'is-active' : ''} ${this.props.latent && !this.props.completed ? 'is-latent-today' : ''} `}>
          <Checkbox appearance={appearance} checked={this.props.completed} dimmed={this.props.latent && !this.props.completed} onChange={() => this.props.onTaskCheckboxClick(this.props.id, !this.props.completed)} />
          <Today appearance={appearance} checked={this.props.today} dimmed={this.props.latent && !this.props.completed} disabled={this.props.completed} onClick={() => this.props.onTaskTodayClick(this.props.id, !this.props.today)} />
          <Someday appearance={appearance} checked={this.props.someday} dimmed={this.props.latent && !this.props.completed} disabled={this.props.completed} onClick={() => this.props.onTaskSomedayClick(this.props.id, !this.props.someday)}/>
          <Priority appearance={appearance} priority={this.props.priority} dimmed={this.props.latent && !this.props.completed} disabled={this.props.completed} onClick={(priority) => this.props.onPriorityClick(this.props.id, priority)}/>
          <div className='task__body' onClick={(e) => e.target !== this.refs.trackingBtn ? this.props.onTaskClick(this.props.id) : null } >
            <div className='task__main'>
              {this.props.connectDragPreview(<div className='task__title'>{this.props.title}</div>)}
              {descriptionToString(this.props.description) ? <div className='task__description'>{descriptionToString(this.props.description)}</div> : null}
            </div>
            <div className='task__extra'>
              {this.props.date ? <div className='task__date'>{this.props.date.toLocaleDateString('en-US', DATE_FORMAT)}</div> : null}
              <button ref='trackingBtn' className={`task__tracking ${this.props.isTracking ? 'is-active' : ''}`} onClick={() => this.props.onTrackingClick(this.props.id)}>
                <svg width='18px' height='18px' viewBox='0 0 18 18' version='1.1' vectorEffect='non-scaling-stroke'>
                  <g transform='translate(1.000000, 0.000000)'>
                    <circle id={`stopwatch__bezel-${this.props.id}`} stroke='#000000' fill='none' strokeWidth='1' cx='9' cy='10' r='6'></circle>
                    <g id={`stopwatch__stopwatch-${this.props.id}`}>
                      <polygon id='hand' fill='#000000' points='8 2.98944092 7 2.98944092 7.01660156 2 11 2 11 2.98944092 10 2.98944092 10 4.25482178 8 4.25482178'></polygon>
                      <path d='M9,5.45581055 C9.34204102,5.45581055 9.73310423,10.0430298 9.75054932,11 C9.75473391,11.2295507 9.5,11.4558105 9,11.4558105 C8.5,11.4558105 8.26983643,11.2215576 8.26983643,11 C8.26983643,10.0003052 8.65795898,5.45581055 9,5.45581055 Z' id='toggle' fill='#000000'></path>
                    </g>
                    <g id={`stopwatch__stop-${this.props.id}`}>
                      <rect x='6' y='7' width='6' height='6' rx='1' ry='1'></rect>
                    </g>
                    <g id={`stopwatch__start-${this.props.id}`}>
                      <path d='M7,6.99703014 C7,6.4463856 7.37532687,6.25021791 7.83427429,6.55618286 L12.1657257,9.44381714 C12.6264827,9.75098845 12.6246731,10.2502179 12.1657257,10.5561829 L7.83427429,13.4438171 C7.37351732,13.7509885 7,13.5469637 7,13.0029699 L7,6.99703014 Z'></path>
                    </g>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </li>
      )
    )
  }
}

Task.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  completed: React.PropTypes.bool.isRequired,
  today: React.PropTypes.bool.isRequired,
  someday: React.PropTypes.bool.isRequired,

  onTaskClick: React.PropTypes.func.isRequired,
  onTaskCheckboxClick: React.PropTypes.func.isRequired,
  onTaskTodayClick: React.PropTypes.func.isRequired,
  onPriorityClick: React.PropTypes.func.isRequired,
  onTrackingClick: React.PropTypes.func.isRequired,
  onTaskSomedayClick: React.PropTypes.func.isRequired,
  addTaskToProject: React.PropTypes.func.isRequired,
  addTaskContext: React.PropTypes.func.isRequired,

  description: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.instanceOf(Map)
  ]),
  priority: React.PropTypes.string,
  date: React.PropTypes.instanceOf(Date),
  active: React.PropTypes.bool,
  latent: React.PropTypes.bool,
  isTracking: React.PropTypes.bool
}

export const TaskConnectedDragSource = DragSource(TASK, taskSource, collect)(Task)
