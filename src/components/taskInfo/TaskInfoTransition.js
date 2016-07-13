import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import TaskInfo from './TaskInfo'

const TaskInfoTransition = (props) =>
  <div className='task-info__transition'>
    <ReactCSSTransitionGroup transitionName="task-info" transitionEnterTimeout={400} transitionLeaveTimeout={300} >
      {props.id ? <TaskInfo {...props} /> : null}
    </ReactCSSTransitionGroup>
  </div>

export default TaskInfoTransition
