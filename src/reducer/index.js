import { createSelector } from 'reselect'
import { fromJS, Map } from 'immutable'
import context, * as fromContext from './context'
import project, * as fromProject from './project'
import task from './task'
import uiState, * as fromUiState from './uiState'
import auth, * as fromAuth from './auth.js'
import tracking, * as fromTracking from './tracking'
import order, * as fromOrder from './order'
import * as sectionTypes from '../constants/sectionTypes'
import * as sectionNames from '../constants/sectionNames'
import { PRIORITY } from '../constants/priorityLevels'
import { BASIC, PROJECTS, CONTEXTS } from '../constants/navGroupTypes'
import { ADD_NEW_CONTEXT_TITLE, ADD_NEW_PROJECT_TITLE } from '../constants/defaults'
import { startOfWeek, startOfMonth, startOfDay, format } from '../utils/date'

const orderState = (state = fromJS({})) => {
  if (
    (!state.hasIn(['order', 'project']) && state.get('project', fromJS({})).size > 0) ||
    (!state.hasIn(['order', 'context']) && state.get('context', fromJS({})).size > 0)
  ) {
    const orderAsMutable = state.get('order', fromJS({})).asMutable()
    if (!state.hasIn(['order', 'project'])) {
      orderAsMutable.set(
        'project',
        state
          .get('project', fromJS({}))
          .keySeq()
          .toList()
      )
    }
    if (!state.hasIn(['order', 'context'])) {
      orderAsMutable.set(
        'context',
        state
          .get('context', fromJS({}))
          .keySeq()
          .toList()
      )
    }
    return orderAsMutable.asImmutable()
  }
  return state.get('order')
}

const rootReducer = (state, action) => {
  return state.withMutations(map =>
    map
      .set('task', task(map.get('task'), action))
      .set('context', context(map.get('context'), action))
      .set('project', project(map.get('project'), action))
      .set('uiState', uiState(map.get('uiState'), action))
      .set('auth', auth(map.get('auth'), action))
      .set('tracking', tracking(map.get('tracking'), action))
      .set('order', order(orderState(state), action))
  )
}

export default rootReducer

/*
 * Selectors
 */

// Data status
export const getDataStatus = (state = fromJS({})) => fromUiState.getDataStatus(state.get('uiState'))
export const getSearchQuery = (state = fromJS({})) =>
  fromUiState.getSearchQuery(state.get('uiState'))

// Tasks
export const getTasks = (state = fromJS({})) => state.get('task', Map())
export const getLatentTasks = (state = fromJS({})) =>
  fromUiState.getLatentTasks(state.get('uiState'))
const getVisibleTasks = createSelector([getTasks, getLatentTasks], (tasks, latentTasks) =>
  tasks
    .filter(
      task =>
        (!task.get('completed', false) || latentTasks.has(task.get('id'))) &&
        !task.get('deleted', false)
    )
    .sort((a, b) => {
      return PRIORITY.indexOf(a.get('priority')) > PRIORITY.indexOf(b.get('priority'))
        ? -1
        : PRIORITY.indexOf(a.get('priority')) < PRIORITY.indexOf(b.get('priority'))
          ? 1
          : a.get('id') > b.get('id') ? 1 : a.get('id') < b.get('id') ? -1 : 0
    })
)

const groupTasksByProject = (tasks, projects) => {
  const NO_PROJECT = 'NO_PROJECT'
  const groupedTasks = tasks.groupBy(task => task.get('project', NO_PROJECT))
  const groups = groupedTasks.has(NO_PROJECT)
    ? fromJS([{ items: groupedTasks.get(NO_PROJECT).toList() }])
    : fromJS([])
  return groups.concat(
    projects.filter(project => groupedTasks.has(project.get('id'))).map(project => {
      return fromJS({
        title: project.get('title'),
        items: groupedTasks.get(project.get('id'), fromJS({})).toList()
      })
    })
  )
}

