import { connect } from 'react-redux'

import Tasks from '../components/tasks/Tasks'
import { addTask, completeTask, setTaskToday, editTask } from '../actions/taskActions'
import { setActiveItem, toggleTaskLatency, setSelectedSection } from '../actions/uiStateActions'
import { removeContext, editContext } from '../actions/contextActions'
import { removeProject, editProject } from '../actions/projectActions'
import { getTasksGroups, getSectionName, getActiveItemID, getSelectedSectionID, getSelectedSectionType, getLatentTasks } from '../selectors/tasksSelector'
import * as sectionTypes from '../constants/sectionTypes'
import uniqueKey from '../utils/uniqueKeyGenerator'

const mapStateToProps = (state) => {
  return {
    groups: getTasksGroups(state),
    activeItem: getActiveItemID(state),
    sectionID: getSelectedSectionID(state),
    sectionName: getSectionName(state),
    sectionType: getSelectedSectionType(state),
    latentTasks: getLatentTasks(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSectionNameChange: (sectionID, sectionType, sectionName) => {
      switch (sectionType) {
        case sectionTypes.PROJECT:
          dispatch(editProject(sectionID, { title: sectionName || 'New Project' }))
          break
        case sectionType.CONTEXT:
          dispatch(editContext(sectionID, { title: sectionName || 'New Context' }))
          break
      }
    },
    onSectionDelete: (sectionID, sectionType) => {
      switch (sectionType) {
        case sectionTypes.PROJECT:
          dispatch(removeProject(sectionID))
          break
        case sectionType.CONTEXT:
          dispatch(removeContext(sectionID))
          break
      }
      dispatch(setSelectedSection({type: sectionTypes.INBOX}))
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
    },
    onTaskTodayClick: (taskId, status, sectionType) => {
      if (sectionType === sectionTypes.TODAY) {dispatch(toggleTaskLatency(taskId, !status))}
      if (sectionType === sectionTypes.INBOX) {dispatch(toggleTaskLatency(taskId, status))}
      dispatch(setTaskToday(taskId, status))
    },
    onTaskPriorityClick: (taskId, taskPriority) => {dispatch(editTask(taskId, {priority: taskPriority}))}
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, stateProps, {
    onSectionNameChange: (sectionName) => dispatchProps.onSectionNameChange(stateProps.sectionID, stateProps.sectionType, sectionName),
    onSectionDelete: () => dispatchProps.onSectionDelete(stateProps.sectionID, stateProps.sectionType),
    addTask: (taskTitle) => dispatchProps.addTask(taskTitle, stateProps.selectedSectionType, stateProps.selectedSectionID),
    onTaskClick: dispatchProps.onTaskClick,
    onTaskCheckboxClick: dispatchProps.onTaskCheckboxClick,
    onTaskTodayClick: (taskId, status) => dispatchProps.onTaskTodayClick(taskId, status, stateProps.sectionType),
    onTaskPriorityClick: dispatchProps.onTaskPriorityClick
  })
}

const TaskContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Tasks)
export default TaskContainer
