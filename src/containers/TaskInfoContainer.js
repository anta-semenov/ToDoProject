import { connect } from 'react-redux'

import TaskInfo from '../components/taskInfo/TaskInfo'
import { getActiveItemID } from '../selectors/tasksSelector'
import * as activeTask from '../selectors/activeTaskSelector'
import { completeTask, setTaskToday, editTask, addTaskToProject, removeTask } from '../actions/taskActions'
import { setActiveItem, toggleTaskCompletedLatency } from '../actions/uiStateActions'

const mapStateToProps = (state) => ({
  id: getActiveItemID(state),
  title: activeTask.getTitle(state),
  completed: activeTask.getCompleted(state),
  today: activeTask.getToday(state),
  description: activeTask.getDescription(state),
  priority: activeTask.getPriority(state),
  project: activeTask.getProject(state),
  contexts: activeTask.getContexts(state)
})

const mapDispatchToProps = dispatch => ({
  onTaskCheckboxClick: taskId => {
    dispatch(toggleTaskCompletedLatency(taskId))
    dispatch(completeTask(taskId))
  },
  onTaskTodayClick: taskId => dispatch(setTaskToday(taskId)),
  onPriorityClick: (taskId, priority) => dispatch(editTask(taskId, {priority})),
  onTitleChange: (taskId, title) => dispatch(editTask(taskId, {title})),
  onDescriptionChange: (taskId, description) => dispatch(editTask(taskId, {description})),
  onProjectChange: (taskId, projectId) => dispatch(addTaskToProject(taskId, projectId)),
  onContextsChange: (taskId, contexts) => dispatch(editTask(taskId, {contexts})),
  onDateChange: (taskId, date) => dispatch(editTask(taskId, {date})),
  onTaskDeleteClick: taskId => dispatch(removeTask(taskId)),
  onCloseClick: () => dispatch(setActiveItem())
})

const TaskInfoContainer = connect(mapStateToProps, mapDispatchToProps)(TaskInfo)

export default TaskInfoContainer
