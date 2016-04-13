import { connect } from 'react-redux'

import Tasks from '../components/tasks/Tasks'
import { addTask, completeTask, setTaskToday, editTask } from '../actions/taskActions'
import { setActiveItem } from '../actions/uiStateActions'
import { TASK } from '../constants/itemTypes'
import { getTasksGroups, getSectionName, getSelectedSectionID, getSelectedSectionType } from '../selectors/tasksSelector'
import * as sectionTypes from '../constants/sectionTypes'

const mapStateToProps = (state) => {
  return {
    groups: getTasksGroups(state),
    header: getSectionName(state),
    selectedSectionID: getSelectedSectionID(state),
    selectedSectionType: getSelectedSectionType(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (taskTitle, sectionType, sectionID) => {
      let properties = {}
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
    onTaskClick: (taskId) => {dispatch(setActiveItem({type: TASK, id: taskId}))},
    onTaskCheckboxClick: (taskId) => {dispatch(completeTask(taskId))},
    onTaskTodayClick: (taskId) => {dispatch(setTaskToday(taskId))},
    onTaskPriorityClick: (taskId, taskPriority) => {dispatch(editTask(taskId, {priority: taskPriority}))}
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, stateProps, {
    addTask: (taskTitle) => dispatchProps.addTask(taskTitle, stateProps.selectedSectionType, stateProps.selectedSectionID),
    onTaskClick: dispatchProps.onTaskClick,
    onTaskCheckboxClick: dispatchProps.onTaskCheckboxClick,
    onTaskTodayClick: dispatchProps.onTaskTodayClick,
    onTaskPriorityClick: dispatchProps.onTaskPriorityClick
  })
}

const TaskContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Tasks)
export default TaskContainer
