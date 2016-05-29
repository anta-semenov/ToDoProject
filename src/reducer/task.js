import { fromJS, Set } from 'immutable'
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
      return setState(action.state)
    default:
      return state
  }
}

function correctProperties(properties) {
  let correctProperties = properties
  if (correctProperties.context) {
    correctProperties.context = Set(correctProperties.context)
  }

  return correctProperties
}

function addTask(state, properties = {}) {
  if (!properties.id || state.has(properties.id)) {
    return state
  }
  const tempProperties = correctProperties(properties)
  const newTask = fromJS({
    id: tempProperties.id,
    title: NEW_TASK_TITLE,
    completed: false,
    today: false,
    priority: PRIORITY_NONE
  })
  return state.set(tempProperties.id, newTask.merge(tempProperties))
}

function removeTask(state, id) {
  return state.delete(id)
}

function editTask(state, id, properties = {}) {
  const tempProperties = correctProperties(properties)

  if (tempProperties.id && tempProperties.id != id) {
    if (state.has(tempProperties.id)) {
      return state
    }
    const temp = state.get(id)
    return state.delete(id).set(tempProperties.id, temp).mergeIn([tempProperties.id], tempProperties)
  } else {
    return state.mergeIn([id], tempProperties)
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
      return val.add(contextId)
    } else {
      return Set([contextId])
    }
  })
}

function removeTaskContext(state, {id, context}) {
  const temp =  state.updateIn([id, 'contexts'], val => {
    if (val) {
      return val.delete(context)
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
      if (val.includes(contextId)) {return val.delete(contextId)}
      else {return val.add(contextId)}
    }
    else {
      return Set([contextId])
    }
  })
  if (temp.getIn([taskId, 'contexts']) && temp.getIn([taskId, 'contexts']).isEmpty()) {
    return temp.deleteIn([taskId, 'contexts'])
  } else {
    return temp
  }
}

function setState(newState) {
  return newState.get('task')
}
