import * as actionTypes from '../../constants/actionTypes'
import { Iterable } from 'immutable'

export default function taskUpdater(updateObjects, action, newState, priority) {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      return addTask(updateObjects, action.properties, newState, priority)
    case actionTypes.REMOVE_TASK:
      return removeTask(updateObjects, action.id, priority)
    case actionTypes.EDIT_TASK:
      return editTask(updateObjects, action.id, action.properties, newState, priority)
    case actionTypes.COMPLETE_TASK:
      return completeTask(updateObjects, action.id, action.status)
    case actionTypes.SET_TASK_TODAY:
      return setTaskToday(updateObjects, action.id, action.status)
    case actionTypes.ADD_TASK_TO_PROJECT:
      return addTaskToProject(updateObjects, action.id, action.project)
    case actionTypes.ADD_TASK_CONTEXT:
      return editTaskContext(updateObjects, action.id, newState)
      case actionTypes.REMOVE_TASK_CONTEXT:
        return editTaskContext(updateObjects, action.id, newState)
    default:
      return updateObjects
  }
}

function addTask(updateObjects, properties, newState, priority) {
  if (properties.id) {
    const value = newState.get(properties.id).toJS()
    const updateURL = 'task/' + properties.id
    updateObjects.push({updateURL, value})
    if (priority) {
      updateObjects.push({
        updateURL: 'task/' + properties.id + '/.priority',
        value: priority
      })
    }
  }

  return updateObjects
}

function removeTask(updateObjects, id, priority) {
  if (id) {
    if (priority) {
      updateObjects.push({
        updateURL: 'task/' + id + '/.priority',
        value: priority
      })
    }
    updateObjects.push({
      updateURL: 'task/' + id,
      value: null
    })
  }
  return updateObjects
}

function editTask(updateObjects, id, properties, newState, priority) {
  if (properties.id && id != properties.id) {
    updateObjects.push({
      updateURL: 'task/' + id,
      value: null
    })
    updateObjects.push({
      updateURL: 'task/' + properties.id,
      value: newState.get(properties.id).toJS()
    })
    if (priority) {
      updateObjects.push({
        updateURL: 'task/' + properties.id + '/.priority',
        value: priority
      })
    }
  } else {
    Object.keys(properties).forEach(key => {
      const val = newState.getIn([id, key])
      updateObjects.push({
        updateURL: 'task/' + id + '/' + key,
        value: (Iterable.isIterable(val) ? val.toJS() : (val || null))
      })
    })
  }

  if (priority) {
    updateObjects.push({
      updateURL: 'task/' + id + '/.priority',
      value: priority
    })
  }

  return updateObjects
}

function completeTask(updateObjects, id, status) {
  if (id) {
    updateObjects.push({
      updateURL: 'task/' + id + '/completed',
      value: status
    })
  }

  return updateObjects
}

function setTaskToday(updateObjects, id, status) {
  if (id) {
    updateObjects.push({
      updateURL: 'task/' + id + '/today',
      value: status
    })
  }

  return updateObjects
}

function addTaskToProject(updateObjects, id, project) {
  if (id) {
    updateObjects.push({
      updateURL: 'task/' + id + '/project',
      value: (project || null)
    })
  }

  return updateObjects
}

function editTaskContext(updateObjects, id, newState) {
  if (id) {
    updateObjects.push({
      updateURL: 'task/' + id + '/contexts',
      value: newState.getIn([id, 'contexts']) ? newState.getIn([id, 'contexts']).toJS() : null
    })
  }

  return updateObjects
}
