import { createSelector } from 'reselect'
import { fromJS } from 'immutable'
import context from './context'
import project from './project'
import task, * as fromTask from './task'
import uiState from './uiState'
import auth, * as fromAuth from './auth.js'
import tracking, * as fromTracking from './tracking'

export default function rootReduser(state, action) {
  return state.withMutations(map => map
    .set('task', task(map.get('task'), action))
    .set('context', context(map.get('context'), action))
    .set('project', project(map.get('project'), action))
    .set('uiState', uiState(map.get('uiState'), action))
    .set('auth', auth(map.get('auth'), action))
    .set('tracking', tracking(map.get('tracking'), action))
  )
}

/*
 * Selectors
 */
export const getMaxKey = (state, dataType = 'task') => state.get(dataType).keySeq().max()
export const getUid = state => fromAuth.getUid(state.get('auth'))
export const getClientId = state => fromAuth.getClientId(state.get('auth'))

export const getTrackingTaskId = (state = fromJS({})) => fromTracking.getTrackingTaskId(state.get('tracking'))
const getTasks = (state = fromJS({})) => fromTask.getTasks(state.get('task'))
const getTrackingTask = createSelector(
  [getTrackingTaskId, getTasks],
  (trackingTaskId, tasks) => tasks.get(trackingTaskId)
)
export const getTrackingTaskTitle = createSelector([getTrackingTask], (task = fromJS({})) => task.get('title'))
export const getTrackingTaskStartTime = createSelector([getTrackingTask], (task = fromJS({})) => task.get('tracking', fromJS([])).size > 0 ? task.get('tracking', fromJS([])).last().get('startTime', undefined) : undefined)
