import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Task from '../task/Task'

import './TaskGroup.less'

const TaskGroup = ({ groupTitle, tasks, activeTask, latentTasks, trackingTask, ...rest}) => {
  return (
    <li className='task-group'>
      {groupTitle ? <div className='task-group__title'>{groupTitle}</div> : null}
      <ul className='task-group__list'>
        {tasks.map(task =>
          <Task
            {...rest}
            key={task.get('id')}
            id={task.get('id')}

            active={activeTask === task.get('id')}
            latent={latentTasks ? latentTasks.has(task.get('id')) : undefined}
            tracking={trackingTask === task.get('id')}

            completed={task.get('completed')}
            today={task.get('today')}
            priority={task.get('priority')}
            someday={task.get('someday', false)}

            title={task.get('title')}
            description={task.get('description')}
            date={task.get('date') ? new Date(task.get('date')) : undefined}
          />
        )}
      </ul>
    </li>
  )
}

TaskGroup.propTypes = {
  groupTitle: React.PropTypes.string,
  tasks: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      id: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      completed: React.PropTypes.bool.isRequired,
      today: React.PropTypes.bool.isRequired,
      priority: React.PropTypes.string.isRequired,
      description: React.PropTypes.oneOfType([
        React.PropTypes.string,
        ImmutablePropTypes.map
      ]),
      date: React.PropTypes.number
    })
  ).isRequired,
  activeTask: React.PropTypes.string,
  latentTasks: ImmutablePropTypes.mapOf(React.PropTypes.number),
  trackingTask: React.PropTypes.string,

  onTaskClick: React.PropTypes.func.isRequired,
  onTaskCheckboxClick: React.PropTypes.func.isRequired,
  onTaskTodayClick: React.PropTypes.func.isRequired,
  onTaskPriorityClick: React.PropTypes.func.isRequired,
  onTaskTrackingClick: React.PropTypes.func.isRequired,
  onTaskSomedayClick: React.PropTypes.func.isRequired
}

export default TaskGroup
