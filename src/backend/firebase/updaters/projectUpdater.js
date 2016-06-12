import { fromJS } from 'immutable'
import * as actionTypes from '../../../constants/actionTypes'

export default function projectUpdater(updatedObjects = [], action, newState = fromJS({})) {
  switch (action.type) {
    case actionTypes.ADD_PROJECT:
      return addProject(updatedObjects, action.properties, newState)
    case actionTypes.REMOVE_PROJECT:
      return removeProject(updatedObjects, action.id)
    case actionTypes.COMPLETE_PROJECT:
      return completeProject(updatedObjects, action.id, action.status)
    case actionTypes.EDIT_PROJECT:
      return editProject(updatedObjects, action.id, action.properties, newState)
    default:
      return updatedObjects
  }
}

function addProject(updatedObjects, properties, newState) {
  if (properties.id) {
    updatedObjects.push({
      updateURL: 'project/' + properties.id,
      value: newState.get(properties.id).toJS()
    })
  }
  return updatedObjects
}

function removeProject(updatedObjects, id) {
  if (id) {
    updatedObjects.push({
      updateURL: 'project/' + id,
      value: null
    })
  }
  return updatedObjects
}

function completeProject(updatedObjects, id, status = false) {
  if (id) {
    updatedObjects.push({
      updateURL: 'project/' + id + '/completed',
      value: status
    })
  }
  return updatedObjects
}

function editProject(updatedObjects, id, properties, newState) {
  if (id) {
    if (properties.id && id != properties.id) {
      updatedObjects.push({
        updateURL: 'project/' + id,
        value: null
      })
      updatedObjects.push({
        updateURL: 'project/' + properties.id,
        value: newState.get(properties.id).toJS()
      })
    } else {
      Object.keys(properties).forEach(key => {
        updatedObjects.push({
          updateURL: 'project/' + id + '/' + key,
          value: newState.getIn([id, key])
        })
      })
    }
  }
  return updatedObjects
}
