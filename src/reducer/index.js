import { createSelector } from 'reselect'
import { fromJS } from 'immutable'
import context, * as fromContext from './context'
import project, * as fromProject from './project'
import task from './task'
import uiState, * as fromUiState from './uiState'
import auth, * as fromAuth from './auth.js'
import undoRedo from './undoRedo'
import { REMOVE_TASK, REMOVE_PROJECT, REMOVE_CONTEXT } from '../constants/actionTypes'
import tracking, * as fromTracking from './tracking'
import order, * as fromOrder from './order'
import * as sectionTypes from '../constants/sectionTypes'
import * as sectionNames from '../constants/sectionNames'
import { PRIORITY } from '../constants/priorityLevels'

const orderState = (state = fromJS({})) => {
  if (
    (!state.hasIn(['order', 'project']) && state.get('project', fromJS({})).size > 0) ||
    (!state.hasIn(['order', 'context']) && state.get('context', fromJS({})).size > 0)
  ) {
    const orderAsMutable = state.get('order', fromJS({})).asMutable()
    if (!state.hasIn(['order', 'project'])) {
      orderAsMutable.set('project', state.get('project', fromJS({})).keySeq().toList())
    }
    if (!state.hasIn(['order', 'context'])) {
      orderAsMutable.set('context', state.get('context', fromJS({})).keySeq().toList())
    }
    return orderAsMutable.asImmutable()
  }
  return state.get('order')
}

const appLogicReducer = (state, action) => {
  return state.withMutations(map => map
    .set('task', task(map.get('task'), action))
    .set('context', context(map.get('context'), action))
    .set('project', project(map.get('project'), action))
    .set('uiState', uiState(map.get('uiState'), action))
    .set('auth', auth(map.get('auth'), action))
    .set('tracking', tracking(map.get('tracking'), action))
    .set('order', order(orderState(state), action))
  )
}

const rootReducer = undoRedo(appLogicReducer, {
  undoProps: ['task', 'project', 'context'],
  undoActions: [REMOVE_TASK, REMOVE_CONTEXT, REMOVE_PROJECT]
})

export default rootReducer

/*
 * Selectors
 */

// Tasks
const getTasks = (state = fromJS({})) => state.get('task')
export const getLatentTasks = (state = fromJS({})) => fromUiState.getLatentTasks(state.get('uiState'))
const getVisibleTasks = createSelector(
  [getTasks, getLatentTasks],
  (tasks, latentTasks) => tasks.filter(task => (!task.get('completed', false) || latentTasks.has(task.get('id'))) && !task.get('deleted', false)).sort((a, b) => {
    return  PRIORITY.indexOf(a.get('priority')) > PRIORITY.indexOf(b.get('priority')) ? -1 :
            PRIORITY.indexOf(a.get('priority')) < PRIORITY.indexOf(b.get('priority')) ? 1 :
            a.get('id') > b.get('id') ? 1 :
            a.get('id') < b.get('id') ? -1 : 0
  })
)
const groupTasksByProject = (tasks, projects) => {
  const NO_PROJECT = 'NO_PROJECT'
  const groupedTasks = tasks.groupBy(task => task.get('project', NO_PROJECT))
  const groups = groupedTasks.has(NO_PROJECT) ? fromJS([{ items: groupedTasks.get(NO_PROJECT).toList() }]) : fromJS([])
  return groups.concat(projects.filter(project => groupedTasks.has(project.get('id'))).map((project) => {
    return fromJS({
      title: project.get('title'),
      items: groupedTasks.get(project.get('id'), fromJS({})).toList()
    })
  }))
}

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
const getSectionFromProps = (state, props = {}) => props.section
export const getSelectedSection = createSelector(
  [getProjects, getContexts, getSectionFromProps],
  (projects, contexts, section) => {
    switch (section) {
      case sectionTypes.INBOX:
      case sectionTypes.TODAY:
      case sectionTypes.NEXT:
      case sectionTypes.SOMEDAY:
        return {
          sectionType: section,
          sectionName: sectionNames[section.toUpperCase()]
        }

      default:
        if (contexts.has(section)) {
          return {
            sectionType: sectionTypes.CONTEXT,
            sectionId: section,
            sectionName: contexts.getIn([section, 'title'], undefined)
          }
        } else {
          const project = projects.get(section, fromJS({}))
          return {
            sectionType: sectionTypes.PROJECT,
            sectionId: section,
            sectionName: project.get('title'),
            isSectionComplete: project.get('completed')
          }
        }
    }
  }
)

