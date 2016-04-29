import { connect } from 'react-redux'

import TaskInfo from '../components/taskInfo/TaskInfo'
import { getActiveItemID, getSelectedSectionType } from '../selectors/tasksSelector'
import * as activeTask from '../selectors/activeTaskSelector'
import { completeTask, setTaskToday, editTask, addTaskToProject, removeTask } from '../actions/taskActions'
import { setActiveItem, toggleTaskCompletedLatency, toggleTaskTodayLatency } from '../actions/uiStateActions'
import { INBOX, TODAY } from '../constants/sectionTypes'

const mapStateToProps = (state) => ({
  id: getActiveItemID(state),
  title: activeTask.getTitle(state),
  completed: activeTask.getCompleted(state),
  today: activeTask.getToday(state),
  description: activeTask.getDescription(state),
  priority: activeTask.getPriority(state),
  project: activeTask.getProject(state),
  contexts: activeTask.getContexts(state),
  sectionType: getSelectedSectionType(state)
})

const mapDispatchToProps = dispatch => ({
  onTaskCheckboxClick: taskId => {
    dispatch(toggleTaskCompletedLatency(taskId))
    dispatch(completeTask(taskId))
  },
  onTaskTodayClick: (taskId, sectionType) => {
    if (sectionType === TODAY || sectionType === INBOX) {
      dispatch(toggleTaskTodayLatency(taskId))
    }
    dispatch(setTaskToday(taskId))
  },
  onPriorityClick: (taskId, priority) => dispatch(editTask(taskId, {priority})),
  onTitleChange: (taskId, title) => dispatch(editTask(taskId, {title})),
  onDescriptionChange: (taskId, description) => dispatch(editTask(taskId, {description})),
  onProjectChange: (taskId, projectId) => dispatch(addTaskToProject(taskId, projectId)),
  onContextsChange: (taskId, contexts) => dispatch(editTask(taskId, {contexts})),
  onDateChange: (taskId, date) => dispatch(editTask(taskId, {date})),
  onTaskDeleteClick: taskId => {
    dispatch(setActiveItem())
    dispatch(removeTask(taskId))    
  },
  onCloseClick: () => dispatch(setActiveItem())
})

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign({}, ownProps, stateProps, Object.assign({}, dispatchProps, {
  onTaskTodayClick: taskId => dispatchProps.onTaskTodayClick(taskId, stateProps.sectionType)
}))

const TaskInfoContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(TaskInfo)

export default TaskInfoContainer
