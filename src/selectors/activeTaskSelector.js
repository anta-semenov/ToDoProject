import { createSelector } from 'reselect'
import { getActiveItemID, getAllTasks } from './tasksSelector'

const getActiveTask = createSelector(
  [getActiveItemID, getAllTasks],
  (activeTaskId, tasks) => activeTaskId >= 0 ? tasks.filter(task => task.get('id') === activeTaskId).get(0) : undefined
)

export const getTitle = createSelector([getActiveTask], activeTask => activeTask ? activeTask.get('title') : undefined)
export const getDescription = createSelector([getActiveTask], activeTask => activeTask ? activeTask.get('description') : undefined)
export const getCompleted = createSelector([getActiveTask], activeTask => activeTask ? activeTask.get('completed') : undefined)
export const getToday = createSelector([getActiveTask], activeTask => activeTask ? activeTask.get('today') : undefined)
export const getPriority = createSelector([getActiveTask], activeTask => activeTask ? activeTask.get('priority') : undefined)
export const getDate = createSelector([getActiveTask], activeTask => activeTask ? activeTask.get('date') : undefined)
export const getProject = createSelector([getActiveTask], activeTask => activeTask ? activeTask.get('project') : undefined)
export const getContexts = createSelector([getActiveTask], activeTask => activeTask ? activeTask.get('contexts') : undefined)