// Active Task
const getTaskFromProps = (state, props = {}) => props.task
export const getSelectedTask = createSelector(
  [getTasks, getTaskFromProps],
  (tasks, taskId) => {
    if (!taskId) { return undefined }
    const task = tasks.get(taskId, fromJS({}))
    return {
      id: task.get('id'),
      title: task.get('title'),
      description: task.get('description'),
      date: task.get('date'),
      completed: task.get('completed'),
      today: task.get('today'),
      someday: task.get('someday'),
      deleted: task.get('deleted'),
      priority: task.get('priority'),
      taskProject: task.get('project'),
      taskContexts: task.get('contexts')
    }
  }
)

// Ordered Projects
const getProjectOrder = (state = fromJS({})) => fromOrder.getProjectOrder(state.get('order'))
export const getOrderedProjectsList = createSelector(
  [getProjectOrder, getProjects],
  (order, projects) => fromOrder.sortedList(order, projects)
)

// Ordered Contexts
const getContextOrder = (state = fromJS({})) => fromOrder.getContextOrder(state.get('order'))
export const getOrderedContextsList = createSelector(
  [getContextOrder, getContexts],
  (order, contexts) => fromOrder.sortedList(order, contexts)
)

//Order initialisation
export const initOrderState = (fullState) => {
  if (fullState.get('order', fromJS({})).size === 2) {
    return fullState
  }

  const projectOrderArray = fullState.get('project').toList().filter(project => !project.get('completedDeleted')).sortBy(project => project.get('id'), (a, b) => a > b ? -1 : a < b ? 1 : 0).map(item => item.get('id'))
  const contextOrderArray = fullState.get('context').toList().filter(context => !context.get('deleted')).sortBy(context => context.get('id'), (a, b) => a > b ? -1 : a < b ? 1 : 0).map(item => item.get('id'))

  return fullState.set('order', fromOrder.initState(projectOrderArray.toArray(), contextOrderArray.toArray()))
}

// Grouped Tasks
export const getTasksGroups = createSelector(
  [getSelectedSection, getVisibleTasks, getLatentTasks, getOrderedProjectsList],
  ({ sectionType, sectionId }, tasks, latentTasks, projects) => {
    switch (sectionType) {
      case sectionTypes.CONTEXT: {
        const sectionTasks = tasks.filter(task => task.get('contexts', fromJS([])).includes(sectionId) || latentTasks.has(task.get('id')))
        return sectionTasks.count() > 0 ? groupTasksByProject(sectionTasks, projects) : undefined
      }

      case sectionTypes.PROJECT: {
        const sectionTasks = tasks.filter(task => task.get('project') === sectionId || latentTasks.has(task.get('id')))
        return sectionTasks.count() > 0 ? fromJS([{items: sectionTasks.toList()}]) : undefined
      }

      case sectionTypes.TODAY: {
        const sectionTasks = tasks.filter(task => task.get('today') === true || latentTasks.has(task.get('id')))
        return sectionTasks.count() > 0 ? groupTasksByProject(sectionTasks, projects) : undefined
      }

      case sectionTypes.NEXT: {
        const sectionTasks = tasks.filter(task => !task.get('someday', false) || latentTasks.has(task.get('id')))
        return sectionTasks.count() > 0 ? groupTasksByProject(sectionTasks, projects) : undefined
      }

      case sectionTypes.INBOX: {
        const sectionTasks = tasks.filter(task => !task.get('today') && !task.has('project') && !task.get('someday', false) && !task.has('contexts') || latentTasks.has(task.get('id')))
        return sectionTasks.count() > 0 ? fromJS([{items: sectionTasks}]) : undefined
      }

      case sectionTypes.SOMEDAY: {
        const sectionTasks = tasks.filter(task => !task.get('today') && task.get('someday', false) || latentTasks.has(task.get('id')))
        return sectionTasks.count() > 0 ? groupTasksByProject(sectionTasks, projects) : undefined
      }

      default:
        return fromJS([{items: tasks}])
    }
  }
)
