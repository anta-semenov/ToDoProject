import * as actionTypes from '../constants/actionTypes'

export function addTask(properties) {
  return {type: actionTypes.ADD_TASK, properties}
}

export function removeTask(id) {
 return {type: actionTypes.REMOVE_TASK, id}
}

export function completeTask(id, status) {
 return {type: actionTypes.COMPLETE_TASK, id, status}
}

export function editTask(id, properties) {
 return {type: actionTypes.EDIT_TASK, id, properties}
}

export function addTaskToProject(id, project) {
 return {type: actionTypes.ADD_TASK_TO_PROJECT, id, project}
}

export function addTaskContext(id, context) {
 return {type: actionTypes.ADD_TASK_CONTEXT, id, context}
}

export function removeTaskContext(id, context) {
 return {type: actionTypes.REMOVE_TASK_CONTEXT, id, context}
}

export function switchTaskContext(id, context) {
  return {type: actionTypes.SWITCH_TASK_CONTEXT, id, context}
}

export function setTaskToday(id, status) {
  return {type: actionTypes.SET_TASK_TODAY, id, status}
}
