import * as actionTypes from '../constants/actionTypes'

export function addProject(properties) {
  return {type: actionTypes.ADD_PROJECT, properties: { ...properties, createdDate: Date.now() }}
}

export function removeProject(id) {
  return {type: actionTypes.REMOVE_PROJECT, id}
}

export function completeProject(id, status) {
  return {type: actionTypes.COMPLETE_PROJECT, id, status}
}

export function editProject(id, properties) {
  return {type: actionTypes.EDIT_PROJECT, id, properties}
}

export const replaceProject = (id, newProject) => ({ type: actionTypes.REPLACE_PROJECT, id, newProject })
