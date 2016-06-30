import { connect } from 'react-redux'

import Tasks from '../components/tasks/Tasks'
import { addTask, completeTask, setTaskToday, editTask, stopTaskTracking, startTaskTracking } from '../actions/taskActions'
import { setActiveItem, toggleTaskLatency } from '../actions/uiStateActions'
import { removeContext, editContext } from '../actions/contextActions'
import { removeProject, editProject } from '../actions/projectActions'
import { getTasksGroups, getSectionName, getActiveItemID, getSelectedSectionID, getSelectedSectionType, getLatentTasks } from '../selectors/tasksSelector'
import { getTrackingTaskId } from '../reducer'
import * as sectionTypes from '../constants/sectionTypes'
import uniqueKey from '../utils/uniqueKeyGenerator'

const mapStateToProps = (state) => {
  return {
    groups: getTasksGroups(state),
    activeItem: getActiveItemID(state),
    sectionID: getSelectedSectionID(state),
    sectionName: getSectionName(state),
    sectionType: getSelectedSectionType(state),
    latentTasks: getLatentTasks(state),
    trackingTask: getTrackingTaskId(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSectionNameChange: (sectionID, sectionType, newSectionName) => {
      switch (sectionType) {
        case sectionTypes.PROJECT:
          dispatch(editProject(sectionID, { title: newSectionName || 'New Project' }))
          break
        case sectionTypes.CONTEXT:
          dispatch(editContext(sectionID, { title: newSectionName || 'New Context' }))
          break
      }
    },
    onSectionDelete: (sectionID, sectionType) => {
      switch (sectionType) {
        case sectionTypes.PROJECT:
          dispatch(removeProject(sectionID))
          break
        case sectionTypes.CONTEXT:
          dispatch(removeContext(sectionID))
          break
      }
    },
    addTask: (taskTitle, sectionType, sectionID) => {
      let properties = {id: uniqueKey()}
      if (taskTitle !== '') {
        properties.title = taskTitle
      }
      switch (sectionType) {
        case sectionTypes.TODAY:
          properties.today = true
          break

        case sectionTypes.CONTEXT:
          properties.contexts = [sectionID]
          break

        case sectionTypes.PROJECT:
          properties.project = sectionID
          break
      }
      dispatch(addTask(properties))
    },
    onTaskClick: (taskId) => {dispatch(setActiveItem(taskId))},
    onTaskCheckboxClick: (taskId, status) => {
      dispatch(toggleTaskLatency(taskId, status))
      dispatch(completeTask(taskId, status))
      if (status) {dispatch(stopTaskTracking())}
    },
    onTaskTodayClick: (taskId, status, sectionType) => {
      if (sectionType === sectionTypes.TODAY) {dispatch(toggleTaskLatency(taskId, !status))}
      if (sectionType === sectionTypes.INBOX) {dispatch(toggleTaskLatency(taskId, status))}
      dispatch(setTaskToday(taskId, status))
    },
    onTaskPriorityClick: (taskId, taskPriority) => {dispatch(editTask(taskId, {priority: taskPriority}))},
    onTrackingClick: (taskId, trackingTask) => {
      if (trackingTask === taskId) {dispatch(stopTaskTracking(taskId))}
      else {
        dispatch(stopTaskTracking(trackingTask))
        dispatch(startTaskTracking(taskId))
      }
    }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, stateProps, {
    onSectionNameChange: (newSectionName) => dispatchProps.onSectionNameChange(stateProps.sectionID, stateProps.sectionType, newSectionName),
    onSectionDelete: () => dispatchProps.onSectionDelete(stateProps.sectionID, stateProps.sectionType),
    addTask: (taskTitle) => dispatchProps.addTask(taskTitle, stateProps.sectionType, stateProps.sectionID),
    onTaskClick: dispatchProps.onTaskClick,
    onTaskCheckboxClick: dispatchProps.onTaskCheckboxClick,
    onTaskTodayClick: (taskId, status) => dispatchProps.onTaskTodayClick(taskId, status, stateProps.sectionType),
    onTaskPriorityClick: dispatchProps.onTaskPriorityClick,
    onTrackingClick: (taskId) => dispatchProps.onTrackingClick(taskId, stateProps.trackingTask)
  })
}

const TaskContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Tasks)
export default TaskContainer
