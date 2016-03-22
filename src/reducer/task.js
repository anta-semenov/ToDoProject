import { fromJS, Set } from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { NEW_TITLE } from '../constants/defaults'

export default function task(state = fromJS({}), action) {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      return addTask(state, action.properties)
    case actionTypes.REMOVE_TASK:
      return removeTask(state, action.id)
    case actionTypes.EDIT_TASK:
      return editTask(state, action.id, action.properties)
    case actionTypes.COMPLETE_TASK:
      return completeTask(state, action.id)
    case actionTypes.ADD_TASK_TO_PROJECT:
      return addTaskToProject(state, action.id, action.project)
    case actionTypes.ADD_TASK_CONTEXT:
      return addTaskContext(state, action.id, action.context)
    case actionTypes.REMOVE_TASK_CONTEXT:
      return removeTaskContext(state, action)
    default:
      return state
  }
}

function addTask(state, properties = {}) {
  const newId = state.size ? state.maxBy((value, key) => key).get('id') + 1 : 0
  const newTask = fromJS({
    id: newId,
    title: NEW_TITLE,
    completed: false,
    today: false
  })
  return state.set(newId, newTask.merge(properties))
}

function removeTask(state, id) {
  return state.delete(id)
}

function editTask(state, id, properties = {}) {
  return state.mergeIn([id], properties)
}

function completeTask(state, id) {
  return state.updateIn([id, 'completed'], val => !val)
}

function addTaskToProject(state, id, projectId) {
  if (projectId) {
    return state.setIn([id, 'project'], projectId)
  } else {
    return state.deleteIn([id, 'project'])
  }
}

function addTaskContext(state, id, contextId) {
  return state.updateIn([id, 'context'], val => {
    if (val) {
      return val.add(contextId)
    } else {
      return Set([contextId])
    }
  })
}

function removeTaskContext(state, {id, context}) {
  const temp =  state.updateIn([id, 'context'], val => {
    if (val) {
      return val.delete(context)
    } else {
      return val
    }
  })
  if (temp.getIn([id, 'context']) && temp.getIn([id, 'context']).isEmpty()) {
    return temp.deleteIn([id, 'context'])
  } else {
    return temp
  }
}
