import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Tasks from '../components/tasks/Tasks'
import { addTask, completeTask, setTaskToday, editTask, stopTaskTracking, startTaskTracking, addTaskToProject, addTaskContext } from '../actions/taskActions'
import { toggleTaskLatency, setSearchQuery } from '../actions/uiStateActions'
import { deleteContext, editContext } from '../actions/contextActions'
import { deleteProject, editProject, completeProject } from '../actions/projectActions'
import { getTrackingTaskId, getSelectedSection, getTasksGroups, getLatentTasks, getAuthStatus, getDataStatus, getSearchQuery, getFilteredTasks } from '../reducer'
import * as sectionTypes from '../constants/sectionTypes'
import uniqueKey from '../utils/uniqueKeyGenerator'

const mapStateToProps = (state, ownProps) => ({
  ...getSelectedSection(state, ownProps),
  dataStatus: getDataStatus(state),
  searchQuery: getSearchQuery(state),
  authStatus: getAuthStatus(state),
  initialGgroups: getTasksGroups(state, ownProps),
  groups: getFilteredTasks(state, ownProps),
  activeTask: ownProps.task,
  latentTasks: getLatentTasks(state),
  trackingTask: getTrackingTaskId(state)
})

const mapDispatchToProps = (dispatch, { section }) => {
  return {
    onSectionNameChange: (sectionId, sectionType, newSectionName) => {
      switch (sectionType) {
        case sectionTypes.PROJECT:
          dispatch(editProject(sectionId, { title: newSectionName || 'New Project' }))
          break
        case sectionTypes.CONTEXT:
          dispatch(editContext(sectionId, { title: newSectionName || 'New Context' }))
          break
      }
    },
    onSectionDelete: (sectionId, sectionType) => {
      switch (sectionType) {
        case sectionTypes.PROJECT:
          dispatch(deleteProject(sectionId, true))
          break
        case sectionTypes.CONTEXT:
          dispatch(deleteContext(sectionId, true))
          break
      }
    },
    onSectionComplete: (sectionId, sectionType, isSectionComplete) => {
      if (sectionType === sectionTypes.PROJECT) {dispatch(completeProject(sectionId, !isSectionComplete))}
    },
    addTask: (taskTitle, sectionId, sectionType) => {
      let properties = {id: uniqueKey()}
      if (taskTitle !== '') {
        properties.title = taskTitle
      }
      switch (sectionType) {
        case sectionTypes.TODAY:
          properties.today = true
          break

          case sectionTypes.SOMEDAY:
            properties.someday = true
            break

        case sectionTypes.CONTEXT:
          properties.contexts = [sectionId]
          break

        case sectionTypes.PROJECT:
          properties.project = sectionId
          break
      }
      dispatch(addTask(properties))
    },
    onTaskClick: (taskId) => {browserHistory.push(`/${section}/${taskId}`)},
    onTaskCheckboxClick: (taskId, status) => {
      dispatch(toggleTaskLatency(taskId, section === sectionTypes.COMPLETED ? !status : status))
      dispatch(completeTask(taskId, status))
      if (status) {dispatch(stopTaskTracking(taskId))}
    },
    onTaskTodayClick: (taskId, status) => {
      if (section === sectionTypes.TODAY) {dispatch(toggleTaskLatency(taskId, !status))}
      if (section === sectionTypes.INBOX) {dispatch(toggleTaskLatency(taskId, status))}
      if (section === sectionTypes.SOMEDAY) {dispatch(toggleTaskLatency(taskId, status))}
      dispatch(setTaskToday(taskId, status))
    },
    onTaskPriorityClick: (taskId, taskPriority) => {dispatch(editTask(taskId, {priority: taskPriority}))},
    onTaskTrackingClick: (taskId, trackingTask) => {
      if (trackingTask === taskId) {dispatch(stopTaskTracking(taskId))}
      else {
        dispatch(stopTaskTracking(trackingTask))
        dispatch(startTaskTracking(taskId))
      }
    },
    addTaskToProject: (taskId, projectId) => {dispatch(addTaskToProject(taskId, projectId))},
    addTaskContext: (taskId, contextId) => {dispatch(addTaskContext(taskId, contextId))},
    setSearchQuery: (query) => {dispatch(setSearchQuery(query))}
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { onSectionNameChange, onSectionDelete, onSectionComplete, addTask, onTaskTrackingClick, ...rest } = dispatchProps
  const { sectionId, sectionType, isSectionComplete, trackingTask } = stateProps
  return {
    ...ownProps,
    ...stateProps,
    ...rest,
    onSectionNameChange: (newSectionName) => onSectionNameChange(sectionId, sectionType, newSectionName),
    onSectionDelete: () => onSectionDelete(sectionId, sectionType),
    onSectionComplete: () => onSectionComplete(sectionId, sectionType, isSectionComplete),
    addTask: (taskTitle) => dispatchProps.addTask(taskTitle, sectionId, sectionType),
    onTaskTrackingClick: (taskId) => dispatchProps.onTaskTrackingClick(taskId, trackingTask)
  }
}

const TaskContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Tasks)
export default TaskContainer
