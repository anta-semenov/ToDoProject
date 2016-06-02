import { connect } from 'react-redux'

import Tasks from '../components/tasks/Tasks'
import { addTask, completeTask, setTaskToday, editTask } from '../actions/taskActions'
import { setActiveItem, toggleTaskCompletedLatency, toggleTaskLatency } from '../actions/uiStateActions'
import { getTasksGroups, getSectionName, getActiveItemID, getSelectedSectionID, getSelectedSectionType, getLatentTasks } from '../selectors/tasksSelector'
import * as sectionTypes from '../constants/sectionTypes'
import uniqueKey from '../utils/uniqueKeyGenerator'

const mapStateToProps = (state) => {
  return {
    groups: getTasksGroups(state),
    header: getSectionName(state),
    activeItem: getActiveItemID(state),
    selectedSectionID: getSelectedSectionID(state),
    selectedSectionType: getSelectedSectionType(state),
    latentTasks: getLatentTasks(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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
    addTask: (taskTitle) => dispatchProps.addTask(taskTitle, stateProps.selectedSectionType, stateProps.selectedSectionID),
    onTaskClick: dispatchProps.onTaskClick,
    onTaskCheckboxClick: dispatchProps.onTaskCheckboxClick,
    onTaskTodayClick: (taskId, status) => dispatchProps.onTaskTodayClick(taskId, status, stateProps.selectedSectionType),
    onTaskPriorityClick: dispatchProps.onTaskPriorityClick
  })
}

const TaskContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Tasks)
export default TaskContainer
