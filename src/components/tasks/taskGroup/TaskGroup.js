import PropTypes from 'prop-types'
import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import cn from 'classnames'
import { TransitionMotion, spring } from 'react-motion'
import Task from '../task/Task'

import './TaskGroup.less'

const TaskGroup = ({
  groupTitle,
  groupId,
  tasks,
  activeTask,
  latentTasks,
  trackingTask,
  onGroupNameClick,
  ...rest
}) => {
  const getDefaultStyles = () =>
    tasks.toArray().map(task => ({
      key: task.get('id'),
      style: { opacity: 0, height: 0 },
      data: task
    }))
  const getStyles = () =>
    tasks.toArray().map(task => ({
      key: task.get('id'),
      style: { opacity: spring(1) },
      data: task
    }))
  const willEnter = () => ({ opacity: 0 })

  return (
    <li className="task-group">
      {groupTitle ? (
        <div
          className={cn('task-group__title', groupId && 'is-clickable')}
          onClick={groupId ? onGroupNameClick(groupId) : undefined}
        >
          {groupTitle}
        </div>
      ) : null}
      <TransitionMotion
        defaultStyles={getDefaultStyles()}
        styles={getStyles()}
        willEnter={willEnter}
      >
        {styles => {
          return (
            <ul className="task-group__list">
              {styles.map(({ key, style, data }) => {
                return (
                  <Task
                    {...rest}
                    key={key}
                    id={data.get('id')}
                    style={style}
                    title={data.get('title')}
                    completed={data.get('completed')}
                    today={data.get('today')}
                    someday={data.get('someday', false)}
                    description={data.get('description')}
                    priority={data.get('priority')}
                    date={data.get('date') ? new Date(data.get('date')) : undefined}
                    active={activeTask === data.get('id')}
                    latent={latentTasks ? latentTasks.has(data.get('id')) : undefined}
                    tracking={trackingTask === data.get('id')}
                  />
                )
              })}
            </ul>
          )
        }}
      </TransitionMotion>
    </li>
  )
}

TaskGroup.propTypes = {
  groupTitle: PropTypes.string,
  groupId: PropTypes.string,
  tasks: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      today: PropTypes.bool.isRequired,
      priority: PropTypes.string.isRequired,
      description: PropTypes.oneOfType([PropTypes.string, ImmutablePropTypes.map]),
      date: PropTypes.number
    })
  ).isRequired,
  activeTask: PropTypes.string,
  latentTasks: ImmutablePropTypes.mapOf(PropTypes.number),
  trackingTask: PropTypes.string,

  onTaskClick: PropTypes.func.isRequired,
  onTaskCheckboxClick: PropTypes.func.isRequired,
  onTaskTodayClick: PropTypes.func.isRequired,
  onTaskPriorityClick: PropTypes.func.isRequired,
  onTaskTrackingClick: PropTypes.func.isRequired,

  addTaskToProject: PropTypes.func.isRequired,
  addTaskContext: PropTypes.func.isRequired,
  onGroupNameClick: PropTypes.func.isRequired
}

export default TaskGroup
