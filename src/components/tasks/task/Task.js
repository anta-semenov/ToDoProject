import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import { Map } from 'immutable'
import { DragSource } from 'react-dnd'
import classNames from 'classnames'
import { TODAY, SOMEDAY, PROJECT, CONTEXT } from '../../../constants/sectionTypes'
import { TASK } from '../../../constants/dndTypes'
import { DATE_FORMAT } from '../../../constants/defaults'
import { descriptionToString } from '../../../utils/descriptionTransform'
import Today from '../../elements/today/Today'
import Checkbox from '../../elements/checkbox/Checkbox'
import Priority from '../../elements/priority/Priority'
import Stopwatch from '../../elements/stopwatch/Stopwatch'

import './Task.less'

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

class Task extends PureComponent {
  render() {
    const taskClasses = classNames({
      'task': true,
      'is-completed': this.props.completed,
      'is-active': this.props.active,
      'is-latent-today': this.props.latent
    })
    const desciption = descriptionToString(this.props.description)
    return (
      this.props.connectDragSource(
        <li className={taskClasses}>
          <Checkbox
            appearance='tasks-list'
            checked={this.props.completed}
            dimmed={this.props.latent && !this.props.completed}
            onChange={() => this.props.onTaskCheckboxClick(this.props.id, !this.props.completed)}
          />
          <Today
            appearance='tasks-list'
            checked={this.props.today}
            dimmed={this.props.latent && !this.props.completed}
            disabled={this.props.completed}
            onClick={() => this.props.onTaskTodayClick(this.props.id, !this.props.today)}
          />
          <Priority
            appearance='tasks-list'
            priority={this.props.priority}
            dimmed={this.props.latent && !this.props.completed}
            disabled={this.props.completed}
            onClick={(priority) => this.props.onTaskPriorityClick(this.props.id, priority)}
          />
          <div className='task__body' onClick={() => this.props.onTaskClick(this.props.id)} >
            <div className='task__main' >
              <div className='task__title'>{this.props.title}</div>
              {desciption ?
                <div className='task__description'>{desciption}</div> : null
              }
            </div>
            <div className='task__extra'>
              {this.props.date ? <div className='task__date'>{this.props.date.toLocaleDateString('en-US', DATE_FORMAT)}</div> : null}
            </div>
          </div>
          <Stopwatch
            appearance='tasks-list'
            tracking={this.props.tracking}
            disabled={this.props.completed}
            onClick={() => this.props.onTaskTrackingClick(this.props.id)}
          />
        </li>
      )
    )
  }
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  today: PropTypes.bool.isRequired,
  someday: PropTypes.bool.isRequired,

  onTaskClick: PropTypes.func.isRequired,
  onTaskCheckboxClick: PropTypes.func.isRequired,
  onTaskTodayClick: PropTypes.func.isRequired,
  onTaskPriorityClick: PropTypes.func.isRequired,
  onTaskTrackingClick: PropTypes.func.isRequired,
  addTaskToProject: PropTypes.func.isRequired,
  addTaskContext: PropTypes.func.isRequired,

  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Map)
  ]),
  priority: PropTypes.string,
  date: PropTypes.instanceOf(Date),

  active: PropTypes.bool,
  latent: PropTypes.bool,
  tracking: PropTypes.bool
}

Task.defaultProps = {
  completed: false,
  today: false
}

export const TaskClass = Task

const TaskConnectedDragSource = DragSource(TASK, taskSource, collect)(Task)

export default TaskConnectedDragSource
