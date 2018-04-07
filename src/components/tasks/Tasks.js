import PropTypes from 'prop-types'
import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Motion, spring } from 'react-motion'
import {
  PROJECT,
  CONTEXT,
  INBOX,
  TODAY,
  NEXT,
  SOMEDAY,
  COMPLETED
} from '../../constants/sectionTypes.js'
import TaskGroup from './taskGroup/TaskGroup'
import AddTask from './addTask/AddTask'
import SectionHeader from '../sectionHeader/SectionHeader'
import EmptyTaskList from '../elements/emptyTaskList/EmptyTaskList'
import Loader from '../elements/loader/Loader'
import {
  DEFAULT_SIDEBAR_SIZE,
  DEFAULT_TASKINFO_SIZE,
  STANDART_SPRING
} from '../../constants/defaults'
import { AUTH_SUCESS, AUTH_IN_PROGRESS, AUTH_ERROR, AUTH_NONE } from '../../constants/authStatus'
import { DATA_NONE, DATA_ERROR, DATA_REQUESTED, DATA_RECIEVED } from '../../constants/dataStatuses'

import './Tasks.less'

const Tasks = ({
  dataStatus,
  authStatus,
  groups,
  activeTask,
  sectionName,
  sectionType,
  isSectionComplete,
  onSectionNameChange,
  onSectionDelete,
  onSectionComplete,
  addTask,
  setSearchQuery,
  onGroupNameClick,
  ...rest
}) => {
  const getDefaultStyle = () => ({ width: 0, opacity: 0 })
  const getStyle = isActive => ({
    width: isActive ? spring(DEFAULT_TASKINFO_SIZE, STANDART_SPRING) : spring(0, STANDART_SPRING),
    opacity: 1
  })
  const isEmpty = groups ? false : true

  if (
    authStatus === AUTH_IN_PROGRESS ||
    authStatus === AUTH_ERROR ||
    (authStatus !== AUTH_NONE && dataStatus === DATA_NONE)
  ) {
    return null
  } else if (dataStatus === DATA_REQUESTED) {
    return (
      <div className="tasks">
        <Loader appearance="section" />
      </div>
    )
  }

  return (
    <Motion defaultSyle={getDefaultStyle} style={getStyle(activeTask)}>
      {interpolatedStyle => (
        <div
          className="tasks"
          style={{
            width: `calc(100% - ${DEFAULT_SIDEBAR_SIZE}px - ${interpolatedStyle.width}px)`,
            opacity: interpolatedStyle.opacity
          }}
        >
          <SectionHeader
            sectionName={sectionName}
            sectionType={sectionType}
            isSectionComplete={isSectionComplete}
            onSectionNameChange={onSectionNameChange}
            onSectionDelete={onSectionDelete}
            onSectionComplete={onSectionComplete}
          />
          {sectionType !== COMPLETED && (
            <AddTask
              addTask={addTask}
              isSectionEmpty={isEmpty}
              hasFocus={isEmpty}
              setSearchQuery={setSearchQuery}
            />
          )}
          {groups ? (
            <ul className="tasks__list">
              {groups
                .toSeq()
                .map((group, index) => (
                  <TaskGroup
                    {...rest}
                    key={index}
                    groupTitle={group.get('title')}
                    groupId={group.get('id')}
                    onGroupNameClick={onGroupNameClick}
                    tasks={group.get('items')}
                    activeTask={activeTask}
                  />
                ))}
            </ul>
          ) : (
            <EmptyTaskList sectionType={sectionType} />
          )}
        </div>
      )}
    </Motion>
  )
}

Tasks.propTypes = {
  dataStatus: PropTypes.oneOf([DATA_NONE, DATA_ERROR, DATA_REQUESTED, DATA_RECIEVED]).isRequired,
  authStatus: PropTypes.oneOf([AUTH_SUCESS, AUTH_IN_PROGRESS, AUTH_ERROR, AUTH_NONE]).isRequired,
  groups: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      items: ImmutablePropTypes.listOf(
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
      title: PropTypes.string,
      id: PropTypes.string
    })
  ),
  searchQuery: PropTypes.string,
  activeTask: PropTypes.string,
  latentTasks: ImmutablePropTypes.mapOf(PropTypes.number),
  trackingTask: PropTypes.string,

  sectionName: PropTypes.string.isRequired,
  sectionType: PropTypes.oneOf([PROJECT, CONTEXT, INBOX, TODAY, NEXT, SOMEDAY]).isRequired,
  isSectionComplete: PropTypes.bool,

  onSectionNameChange: PropTypes.func.isRequired,
  onSectionDelete: PropTypes.func.isRequired,
  onSectionComplete: PropTypes.func.isRequired,

  onTaskClick: PropTypes.func.isRequired,
  onTaskCheckboxClick: PropTypes.func.isRequired,
  onTaskTodayClick: PropTypes.func.isRequired,
  onTaskPriorityClick: PropTypes.func.isRequired,
  onTaskTrackingClick: PropTypes.func.isRequired,
  addTaskToProject: PropTypes.func.isRequired,
  addTaskContext: PropTypes.func.isRequired,

  addTask: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  onGroupNameClick: PropTypes.func.isRequired
}

export default Tasks
