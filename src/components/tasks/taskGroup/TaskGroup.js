import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { TransitionMotion, spring, presets } from 'react-motion'
import Task from '../task/Task'

import './TaskGroup.less'

const TaskGroup = ({ groupTitle, tasks, activeTask, latentTasks, trackingTask, ...rest}) => {
  const getDefaultStyles = () => tasks.toArray().map(task => ({
    key: task.get('id'),
    style: { opacity: 0, height: 0 },
    data: task
  }))
  const getStyles = () => tasks.toArray().map(task => ({
    key: task.get('id'),
    style: { opacity: spring(1), height: spring(46) },
    data: task
  }))
  const willEnter = () => ({ opacity: 0, height: 0 })
  const willLeave = () => ({ opacity: spring(0), height: spring(0) })

  return (
    <li className='task-group'>
      {groupTitle ? <div className='task-group__title'>{groupTitle}</div> : null}
      <TransitionMotion
        defaultStyles={getDefaultStyles()}
        styles={getStyles()}
        willEnter={willEnter}
        //willLeave={willLeave}
      >
        {styles => {
          return <ul className='task-group__list'>
            {styles.map(({ key, style, data }) => {
              return <Task
                {...rest}
                key={key}
                id={data.get('id')}
                style={style}

                active={activeTask === data.get('id')}
                latent={latentTasks ? latentTasks.has(data.get('id')) : undefined}
                tracking={trackingTask === data.get('id')}

                completed={data.get('completed')}
                today={data.get('today')}
                priority={data.get('priority')}
                someday={data.get('someday', false)}

                title={data.get('title')}
                description={data.get('description')}
                date={data.get('date') ? new Date(data.get('date')) : undefined}
              />
            })}
          </ul>
        }}
      </TransitionMotion>
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