const groupTasksByCompletedDate = (tasks, projectOrder) => {
  const todayDate = new Date()
  const startOfThisWeek = startOfWeek(todayDate).getTime()
  const startOfThisMonth = startOfMonth(todayDate).getTime()
  const today = startOfDay(todayDate).getTime()

  const groupedTasks = tasks.groupBy(task => {
    const completedDate = startOfDay(task.get('completedDate')).getTime()
    if (completedDate === today) {
      return 0 //'Today'
    } else if (completedDate >= startOfThisWeek) {
      return 1 //'Earlier this week'
    } else if (completedDate >= startOfThisMonth) {
      return 2 //'Earlier this month'
    } else {
      return startOfMonth(completedDate).getTime() //format(startOfMonth(completedDate), 'MMMM YYYY')
    }
  })

  const groupName = key => {
    switch (key) {
      case 0:
        return 'Today'
      case 1:
        return 'Earlier this week'
      case 2:
        return 'Earlier this month'
      default:
        return format(key, 'MMMM YYYY')
    }
  }

  return groupedTasks
    .map((value, key) =>
      fromJS({
        title: groupName(key),
        items: value.sort((itemA, itemB) => {
          const itemAProject = itemA.get('project')
          const itemBProject = itemB.get('project')
          if (itemAProject !== itemBProject) {
            if (!itemAProject) return -1
            if (!itemBProject) return 1
            const orderIndexA = projectOrder.indexOf(itemAProject)
            const orderIndexB = projectOrder.indexOf(itemBProject)
            if (orderIndexA === -1 && orderIndexB !== -1) return 1
            if (orderIndexA !== -1 && orderIndexB === -1) return -1
            if (orderIndexA === -1 && orderIndexB === -1) {
              return itemAProject > itemBProject ? -1 : 1
            }
            return orderIndexA - orderIndexB
          } else {
            return itemA.get('completedDate') - itemB.get('completedDate')
          }
        }),
        key
      })
    )
    .toList()
    .sort((groupA, groupB) => groupA.get('key') - groupB.get('key'))
}

export const getTaskById = (state, id) => getTasks(state).get(id)

// Projects
export const getProjects = (state = fromJS({})) => fromProject.getProjects(state.get('project'))

// Contexts
export const getContexts = (state = fromJS({})) => fromContext.getContexts(state.get('context'))

// Client Data
export const getUid = state => fromAuth.getUid(state.get('auth'))
export const getClientId = state => fromAuth.getClientId(state.get('auth'))
export const getAuthStatus = (state = fromJS({})) => fromAuth.getAuthStatus(state.get('auth'))

// Tracking tasks
export const getTrackingTaskId = (state = fromJS({})) =>
  fromTracking.getTrackingTaskId(state.get('tracking'))
const getTrackingTask = createSelector(
  [getTrackingTaskId, getTasks],
  (trackingTaskId, tasks = fromJS({})) => tasks.get(trackingTaskId)
)
export const getTrackingTaskTitle = createSelector([getTrackingTask], (task = fromJS({})) =>
  task.get('title')
)
export const getTrackingTaskStartTime = createSelector(
  [getTrackingTask],
  (task = fromJS({})) =>
    task.get('tracking', fromJS([])).size > 0
      ? task
          .get('tracking', fromJS([]))
          .last()
          .get('startTime', undefined)
      : undefined
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
      case sectionTypes.COMPLETED:
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
        } else if (projects.has(section)) {
          const project = projects.get(section, fromJS({}))
          return {
            sectionType: sectionTypes.PROJECT,
            sectionId: section,
            sectionName: project.get('title'),
            isSectionComplete: project.get('completed')
          }
        } else {
          return {
            sectionType: sectionTypes.INBOX,
            sectionName: sectionNames.INBOX
          }
        }
    }
  }
)

// Active Task
const getTaskFromProps = (state, props = {}) => props.task
export const getSelectedTask = createSelector([getTasks, getTaskFromProps], (tasks, taskId) => {
  if (!taskId) {
    return undefined
  }
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
    taskContexts: task.get('contexts'),
    repeat: task.get('repeat')
  }
})

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

