import React from 'react'
import ReactTransitionGroup from 'react-addons-transition-group'
import TaskInfo from './TaskInfo'

const TaskInfoTransition = (props) =>
  <ReactTransitionGroup >
    {props.id ? <TaskInfo {...props} /> : null}
  </ReactTransitionGroup>


export default TaskInfoTransition
