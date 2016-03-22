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
      return completeProject(state, action.id)

    default:
      return state
  }
}

function addProject(state, properties = {}) {
  const newId = state.reduce((maxId, item, key) => {
    return Math.max(maxId, key)
  }, -1) + 1
  const newProject = fromJS({
    id: newId,
    title: NEW_PROJECT_TITLE,
    completed: false
  })
  return state.set(newId, newProject.merge(properties))
}

function removeProject(state, id) {
  return state.delete(id)
}

function editProject(state, id, properties = {}) {
  return state.mergeIn([id], properties)
}

function completeProject(state, id) {
  return state.updateIn([id, 'completed'], val => !val)
}