// Grouped Tasks
export const getTasksGroups = createSelector(
  [
    getSelectedSection,
    getVisibleTasks,
    getLatentTasks,
    getOrderedProjectsList,
    getTasks,
    getProjectOrder
  ],
  ({ sectionType, sectionId }, tasks, latentTasks, projects, allTasks, projectOrder) => {
    switch (sectionType) {
      case sectionTypes.CONTEXT: {
        const sectionTasks = tasks.filter(
          task =>
            task.get('contexts', fromJS([])).includes(sectionId) || latentTasks.has(task.get('id'))
        )
        return sectionTasks.count() > 0 ? groupTasksByProject(sectionTasks, projects) : undefined
      }

      case sectionTypes.PROJECT: {
        const sectionTasks = tasks.filter(
          task => task.get('project') === sectionId || latentTasks.has(task.get('id'))
        )
        return sectionTasks.count() > 0 ? fromJS([{ items: sectionTasks.toList() }]) : undefined
      }

      case sectionTypes.TODAY: {
        const sectionTasks = tasks.filter(
          task => task.get('today') === true || latentTasks.has(task.get('id'))
        )
        return sectionTasks.count() > 0 ? groupTasksByProject(sectionTasks, projects) : undefined
      }

      case sectionTypes.NEXT: {
        const sectionTasks = tasks.filter(
          task => !task.get('someday', false) || latentTasks.has(task.get('id'))
        )
        return sectionTasks.count() > 0 ? groupTasksByProject(sectionTasks, projects) : undefined
      }

      case sectionTypes.INBOX: {
        const sectionTasks = tasks.filter(
          task =>
            (!task.get('today') &&
              !task.has('project') &&
              !task.get('someday', false) &&
              !task.has('contexts') &&
              !task.has('repeat', false) &&
              !task.get('date')) ||
            latentTasks.has(task.get('id'))
        )
        return sectionTasks.count() > 0 ? fromJS([{ items: sectionTasks.toList() }]) : undefined
      }

      case sectionTypes.SOMEDAY: {
        const sectionTasks = tasks.filter(
          task =>
            (!task.get('today') && task.get('someday', false)) || latentTasks.has(task.get('id'))
        )
        return sectionTasks.count() > 0 ? groupTasksByProject(sectionTasks, projects) : undefined
      }

      case sectionTypes.COMPLETED: {
        const sectionTasks = allTasks.filter(
          task => (task.get('completed') && !task.get('deleted')) || latentTasks.has(task.get('id'))
        )
        return sectionTasks.count() > 0
          ? groupTasksByCompletedDate(sectionTasks, projectOrder)
          : undefined
      }

      default:
        return fromJS([{ items: tasks }])
    }
  }
)

export const getFilteredTasks = createSelector(
  getTasksGroups,
  getSearchQuery,
  (taskGroups, searchQuery) =>
    searchQuery && taskGroups
      ? taskGroups
          .map(group =>
            group.updateIn(['items'], items =>
              items.filter(item =>
                item
                  .get('title', '')
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
            )
          )
          .filter(group => group.get('items').size > 0)
      : taskGroups
)

const getEditingSectionType = (state = fromJS({})) =>
  state.getIn(['uiState', 'editingSection', 'type'])
const getEditingSectionID = (state = fromJS({})) => state.getIn(['uiState', 'editingSection', 'id'])
export const getNavGroups = createSelector(
  getEditingSectionType,
  getEditingSectionID,
  getSectionFromProps,
  getTasks,
  getOrderedContextsList,
  getOrderedProjectsList,
  (editingSectionType, editingSectionID, section, tasks, contexts, projects) =>
    fromJS([
      {
        type: BASIC,
        items: [
          {
            type: sectionTypes.INBOX,
            title: sectionNames.INBOX,
            active: section === sectionTypes.INBOX ? true : false,
            count: tasks.filter(
              task =>
                !task.get('completed') &&
                !task.get('today') &&
                !task.get('someday') &&
                !task.has('project') &&
                !task.has('contexts') &&
                !task.get('deleted') &&
                !task.get('repeat') &&
                !task.get('date')
            ).size
          },
          {
            type: sectionTypes.TODAY,
            title: sectionNames.TODAY,
            active: section === sectionTypes.TODAY ? true : false,
            count: tasks.filter(
              task => !task.get('completed') && !task.get('deleted') && task.get('today')
            ).size
          },
          {
            type: sectionTypes.NEXT,
            title: sectionNames.NEXT,
            active: section === sectionTypes.NEXT ? true : false
          },
          {
            type: sectionTypes.SOMEDAY,
            title: sectionNames.SOMEDAY,
            active: section === sectionTypes.SOMEDAY ? true : false
          },
          {
            type: sectionTypes.COMPLETED,
            title: sectionNames.COMPLETED,
            active: section === sectionTypes.COMPLETED ? true : false
          }
        ]
      },
      {
        type: CONTEXTS,
        title: sectionNames.CONTEXTS,
        addNewTitle: ADD_NEW_CONTEXT_TITLE,
        items: contexts.map(item => {
          const id = item.get('id')
          return fromJS({
            id: id,
            type: sectionTypes.CONTEXT,
            title: item.get('title'),
            active: section === id ? true : false,
            editing:
              editingSectionType === sectionTypes.CONTEXT && editingSectionID === id ? true : false,
            count: tasks.filter(
              task =>
                !task.get('completed') &&
                !task.get('deleted') &&
                task.get('context', fromJS([])).has(id)
            ).size
          })
        })
      },
      {
        type: PROJECTS,
        title: sectionNames.PROJECTS,
        addNewTitle: ADD_NEW_PROJECT_TITLE,
        items: projects.map(item => {
          const id = item.get('id')
          return fromJS({
            id: id,
            type: sectionTypes.PROJECT,
            title: item.get('title'),
            active: section === id ? true : false,
            editing:
              editingSectionType === sectionTypes.PROJECT && editingSectionID === id ? true : false
          })
        })
      }
    ])
)
