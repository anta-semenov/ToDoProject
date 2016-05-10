import * as actionTypes from '../../constants/actionTypes'

export default function taskUpdater(updateObjects, action, newState) {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      return addTask(updateObjects, action.properties, newState)
    case actionTypes.REMOVE_TASK:
      return removeTask(updateObjects, action.id)
    case actionTypes.EDIT_TASK:
      return editTask(updateObjects, action.id, action.properties, newState)
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

function addTask(updateObjects, properties, newState) {
  if (properties.id) {
    const value = newState.get(properties.id).toJS()
    const updateURL = 'task/' + properties.id
    updateObjects.push({updateURL, value})
  }

  return updateObjects
}

function removeTask(updateObjects, id) {
  if (id) {
    updateObjects.push({
      updateURL: 'task/' + id,
      value: null
    })
  }

  return updateObjects
}

function editTask(updateObjects, id, properties, newState) {
  if (properties.id && id != properties.id) {
    updateObjects.push({
      updateURL: 'task/' + id,
      value: null
    })
    updateObjects.push({
      updateURL: 'task/' + properties.id,
      value: newState.get(properties.id).toJS()
    })
  } else {
    Object.keys(properties).forEach(key => {
      updateObjects.push({
        updateURL: 'task/' + id + '/' + key,
        value: newState.getIn([id, key])
      })
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
