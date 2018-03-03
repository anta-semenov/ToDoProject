import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import { Map, Set } from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'

import TaskTitle from './taskTitle/TaskTitle'
import TaskDescription from './taskDescription/TaskDescription'
import TaskProject from './taskProject/TaskProject.js'
import TaskContexts from './taskContexts/TaskContexts'
import TaskCalendar from './taskCalendar/TaskCalendar'
import Today from '../elements/today/Today'
import Checkbox from '../elements/checkbox/Checkbox'
import Priority from '../elements/priority/Priority'
import CloseBtn from '../elements/closeBtn/CloseBtn'
import Someday from '../elements/someday/Someday'
import TaskRepeat from './taskRepeat/TaskRepeat'

import './TaskInfo.less'

export default class TaskInfo extends PureComponent {
  render() {
    const {id, completed, today, someday, priority, title, description, taskProject, taskContexts,
      date, deleted, repeat, projects, contexts, onTaskCheckboxClick, onTaskTodayClick,
      onTaskSomedayClick, onPriorityClick, onProjectChange, onContextClick, onDateChange,
      onTitleChange, onDescriptionChange, onTaskDeleteClick, onRepeatChange, onCloseClick} = this.props

    return (
      <div className='task-info'>
        <CloseBtn appearance='task-info'onClick={onCloseClick} />
          <div className='task-info__content'>
            <div className='task-info__controls'>
              <Checkbox appearance='task-info' checked={completed} onChange={() => onTaskCheckboxClick(id, !completed)} />
              <Today appearance='task-info' checked={today} onClick={() => onTaskTodayClick(id, !today)}/>
              <Someday appearance='task-info' checked={someday} onClick={() => onTaskSomedayClick(id, !someday)}/>
              <Priority appearance='task-info' priority={priority} onClick={(priority) => onPriorityClick(id, priority)} />
            </div>
            <div className='task-info__body'>
              <div className='task-info__body-top'>
                <TaskTitle id={id} title={title} onChange={onTitleChange} onBlur={onTitleChange} />
                <TaskDescription id={id} description={description} onChange={onDescriptionChange} onBlur={onDescriptionChange} />
                <TaskProject taskProject={taskProject} projects={projects} onProjectChange={(newProject) => onProjectChange(id, newProject)} />
                <TaskContexts contexts={contexts} taskContexts={taskContexts} onContextClick={(context, status) => onContextClick(id, context, status)} />
                <TaskCalendar ref='taskCalendar' id={id} selectedDate={date ? new Date(date) : undefined} onChange={onDateChange}/>
                <TaskRepeat repeat={repeat ? repeat.toJS() : repeat} onRepeatChange={value => onRepeatChange(id, value)}/>
              </div>
              <button className='task-info__delete' onClick={() => onTaskDeleteClick()} tabIndex='0' >{deleted ? 'Recover task' : 'Delete task'}</button>
            </div>
          </div>
      </div>
    )
  }
}

TaskInfo.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  completed: PropTypes.bool,
  today: PropTypes.bool,
  someday: PropTypes.bool,
  deleted: PropTypes.bool,

  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Map)
  ]),
  priority: PropTypes.string,
  date: PropTypes.number,
  taskProject: PropTypes.string,
  taskContexts: PropTypes.instanceOf(Set),

  projects: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    })
  ),
  contexts: ImmutablePropTypes.mapOf(
    ImmutablePropTypes.contains({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ),

  onTaskCheckboxClick: PropTypes.func.isRequired,
  onTaskTodayClick: PropTypes.func.isRequired,
  onPriorityClick: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  onProjectChange: PropTypes.func.isRequired,
  onContextClick: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onTaskDeleteClick: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  onTaskSomedayClick: PropTypes.func.isRequired
}
