import { fromJS, Set } from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { NEW_TITLE } from '../constants/defaults'

export default function task(state = fromJS([]), action) {
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
  const newId = state.reduce((id, item) => {
    return Math.max(id, item.get('id'))
  }, -1) + 1
  const newTask = fromJS({
    id: newId,
    title: NEW_TITLE,
    completed: false,
    today: false
  })
  return state.push(newTask.merge(properties))
}

function removeTask(state, id) {
  const index = state.findIndex(item => {return item.get('id') === id})
  if (index > -1) {
    return state.delete(index)
  } else {
    return state
  }
}

function editTask(state, id, properties = {}) {
  const index = state.findIndex(item => {return item.get('id') === id})
  return state.mergeIn([index], properties)
}

function completeTask(state, id) {
  const index = state.findIndex(item => {return item.get('id') === id})
  return state.updateIn([index, 'completed'], val => !val)
}

function addTaskToProject(state, id, projectId) {
  const index = state.findIndex(item => {return item.get('id') === id})
  if (projectId) {
    return state.setIn([index, 'project'], projectId)
  } else {
    return state.deleteIn([index, 'project'])
  }
}

function addTaskContext(state, id, contextId) {
  const index = state.findIndex(item => {return item.get('id') === id})
  return state.updateIn([index, 'context'], val => {
    if (val) {
      return val.add(contextId)
    } else {
      return Set([contextId])
    }
  })
}

function removeTaskContext(state, {id, context}) {
  const index = state.findIndex(item => {return item.get('id') === id})
  const temp =  state.updateIn([index, 'context'], val => {
    if (val) {
      return val.delete(context)
    } else {
      return val
    }
  })
  if (temp.getIn([index, 'context']) && temp.getIn([index, 'context']).isEmpty()) {
    return temp.deleteIn([index, 'context'])
  } else {
    return temp
  }
}
