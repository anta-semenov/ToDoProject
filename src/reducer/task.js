import { fromJS, List } from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { NEW_TASK_TITLE } from '../constants/defaults'
import { PRIORITY_NONE } from '../constants/priorityLevels'

export default function task(state = fromJS({}), action) {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      return addTask(state, action.properties)
    case actionTypes.REMOVE_TASK:
      return removeTask(state, action.id)
    case actionTypes.EDIT_TASK:
      return editTask(state, action.id, action.properties)
    case actionTypes.REPLACE_TASK:
      return state.set(action.id, fromJS(action.newTask))
    case actionTypes.COMPLETE_TASK:
      return completeTask(state, action.id, action.status)
    case actionTypes.ADD_TASK_TO_PROJECT:
      return addTaskToProject(state, action.id, action.project)
    case actionTypes.ADD_TASK_CONTEXT:
      return addTaskContext(state, action.id, action.context)
    case actionTypes.REMOVE_TASK_CONTEXT:
      return removeTaskContext(state, action)
    case actionTypes.SWITCH_TASK_CONTEXT:
      return switchTaskContext(state, action.id, action.context)
    case actionTypes.SET_TASK_TODAY:
      return setTaskToday(state, action.id, action.status)
    case actionTypes.SET_STATE:
      return setState(state, action.state)
    case actionTypes.REMOVE_PROJECT:
      return removeProjectTasks(state, action.id)
    case actionTypes.REMOVE_CONTEXT:
      return removeContextFromTasks(state, action.id)
    case actionTypes.START_TASK_TRACKING:
      return state.has(action.id) ? state.updateIn([action.id, 'tracking'], fromJS([]), val => val.push(fromJS({ startTime: action.startTime }))) : state
    case actionTypes.STOP_TASK_TRACKING:
      return state.updateIn([action.id, 'tracking'], undefined, val => val ? val.setIn([val.size - 1, 'endTime'], action.endTime) : undefined)
    default:
      return state
  }
}

function addTask(state, properties = {}) {
  if (!properties.id || state.has(properties.id)) {
    return state
  }
  const newTask = fromJS({
    id: properties.id,
    title: NEW_TASK_TITLE,
    completed: false,
    today: false,
    priority: PRIORITY_NONE
  })
  return state.set(properties.id, newTask.merge(properties))
}

function removeTask(state, id) {
  return state.delete(id)
}

function editTask(state, id, properties = {}) {
  if (properties.id && properties.id != id) {
    if (state.has(properties.id)) {
      return state
    }
    const temp = state.get(id)
    return state.delete(id).set(properties.id, temp).mergeIn([properties.id], properties)
  } else {
    return state.mergeIn([id], properties)
  }
}

function completeTask(state, id, status = false) {
  return state.setIn([id, 'completed'], status)
}

function setTaskToday(state, id, status = false) {
  return state.setIn([id, 'today'], status)
}

function addTaskToProject(state, id, projectId) {
  if (projectId) {
    return state.setIn([id, 'project'], projectId)
  } else {
    return state.deleteIn([id, 'project'])
  }
}

function addTaskContext(state, id, contextId) {
  return state.updateIn([id, 'contexts'], val => {
    if (val) {
      if (val.find(item => item === contextId)) {
        return val
      } else {
        return val.push(contextId)
      }
    } else {
      return List([contextId])
    }
  })
}

function removeTaskContext(state, {id, context}) {
  const temp =  state.updateIn([id, 'contexts'], val => {
    if (val) {
      return val.filter(item => item !== context)
    } else {
      return val
    }
  })
  if (temp.getIn([id, 'contexts']) && temp.getIn([id, 'contexts']).isEmpty()) {
    return temp.deleteIn([id, 'contexts'])
  } else {
    return temp
  }
}
function switchTaskContext(state, taskId, contextId) {
  const temp = state.updateIn([taskId, 'contexts'], val => {
    if (val) {
      const idIndex = val.indexOf(contextId)
      if (idIndex !== -1) {return val.delete(idIndex)}
      else {return val.push(contextId)}
    }
    else {
      return List([contextId])
    }
  })
  if (temp.getIn([taskId, 'contexts']) && temp.getIn([taskId, 'contexts']).isEmpty()) {
    return temp.deleteIn([taskId, 'contexts'])
  } else {
    return temp
  }
}

const setState = (state, newState) => newState.has('task') ? newState.get('task', fromJS({})) : state

const removeProjectTasks = (state, projectId) => {
  return state.filter(item => item.get('project') !== projectId)
}

const removeContextFromTasks = (state, contextId) => {
  return state.map(task => {
    const contexts = task.get('contexts')
    if (contexts) {
      const newContexts = contexts.filter(item => item !== contextId)
      if (!newContexts.isEmpty()) {
        return task.set('contexts', newContexts)
      } else {
        return task.delete('contexts')
      }
    } else {
      return task
    }
  })
}

/*
 * Selectors
 */

export const getTasks = (state = fromJS({})) => state
