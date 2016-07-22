import { connect } from 'react-redux'

import TaskInfoTransition from '../components/taskInfo/TaskInfoTransition'
import { getActiveItemID } from '../selectors/tasksSelector'
import * as activeTask from '../selectors/activeTaskSelector'
import { completeTask, setTaskToday, editTask, addTaskToProject, deleteTask, addTaskContext, removeTaskContext, setTaskSomeday } from '../actions/taskActions'
import { setActiveItem, toggleTaskLatency } from '../actions/uiStateActions'
import * as sectionTypes from '../constants/sectionTypes'
import { getProjects, getContexts, getSelectedSectionType, getSelectedSectionId } from '../reducer'

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
  sectionId: getSelectedSectionId(state),
  projects: getProjects(state),
  contexts: getContexts(state),
  someday: activeTask.getSomeday(state),
  deleted: activeTask.getDeleted(state)
})

const mapDispatchToProps = dispatch => ({
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
  onDateChange: (taskId, date) => dispatch(editTask(taskId, {date: date})),
  onTaskDeleteClick: (taskId, status) => {
    dispatch(deleteTask(taskId, !status))
    if (!status) {
      dispatch(setActiveItem())
    }
  },
  onCloseClick: () => dispatch(setActiveItem())
})

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign({}, ownProps, stateProps, Object.assign({}, dispatchProps, {
  onTaskTodayClick: (taskId, status) => dispatchProps.onTaskTodayClick(taskId, status, stateProps.sectionType),
  onTaskSomedayClick: (taskId, status) => dispatchProps.onTaskSomedayClick(taskId, status, stateProps.sectionType),
  onProjectChange: (taskId, projectId) => dispatchProps.onProjectChange(taskId, projectId, stateProps.sectionType, stateProps.sectionId),
  onContextClick: (taskId, contextId, contextStatus) => dispatchProps.onContextClick(taskId, contextId, contextStatus, stateProps.sectionType, stateProps.sectionId),
  onTaskDeleteClick: () => dispatchProps.onTaskDeleteClick(stateProps.id, stateProps.deleted)
}))

const TaskInfoContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(TaskInfoTransition)

export default TaskInfoContainer
