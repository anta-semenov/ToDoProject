import * as actionTypes from '../constants/actionTypes'

export function addProject(properties) {
  return {type: actionTypes.ADD_PROJECT, properties: { ...properties, createdDate: Date.now() }}
}

export function removeProject(id) {
  return {type: actionTypes.REMOVE_PROJECT, id}
}

export function deleteProject(id, status) {
  return {type: actionTypes.DELETE_PROJECT, id, status}
}

export const completeProject = (id, status) => ({ type: actionTypes.COMPLETE_PROJECT, date: status ? Date.now() : undefined, id, status })

export function editProject(id, properties) {
  return {type: actionTypes.EDIT_PROJECT, id, properties}
}

export const replaceProject = (id, newProject) => ({ type: actionTypes.REPLACE_PROJECT, id, newProject })

export const changeProjectPosition = (id, nextId) => ({ type: actionTypes.CHANGE_PROJECT_POSITION, id, nextId })
