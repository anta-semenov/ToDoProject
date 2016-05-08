import { fromJS } from 'immutable'
import { NEW_PROJECT_TITLE } from '../constants/defaults'
import * as actionTypes from '../constants/actionTypes'

export default function project(state = fromJS({}), action) {
  switch (action.type) {
    case actionTypes.ADD_PROJECT:
      return addProject(state, action.properties)

    case actionTypes.REMOVE_PROJECT:
      return removeProject(state, action.id)

    case actionTypes.EDIT_PROJECT:
      return editProject(state, action.id, action.properties)

    case actionTypes.COMPLETE_PROJECT:
      return completeProject(state, action.id, action.status)

    default:
      return state
  }
}

function addProject(state, properties = {}) {
  if (!properties.id || state.has(properties.id)) {
    return state
  }
  const newProject = fromJS({
    id: properties.id,
    title: NEW_PROJECT_TITLE,
    completed: false
  })
  return state.set(properties.id, newProject.merge(properties))
}

function removeProject(state, id) {
  return state.delete(id)
}

function editProject(state, id, properties = {}) {
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

function completeProject(state, id, status = false) {
  return state.setIn([id, 'completed'], status)
}
