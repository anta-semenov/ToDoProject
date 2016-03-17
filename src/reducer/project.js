import { fromJS } from 'immutable'
import { NEW_PROJECT_TITLE } from '../constants/defaultNames'
import * as actionTypes from '../constants/actionTypes'

export default function project(state = fromJS([]), action) {
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
  const newId = state.reduce((maxId, item) => {
    return Math.max(maxId, item.get('id'))
  }, -1) + 1
  const newProject = fromJS({
    id: newId,
    title: NEW_PROJECT_TITLE,
    completed: false
  })
  return state.push(newProject.merge(properties))
}

function removeProject(state, id) {
  const index = state.findIndex(item => item.get('id') === id)
  if (index > -1) {
    return state.delete(index)
  }
  else {
    return state
  }

}

function editProject(state, id, properties = {}) {
  const index = state.findIndex(item => item.get('id') === id)
  return state.mergeIn([index], properties)
}

function completeProject(state, id) {
  const index = state.findIndex(item => item.get('id') === id)
  return state.updateIn([index, 'completed'], val => !val)
}
