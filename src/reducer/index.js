import { createSelector } from 'reselect'
import { fromJS } from 'immutable'
import context, * as fromContext from './context'
import project, * as fromProject from './project'
import task from './task'
import uiState, * as fromUiState from './uiState'
import auth, * as fromAuth from './auth.js'
import tracking, * as fromTracking from './tracking'
import order from './order'
import * as sectionTypes from '../constants/sectionTypes'
import * as sectionNames from '../constants/sectionNames'

const rootReducer = (state, action) => {
  return state.withMutations(map => map
    .set('task', task(map.get('task'), action))
    .set('context', context(map.get('context'), action))
    .set('project', project(map.get('project'), action))
    .set('uiState', uiState(map.get('uiState'), action))
    .set('auth', auth(map.get('auth'), action))
    .set('tracking', tracking(map.get('tracking'), action))
    .set('order', order(map.get('order'), action))
  )
}

export default rootReducer

/*
 * Selectors
 */

// Tasks
const getTasks = (state = fromJS({})) => state.get('task')

// Projects
export const getProjects = (state = fromJS({})) => fromProject.getProjects(state.get('project'))

// Contexts
export const getContexts = (state = fromJS({})) => fromContext.getContexts(state.get('context'))

// Client Data
export const getUid = state => fromAuth.getUid(state.get('auth'))
export const getClientId = state => fromAuth.getClientId(state.get('auth'))

// Tracking tasks
export const getTrackingTaskId = (state = fromJS({})) => fromTracking.getTrackingTaskId(state.get('tracking'))
const getTrackingTask = createSelector(
  [getTrackingTaskId, getTasks],
  (trackingTaskId, tasks = fromJS({})) => tasks.get(trackingTaskId)
)
export const getTrackingTaskTitle = createSelector([getTrackingTask], (task = fromJS({})) => task.get('title'))
export const getTrackingTaskStartTime = createSelector([getTrackingTask], (task = fromJS({})) =>
  task.get('tracking', fromJS([])).size > 0 ? task.get('tracking', fromJS([])).last().get('startTime', undefined) : undefined
)

// Selected Section
export const getSelectedSectionType = (state = fromJS({})) => fromUiState.getSelectedSectionType(state.get('uiState'), undefined)
export const getSelectedSectionId = (state = fromJS({})) => fromUiState.getSelectedSectionId(state.get('uiState'), undefined)
export const getSelectedSectionName = createSelector(
  [getSelectedSectionType, getSelectedSectionId, getProjects, getContexts],
  (sectionType, sectionId, projects = fromJS({}), contexts = fromJS({})) => {
    switch (sectionType) {
      case sectionTypes.PROJECT:
        return projects.getIn([sectionId, 'title'], undefined)

      case sectionTypes.CONTEXT:
        return contexts.getIn([sectionId, 'title'], undefined)

      case sectionTypes.INBOX:
        return sectionNames.INBOX

      case sectionTypes.TODAY:
        return sectionNames.TODAY

      case sectionTypes.NEXT:
        return sectionNames.NEXT
      case sectionTypes.SOMEDAY:
        return sectionNames.SOMEDAY
    }
  }
)
export const isSelectedSectionComplete = createSelector(
  [getSelectedSectionType, getSelectedSectionId, getProjects],
  (sectionType, sectionId, projects) => {
    switch (sectionType) {
      case sectionTypes.PROJECT:
        return projects.getIn([sectionId, 'completed'], false)
      default:
        return false
    }
  }
)
