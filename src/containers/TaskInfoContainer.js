import { connect } from 'react-redux'

import TaskInfo from '../components/taskInfo/TaskInfo'
import { getActiveItemID, getSelectedSectionType, getSelectedSectionID } from '../selectors/tasksSelector'
import * as activeTask from '../selectors/activeTaskSelector'
import { completeTask, setTaskToday, editTask, addTaskToProject, removeTask, addTaskContext, removeTaskContext } from '../actions/taskActions'
import { setActiveItem, toggleTaskCompletedLatency, toggleTaskLatency } from '../actions/uiStateActions'
import * as sectionTypes from '../constants/sectionTypes'

const mapStateToProps = (state) => ({
  id: getActiveItemID(state),
  title: activeTask.getTitle(state),
  completed: activeTask.getCompleted(state),
  today: activeTask.getToday(state),
  description: activeTask.getDescription(state),
  priority: activeTask.getPriority(state),
  taskProject: activeTask.getProject(state),
  taskContexts: activeTask.getContexts(state),
  date: activeTask.getDate(state),
  sectionType: getSelectedSectionType(state),
  sectionId: getSelectedSectionID(state),
  projects: state.get('project', undefined),
  contexts: state.get('context')
})

const mapDispatchToProps = dispatch => ({
  onTaskCheckboxClick: (taskId, status) => {
    dispatch(toggleTaskCompletedLatency(taskId))
    dispatch(completeTask(taskId, status))
  },
  onTaskTodayClick: (taskId, status, sectionType) => {
    if (sectionType === sectionTypes.TODAY) {dispatch(toggleTaskLatency(taskId, !status))}
    if (sectionType === sectionTypes.INBOX) {dispatch(toggleTaskLatency(taskId, status))}
    dispatch(setTaskToday(taskId, status))
  },
  onPriorityClick: (taskId, priority) => dispatch(editTask(taskId, {priority})),
  onTitleChange: (taskId, title) => dispatch(editTask(taskId, {title})),
  onDescriptionChange: (taskId, description) => dispatch(editTask(taskId, {description})),
  onProjectChange: (taskId, projectId, sectionType, sectionId) => {
    dispatch(addTaskToProject(taskId, projectId))
    if (sectionType === sectionTypes.PROJECT && sectionId === projectId) {
      dispatch(toggleTaskLatency(taskId, false))
    } else if ((sectionType === sectionTypes.PROJECT && sectionId !== projectId) || (sectionType === sectionTypes.INBOX && projectId)) {
      dispatch(toggleTaskLatency(taskId, true))
    }
  },
  onContextClick: (taskId, contextId, contextStatus, sectionType, sectionId) => {
    if (sectionType === sectionTypes.CONTEXT && sectionId === contextId) {
      dispatch(toggleTaskLatency(taskId, !contextStatus))
    }
    if (contextStatus) {dispatch(addTaskContext(taskId, contextId))}
    else {dispatch(removeTaskContext(taskId, contextId))}
  },
  onDateChange: (taskId, date) => dispatch(editTask(taskId, {date: date})),
  onTaskDeleteClick: taskId => {
    dispatch(setActiveItem())
    dispatch(removeTask(taskId))
  },
  onCloseClick: () => dispatch(setActiveItem())
})

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign({}, ownProps, stateProps, Object.assign({}, dispatchProps, {
  onTaskTodayClick: (taskId, status) => dispatchProps.onTaskTodayClick(taskId, status, stateProps.sectionType),
  onProjectChange: (taskId, projectId) => dispatchProps.onProjectChange(taskId, projectId, stateProps.sectionType, stateProps.sectionId),
  onContextClick: (taskId, contextId, contextStatus) => dispatchProps.onContextClick(taskId, contextId, contextStatus, stateProps.sectionType, stateProps.sectionId)
}))

const TaskInfoContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(TaskInfo)

export default TaskInfoContainer
