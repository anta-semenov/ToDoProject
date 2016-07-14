import React from 'react'
import { Map } from 'immutable'
import { DATE_FORMAT } from '../../../constants/defaults'
import { descriptionToString } from '../../../utils/descriptionTransform'
import Today from '../../elements/today/Today'
import Checkbox from '../../elements/checkbox/Checkbox'
import Priority from '../../elements/priority/Priority'
import Someday from '../../elements/someday/Someday'
import Stopwatch from '../../elements/stopwatch/Stopwatch'

import './Task.less'

const Task = ({ id, active, latent, tracking, completed, today, priority, someday, title, description, date,
  onTaskCheckboxClick, onTaskTodayClick, onTaskSomedayClick, onTaskPriorityClick, onTaskClick, onTaskTrackingClick}) => {
  return (
    <li className={`task${completed ? ' is-completed' : ''}${active ? ' is-active' : ''}${latent && !completed ? ' is-latent-today' : ''} `} >
      <Checkbox
        appearance='tasks-list'
        checked={completed}
        dimmed={latent && !completed}
        onChange={() => onTaskCheckboxClick(id, !completed)}
      />
      <Today
        appearance='tasks-list'
        checked={today}
        dimmed={latent && !completed}
        disabled={completed}
        onClick={() => onTaskTodayClick(id, !today)}
      />
      <Someday
        appearance='tasks-list'
        checked={someday}
        dimmed={latent && !completed}
        disabled={completed}
        onClick={() => onTaskSomedayClick(id, !someday)}
      />
      <Priority
        appearance='tasks-list'
        priority={priority}
        dimmed={latent && !completed}
        disabled={completed}
        onClick={(priority) => onTaskPriorityClick(id, priority)}
      />
      <div className='task__body' onClick={() => onTaskClick(id)} >
        <div className='task__main' >
          <div className='task__title'>{title}</div>
          {descriptionToString(description) ? <div className='task__description'>{descriptionToString(description)}</div> : null}
        </div>
        <div className='task__extra'>
          {date ? <div className='task__date'>{date.toLocaleDateString('en-US', DATE_FORMAT)}</div> : null}
        </div>
      </div>
      <Stopwatch appearance='tasks-list' tracking={tracking} onClick={() => onTaskTrackingClick(id)} />
    </li>
  )
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
  onTaskPriorityClick: React.PropTypes.func.isRequired,
  onTaskTrackingClick: React.PropTypes.func.isRequired,
  onTaskSomedayClick: React.PropTypes.func.isRequired,

  description: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.instanceOf(Map)
  ]),
  priority: React.PropTypes.string,
  date: React.PropTypes.instanceOf(Date),

  active: React.PropTypes.bool,
  latent: React.PropTypes.bool,
  tracking: React.PropTypes.bool
}

export default Task
