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
    case actionTypes.SET_TASK_TODAY:
      return setTaskToday(state, action.id, action.status)
    default:
      return state
  }
}

function addTask(state, properties = fromJS({})) {
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
