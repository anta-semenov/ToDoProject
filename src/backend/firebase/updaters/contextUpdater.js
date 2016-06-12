import { fromJS } from 'immutable'
import * as actionTypes from '../../../constants/actionTypes'

export default function contextUpdater(updatedObjects = [], action, newState = fromJS({})) {
  switch (action.type) {
    case actionTypes.ADD_CONTEXT:
      return addContext(updatedObjects, action.properties, newState)
    case actionTypes.REMOVE_CONTEXT:
      return removeContext(updatedObjects, action.id)
    case actionTypes.EDIT_CONTEXT:
      return editContext(updatedObjects, action.id, action.properties, newState)
    default:
      return updatedObjects
  }
}

function addContext(updatedObjects, properties, newState) {
  if (properties.id) {
    updatedObjects.push({
      updateURL: 'context/' + properties.id,
      value: newState.get(properties.id).toJS()
    })
  }
  return updatedObjects
}

function removeContext(updatedObjects, id) {
  if (id) {
    updatedObjects.push({
      updateURL: 'context/' + id,
      value: null
    })
  }
  return updatedObjects
}

function editContext(updatedObjects, id, properties, newState) {
  if (id) {
    if (properties.id && id != properties.id) {
      updatedObjects.push({
        updateURL: 'context/' + id,
        value: null
      })
      updatedObjects.push({
        updateURL: 'context/' + properties.id,
        value: newState.get(properties.id).toJS()
      })
    } else {
      Object.keys(properties).forEach(key => {
        updatedObjects.push({
          updateURL: 'context/' + id + '/' + key,
          value: newState.getIn([id, key])
        })
      })
    }
  }
  return updatedObjects
}
