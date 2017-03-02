import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import TaskInfoTransition from '../components/taskInfo/TaskInfoTransition'
import { completeTask, setTaskToday, editTask, addTaskToProject, deleteTask, addTaskContext, removeTaskContext, setTaskSomeday } from '../actions/taskActions'
import { toggleTaskLatency } from '../actions/uiStateActions'
import * as sectionTypes from '../constants/sectionTypes'
import { getProjects, getContexts, getSelectedSection, getSelectedTask } from '../reducer'

const mapStateToProps = (state, ownProps) => {
  const { sectionType, sectionId } = getSelectedSection(state, ownProps)
  return {
  ...getSelectedTask(state, ownProps),
  sectionType: sectionType,
  sectionId: sectionId,
  projects: getProjects(state),
  contexts: getContexts(state)
}}

const mapDispatchToProps = (dispatch) => ({
  onTaskCheckboxClick: (taskId, status) => {
    dispatch(toggleTaskLatency(taskId, status))
    dispatch(completeTask(taskId, status))
  },
  onTaskTodayClick: (taskId, status, sectionType) => {
    if (sectionType === sectionTypes.TODAY) {dispatch(toggleTaskLatency(taskId, !status))}
    if (sectionType === sectionTypes.INBOX) {dispatch(toggleTaskLatency(taskId, status))}
    if (sectionType === sectionTypes.SOMEDAY) {dispatch(toggleTaskLatency(taskId, status))}
    dispatch(setTaskToday(taskId, status))
  },
  onTaskSomedayClick: (taskId, status, sectionType) => {
    if (sectionType === sectionTypes.SOMEDAY) {dispatch(toggleTaskLatency(taskId, !status))}
    if (sectionType === sectionTypes.INBOX) {dispatch(toggleTaskLatency(taskId, status))}
    if (sectionType === sectionTypes.NEXT) {dispatch(toggleTaskLatency(taskId, status))}
    dispatch(setTaskSomeday(taskId, status))
  },
  onPriorityClick: (taskId, priority) => dispatch(editTask(taskId, {priority})),
  onTitleChange: (taskId, title) => dispatch(editTask(taskId, {title})),
  onDescriptionChange: (taskId, description) => dispatch(editTask(taskId, {description})),
  onProjectChange: (taskId, projectId, sectionType, sectionId) => {
    dispatch(addTaskToProject(taskId, projectId))
    if ((sectionType === sectionTypes.PROJECT && sectionId === projectId) || (sectionType === sectionTypes.INBOX && !projectId)) {
      dispatch(toggleTaskLatency(taskId, false))
    } else if ((sectionType === sectionTypes.PROJECT && sectionId !== projectId) || (sectionType === sectionTypes.INBOX && projectId)) {
      dispatch(toggleTaskLatency(taskId, true))
    }
  },
  onContextClick: (taskId, contextId, contextStatus, sectionType, sectionId) => {
    if (sectionType === sectionTypes.CONTEXT && sectionId === contextId) {
      dispatch(toggleTaskLatency(taskId, !contextStatus))
    } else if (sectionType === sectionTypes.INBOX) {
      dispatch(toggleTaskLatency(taskId, contextStatus))
    }
    if (contextStatus) {dispatch(addTaskContext(taskId, contextId))}
    else {dispatch(removeTaskContext(taskId, contextId))}
  },
  onDateChange: (taskId, date) => dispatch(editTask(taskId, { date: date || 0 })), // Set date to 0, so it could sync with Firebase
  onTaskDeleteClick: (taskId, status, section) => {
    dispatch(deleteTask(taskId, !status))
    if (!status) {browserHistory.push(`/${section}`)}
  },
  onCloseClick: (section) => browserHistory.push(`/${section}`)
})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { id, sectionType, sectionId, deleted } = stateProps
  const { section } = ownProps
  const { onTaskTodayClick, onTaskSomedayClick, onProjectChange, onContextClick, onTaskDeleteClick, onCloseClick } = dispatchProps
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onTaskTodayClick: (taskId, status) => onTaskTodayClick(taskId, status, sectionType),
    onTaskSomedayClick: (taskId, status) => onTaskSomedayClick(taskId, status, sectionType),
    onProjectChange: (taskId, projectId) => onProjectChange(taskId, projectId, sectionType, sectionId),
    onContextClick: (taskId, contextId, contextStatus) => onContextClick(taskId, contextId, contextStatus, sectionType, sectionId),
    onTaskDeleteClick: () => onTaskDeleteClick(id, deleted, section),
    onCloseClick: () => onCloseClick(section)
  }
}

const TaskInfoContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(TaskInfoTransition)

export default TaskInfoContainer
