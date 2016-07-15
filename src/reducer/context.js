import { fromJS } from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { NEW_CONTEXT_TITLE } from '../constants/defaults'

const context = (state = fromJS({}), action) => {
  switch (action.type) {
    case actionTypes.ADD_CONTEXT:
      return addContext(state, action.properties)

    case actionTypes.EDIT_CONTEXT:
      return editContext(state, action.id, action.properties)

    case actionTypes.REPLACE_CONTEXT:
      return state.set(action.id, fromJS(action.newContext))

    case actionTypes.REMOVE_CONTEXT:
      return state.delete(action.id)

    case actionTypes.DELETE_CONTEXT:
      return state.setIn([action.id, 'deleted'], action.status || false)

    case actionTypes.SET_STATE:
      return setState(state, action.state)

    case actionTypes.PROCESS_STATE:
      return processState(state)

    default:
      return state
  }
}

export default context

const addContext = (state, properties = {}) => {
  if (!properties.id || state.has(properties.id)) {
    return state
  }
  const newContext = fromJS({
    id: properties.id,
    title: NEW_CONTEXT_TITLE,
    deleted: false
  })
  return state.set(properties.id, newContext.merge(properties))
}

const editContext = (state, id, properties = {}) => {
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

const setState = (state, newState) => newState.has('context') ? newState.get('context', fromJS({})) : state

const processState = (state) => state.map(context => context.set('deleted', context.get('deleted', false)))

/*
 * Selectors
 */

export const getContexts = (state = fromJS({})) => state.filter(context => !context.get('deleted'))
