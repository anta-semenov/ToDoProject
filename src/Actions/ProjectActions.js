import * as actionTypes from '../constants/actionTypes'

export function addProject(properties) {
  return {type: actionTypes.ADD_PROJECT, properties}
}

export function removeProject(id) {
  return {type: actionTypes.REMOVE_PROJECT, id}
}

export function completeProject(id) {
  return {type: actionTypes.COMPLETE_PROJECT, id}
}

export function editProject(id, properties) {
  return {type: actionTypes.EDIT_PROJECT, id, properties}
}
