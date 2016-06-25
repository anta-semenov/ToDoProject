import { fromJS } from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { NEW_CONTEXT_TITLE } from '../constants/defaults'

export default function context(state = fromJS({}), action) {
  switch (action.type) {
    case actionTypes.ADD_CONTEXT:
      return addContext(state, action.properties)

    case actionTypes.EDIT_CONTEXT:
      return editContext(state, action.id, action.properties)

    case actionTypes.REPLACE_CONTEXT:
      return state.set(action.id, fromJS(action.newContext))

    case actionTypes.REMOVE_CONTEXT:
      return removeContext(state, action.id)

    case actionTypes.SET_STATE:
      return setState(state, action.state)

    default:
      return state
  }
}

function addContext(state, properties = {}) {
  if (!properties.id || state.has(properties.id)) {
    return state
  }
  const newContext = fromJS({
    id: properties.id,
    title: NEW_CONTEXT_TITLE
  })
  return state.set(properties.id, newContext.merge(properties))
}

function editContext(state, id, properties = {}) {
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

function removeContext(state, id) {
  return state.delete(id)
}

const setState = (state, newState) => newState.has('context') ? newState.get('context', fromJS({})) : state
