import { createSelector } from 'reselect'
import { getActiveItemID } from './tasksSelector'
import { fromJS } from 'immutable'

const getAllTasks = state => (state.get('task') || fromJS({}))

const getActiveTask = createSelector(
  [getActiveItemID, getAllTasks],
  (activeTaskId, tasks) => {
    return (tasks.get('' + activeTaskId) || undefined)
  }
)

export const getTitle = createSelector([getActiveTask], activeTask => activeTask ? activeTask.get('title') : undefined)
export const getDescription = createSelector([getActiveTask], activeTask => activeTask ? activeTask.get('description') : undefined)
export const getCompleted = createSelector([getActiveTask], activeTask => activeTask ? activeTask.get('completed') : undefined)
export const getToday = createSelector([getActiveTask], activeTask => activeTask ? activeTask.get('today') : undefined)
export const getPriority = createSelector([getActiveTask], activeTask => activeTask ? activeTask.get('priority') : undefined)
export const getDate = createSelector([getActiveTask], activeTask => activeTask ? new Date(activeTask.get('date')) : undefined)
export const getProject = createSelector([getActiveTask], activeTask => activeTask ? activeTask.get('project') : undefined)
export const getContexts = createSelector([getActiveTask], activeTask => activeTask ? activeTask.get('contexts') : undefined)
