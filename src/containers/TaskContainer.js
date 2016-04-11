import { connect } from 'react-redux'

import Tasks from '../components/tasks/Tasks'
import { addTask, completeTask, setTaskToday, editTask } from '../actions/taskActions'
import { setActiveItem } from '../actions/uiStateActions'
import { TASK } from '../constants/itemTypes'
import { getTasksGroups, getSectionName, getSelectedSectionID, getSelectedSectionType } from '../selectors/tasksSelector'
import * as priorityLevels from '../constants/priorityLevels'

const mapStateToProps = (state) => {
  return {
    groups: getTasksGroups(state),
    header: getSectionName(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addTask: (taskTitle) => {dispatch(addTask({title: taskTitle}))},
    onTaskClick: (taskId) => {dispatch(setActiveItem({type: TASK, id: taskId}))},
    onTaskCheckboxClick: (taskId) => {dispatch(completeTask(taskId))},
    onTaskTodayClick: (taskId) => {dispatch(setTaskToday(taskId))},
    onTaskPriorityClick: (taskId, taskPriority) => {
      let newPriority = priorityLevels.PRIORITY_LOW
      switch (taskPriority) {
        case priorityLevels.PRIORITY_LOW:
          newPriority = priorityLevels.PRIORITY_MEDIUM
          break
        case priorityLevels.PRIORITY_MEDIUM:
          newPriority = priorityLevels.PRIORITY_HIGH
          break
        case priorityLevels.PRIORITY_HIGH:
          newPriority = priorityLevels.PRIORITY_MAX
          break
        case priorityLevels.PRIORITY_MAX:
          newPriority = priorityLevels.PRIORITY_NONE
          break
      }
      dispatch(editTask(taskId, {priority: newPriority}))
    }
  }
}

const TaskContainer = connect(mapStateToProps, mapDispatchToProps)(Tasks)
export default TaskContainer
