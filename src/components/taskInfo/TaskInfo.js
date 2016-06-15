import React from 'react'
import PureRenderMixins from 'react-addons-pure-render-mixin'
import { Map, Set } from 'immutable'
import ImmutablePropTypes from 'react-immutable-proptypes'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import TaskTitle from './taskTitle/TaskTitle'
import TaskDescription from './taskDescription/TaskDescription'
import TaskProject from './taskProject/TaskProject.js'
import TaskContexts from './taskContexts/TaskContexts'
import TaskCalendar from './taskCalendar/TaskCalendar'
import Today from '../elements/today/Today'
import Checkbox from '../elements/checkbox/Checkbox'
import Priority from '../elements/priority/Priority'
import CloseBtn from '../elements/closeBtn/CloseBtn'

import './TaskInfo.less'

export default class TaskInfo extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixins.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="task-info-transition"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={5000}
        transitionLeaveTimeout={300} >
        {this.props.id !== '' ?
          <div className='task-info' >
            <CloseBtn appearance='task-info' onClick={this.props.onCloseClick} />
              <div className='task-info__content'>
                <div className='task-info__controls'>
                  <Checkbox appearance='task-info' checked={this.props.completed} onClick={() => this.props.onTaskCheckboxClick(this.props.id, !this.props.completed)} />
                  <Today appearance='task-info' checked={this.props.today} onClick={() => this.props.onTaskTodayClick(this.props.id, !this.props.today)}/>
                  <Priority appearance='task-info' priority={this.props.priority} onClick={(priority) => this.props.onPriorityClick(this.props.id, priority)} />
                </div>
                <div className='task-info__body'>
                  <div className='task-info__body-top'>
                    <TaskTitle id={this.props.id} title={this.props.title} onChange={this.props.onTitleChange} onBlur={this.props.onTitleChange} />
                    <TaskDescription id={this.props.id} description={this.props.description} onChange={this.props.onDescriptionChange} onBlur={this.props.onDescriptionChange} />
                    <TaskProject taskProject={this.props.taskProject} projects={this.props.projects} onProjectChange={(newProject) => this.props.onProjectChange(this.props.id, newProject)} />
                    <TaskContexts contexts={this.props.contexts} taskContexts={this.props.taskContexts} onContextClick={(context, status) => this.props.onContextClick(this.props.id, context, status)} />
                    <TaskCalendar id={this.props.id} selectedDate={this.props.date ? new Date(this.props.date) : undefined} onChange={this.props.onDateChange}/>
                  </div>
                  <button className='task-info__delete' onClick={() => this.props.onTaskDeleteClick(this.props.id)} tabIndex='0' >Delete task</button>
                </div>
              </div>
          </div> : null }
      </ReactCSSTransitionGroup>
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
  date: React.PropTypes.number,
  taskProject: React.PropTypes.string,
  taskContexts: React.PropTypes.instanceOf(Set),

  projects: ImmutablePropTypes.mapOf(
    ImmutablePropTypes.contains({
      id: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      completed: React.PropTypes.bool.isRequired
    })
  ),
  contexts: ImmutablePropTypes.mapOf(
    ImmutablePropTypes.contains({
      id: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired
    })
  ),

  onTaskCheckboxClick: React.PropTypes.func.isRequired,
  onTaskTodayClick: React.PropTypes.func.isRequired,
  onPriorityClick: React.PropTypes.func.isRequired,
  onTitleChange: React.PropTypes.func.isRequired,
  onDescriptionChange: React.PropTypes.func.isRequired,
  onProjectChange: React.PropTypes.func.isRequired,
  onContextClick: React.PropTypes.func.isRequired,
  onDateChange: React.PropTypes.func.isRequired,
  onTaskDeleteClick: React.PropTypes.func.isRequired,
  onCloseClick: React.PropTypes.func.isRequired
}
