import { connect } from 'react-redux'
import { fromJS } from 'immutable'

import Tasks from '../components/tasks/Tasks'
import { addTask, completeTask, setTaskToday, editTask } from '../actions/taskActions'
import { setActiveItem } from '../actions/uiStateActions'
import { TASK } from '../constants/itemTypes'
import getTasksGroups from '../selectors/tasksGroups'
import * as priorityLevels from '../constants/priorityLevels'

const mapStateToProps = (state) => {
  return {
    groups: getTasksGroups(state)//fromJS([{items: state.get('task')}]) //
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (taskTitle) => {dispatch(addTask({title: taskTitle}))},
    onTaskClick: (taskId) => {dispatch(setActiveItem({type: TASK, id: taskId}))},
    onTaskCheckboxClick: (taskId) => {dispatch(completeTask(taskId))},
    onTaskTodayClick: (taskId) => {dispatch(setTaskToday(taskId))},
    onTaskPriorityClick: (taskId, taskPriority) => {
      switch (taskPriority) {
        case priorityLevels.PRIORITY_NONE:
          dispatch(editTask(taskId, {prioroty: priorityLevels.PRIORITY_LOW}))
          break
        case priorityLevels.PRIORITY_LOW:
          dispatch(editTask(taskId, {prioroty: priorityLevels.PRIORITY_MEDIUM}))
          break
        case priorityLevels.PRIORITY_MEDIUM:
          dispatch(editTask(taskId, {prioroty: priorityLevels.PRIORITY_HIGH}))
          break
        case priorityLevels.PRIORITY_HIGH:
          dispatch(editTask(taskId, {prioroty: priorityLevels.PRIORITY_MAX}))
          break
        case priorityLevels.PRIORITY_MAX:
          dispatch(editTask(taskId, {prioroty: priorityLevels.PRIORITY_NONE}))
          break
      }
    }
  }
}

const TaskContainer = connect(mapStateToProps, mapDispatchToProps)(Tasks)
export default TaskContainer
