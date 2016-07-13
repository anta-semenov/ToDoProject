import { connect } from 'react-redux'

import Tasks from '../components/tasks/Tasks'
import { addTask, completeTask, setTaskToday, editTask, stopTaskTracking, startTaskTracking, setTaskSomeday } from '../actions/taskActions'
import { setActiveItem, toggleTaskLatency } from '../actions/uiStateActions'
import { removeContext, editContext } from '../actions/contextActions'
import { removeProject, editProject, completeProject } from '../actions/projectActions'
import { getTasksGroups, getActiveItemID, getLatentTasks } from '../selectors/tasksSelector'
import { getTrackingTaskId, getSelectedSectionName, getSelectedSectionType, getSelectedSectionId, isSelectedSectionComplete } from '../reducer'
import * as sectionTypes from '../constants/sectionTypes'
import uniqueKey from '../utils/uniqueKeyGenerator'

const mapStateToProps = (state) => {
  return {
    groups: getTasksGroups(state),
    activeItem: getActiveItemID(state),
    latentTasks: getLatentTasks(state),
    trackingTask: getTrackingTaskId(state),

    sectionId: getSelectedSectionId(state),
    sectionName: getSelectedSectionName(state),
    sectionType: getSelectedSectionType(state),
    isSectionComplete: isSelectedSectionComplete(state)
  }
}

const mapDispatchToProps = (dispatch) => {
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
          dispatch(removeProject(sectionId))
          break
        case sectionTypes.CONTEXT:
          dispatch(removeContext(sectionId))
          break
      }
    },
    onSectionComplete: (sectionId, sectionType, isSectionComplete) => {
      if (sectionType === sectionTypes.PROJECT) {dispatch(completeProject(sectionId, !isSectionComplete))}
    },
    addTask: (taskTitle, sectionType, sectionId) => {
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
    onTaskClick: (taskId) => {dispatch(setActiveItem(taskId))},
    onTaskCheckboxClick: (taskId, status) => {
      dispatch(toggleTaskLatency(taskId, status))
      dispatch(completeTask(taskId, status))
      if (status) {dispatch(stopTaskTracking(taskId))}
    },
    onTaskTodayClick: (taskId, status, sectionType) => {
      if (sectionType === sectionTypes.TODAY) {dispatch(toggleTaskLatency(taskId, !status))}
      if (sectionType === sectionTypes.INBOX) {dispatch(toggleTaskLatency(taskId, status))}
      if (sectionType === sectionTypes.SOMEDAY) {dispatch(toggleTaskLatency(taskId, status))}
      dispatch(setTaskToday(taskId, status))
    },
    onTaskPriorityClick: (taskId, taskPriority) => {dispatch(editTask(taskId, {priority: taskPriority}))},
    onTrackingClick: (taskId, trackingTask) => {
      if (trackingTask === taskId) {dispatch(stopTaskTracking(taskId))}
      else {
        dispatch(stopTaskTracking(trackingTask))
        dispatch(startTaskTracking(taskId))
      }
    },
    onTaskSomedayClick: (taskId, status, sectionType) => {
      if (sectionType === sectionTypes.SOMEDAY) {dispatch(toggleTaskLatency(taskId, !status))}
      if (sectionType === sectionTypes.INBOX) {dispatch(toggleTaskLatency(taskId, status))}
      if (sectionType === sectionTypes.NEXT) {dispatch(toggleTaskLatency(taskId, status))}
      dispatch(setTaskSomeday(taskId, status))
    }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, stateProps, {
    onSectionNameChange: (newSectionName) => dispatchProps.onSectionNameChange(stateProps.sectionId, stateProps.sectionType, newSectionName),
    onSectionDelete: () => dispatchProps.onSectionDelete(stateProps.sectionId, stateProps.sectionType),
    onSectionComplete: () => dispatchProps.onSectionComplete(stateProps.sectionId, stateProps.sectionType, stateProps.isSectionComplete),

    addTask: (taskTitle) => dispatchProps.addTask(taskTitle, stateProps.sectionType, stateProps.sectionId),
    onTaskClick: dispatchProps.onTaskClick,
    onTaskCheckboxClick: dispatchProps.onTaskCheckboxClick,
    onTaskTodayClick: (taskId, status) => dispatchProps.onTaskTodayClick(taskId, status, stateProps.sectionType),
    onTaskPriorityClick: dispatchProps.onTaskPriorityClick,
    onTrackingClick: (taskId) => dispatchProps.onTrackingClick(taskId, stateProps.trackingTask),
    onTaskSomedayClick: (taskId, status) => dispatchProps.onTaskSomedayClick(taskId, status, stateProps.sectionType)
  })
}

const TaskContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Tasks)
export default TaskContainer
