import { fromJS } from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { NEW_CONTEXT_TITLE } from '../constants/defaults'

export default function context(state = fromJS({}), action) {
  switch (action.type) {
    case actionTypes.ADD_CONTEXT:
      return addContext(state, action.properties)

    case actionTypes.EDIT_CONTEXT:
      return editContext(state, action.id, action.properties)

    case actionTypes.REMOVE_CONTEXT:
      return removeContext(state, action.id)

    default:
      return state
  }
}

function addContext(state, properties = {}) {
  const newId = state.reduce((maxId, context, key) => {
    return Math.max(maxId, key)
  }, -1) + 1
  const newContext = fromJS({
    id: newId,
    title: NEW_CONTEXT_TITLE
  })
  return state.set(newId, newContext.merge(properties))
}

function editContext(state, id, properties = {}) {
  return state.mergeIn([id], properties)
}

function removeContext(state, id) {
  return state.delete(id)
}
