import { connect } from 'react-redux'
import { fromJS } from 'immutable'

import Tasks from '../components/tasks/Tasks'
import { addTask, completeTask, setTaskToday, editTask } from '../actions/taskActions'
import { setActiveItem } from '../actions/uiStateActions'
import { TASK } from '../constants/itemTypes'
import tasksGoups from '../selectors/tasksGroups'
import * as priorityLevels from '../constants/priorityLevels'

const mapStateToProps = (state) => {
  return {
    groups: tasksGoups(state)//fromJS([{items: state.get('task')}]) //
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
          dispath(editTask(taskId, {prioroty: priorityLevels.PRIORITY_LOW}))
        case priorityLevels.PRIORITY_LOW:
          dispath(editTask(taskId, {prioroty: priorityLevels.PRIORITY_MEDIUM}))
        case priorityLevels.PRIORITY_MEDIUM:
          dispath(editTask(taskId, {prioroty: priorityLevels.PRIORITY_HIGH}))
        case priorityLevels.PRIORITY_HIGH:
          dispath(editTask(taskId, {prioroty: priorityLevels.PRIORITY_MAX}))
        case priorityLevels.PRIORITY_MAX:
          dispath(editTask(taskId, {prioroty: priorityLevels.PRIORITY_NONE}))
      }
    }
  }
}

const TaskContainer = connect(mapStateToProps, mapDispatchToProps)(Tasks)
export default TaskContainer
