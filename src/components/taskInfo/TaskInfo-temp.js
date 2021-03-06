import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import { Map, Set } from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { TransitionMotion, spring } from 'react-motion'

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
import { DEFAULT_TASKINFO_SIZE } from '../../constants/defaults'

import './TaskInfo.less'

export default class TaskInfo extends PureComponent {
  willEnter() {
    return {
      width: 0,
      opacity: 0
    }
  }

  willLeave() {
    return {
      width: spring(0),
      opacity: spring(0)
    }
  }
  getStyle(id) {
    return {
      key: id,
      style: {
        width: spring(DEFAULT_TASKINFO_SIZE),
        opacity: spring(1)
      }
    }
  }


  render() {
    return (
      <TransitionMotion
        willLeave={this.willLeave}
        willEnter={this.willEnter}
        styles={this.props.id ? [this.getStyle(this.props.id)] : []}>
        {interpolatedStyles => {
          return <div >
            {
              interpolatedStyles.map(config =>
                <div className='task-info' ref='taskInfo' style={config.style} key={config.key} >
                  <CloseBtn appearance='task-info' ref='closeBtn' onClick={this.props.onCloseClick} />
                    <div className='task-info__content'>
                      <div className='task-info__controls'>
                        <Checkbox appearance='task-info' checked={this.props.completed} onChange={() => this.props.onTaskCheckboxClick(this.props.id, !this.props.completed)} />
                        <Today appearance='task-info' checked={this.props.today} onClick={() => this.props.onTaskTodayClick(this.props.id, !this.props.today)}/>
                        <Someday appearance='task-info' checked={this.props.someday} onClick={() => this.props.onTaskSomedayClick(this.props.id, !this.props.someday)}/>
                        <Priority appearance='task-info' priority={this.props.priority} onClick={(priority) => this.props.onPriorityClick(this.props.id, priority)} />
                      </div>
                      <div className='task-info__body'>
                        <div className='task-info__body-top'>
                          <TaskTitle id={this.props.id} title={this.props.title} onChange={this.props.onTitleChange} onBlur={this.props.onTitleChange} ref='taskTitle' />
                          <TaskDescription id={this.props.id} description={this.props.description} onChange={this.props.onDescriptionChange} onBlur={this.props.onDescriptionChange} ref='taskDescription' />
                          <TaskProject taskProject={this.props.taskProject} projects={this.props.projects} onProjectChange={(newProject) => this.props.onProjectChange(this.props.id, newProject)} ref='taskProject' />
                          <TaskContexts contexts={this.props.contexts} taskContexts={this.props.taskContexts} onContextClick={(context, status) => this.props.onContextClick(this.props.id, context, status)} ref='taskContexts' />
                          <TaskCalendar ref='taskCalendar' id={this.props.id} selectedDate={this.props.date ? new Date(this.props.date) : undefined} onChange={this.props.onDateChange}/>
                        </div>
                        <button ref='taskDeleteBtn' className='task-info__delete' onClick={() => this.props.onTaskDeleteClick(this.props.id)} tabIndex='0' >Delete task</button>
                      </div>
                    </div>
                </div>
              )
            }
          </div>
        }}
      </TransitionMotion>


    )
  }
}

TaskInfo.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  completed: PropTypes.bool,
  today: PropTypes.bool,
  someday: PropTypes.bool,

  description: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Map)
  ]),
  priority: PropTypes.string,
  date: PropTypes.number,
  taskProject: PropTypes.string,
  taskContexts: PropTypes.instanceOf(Set),

  projects: ImmutablePropTypes.mapOf(
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
