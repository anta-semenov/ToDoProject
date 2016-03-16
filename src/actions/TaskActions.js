import * as actionTypes from '../constants/actionTypes'

export function addTask(properties) {
  return {type: actionTypes.ADD_TASK, properties}
}

export function removeTask(id) {
 return {type: actionTypes.REMOVE_TASK, id}
}

export function completeTask(id) {
 return {type: actionTypes.COMPLETE_TASK, id}
}

export function editTask(id, properties) {
 return {type: actionTypes.EDIT_TASK, id, properties}
}

export function addTaskToProject(id, projectId) {
 return {type: actionTypes.ADD_TASK_TO_PROJECT, id, project: projectId}
}

export function addTaskContext(id, contextId) {
 return {type: actionTypes.ADD_TASK_CONTEXT, id, context: contextId}
}

export function removeTaskContext(id, contextId) {
 return {type: actionTypes.REMOVE_TASK_CONTEXT, id, context: contextId}
}

export function setTaskToday(id, todayFlag) {
  return {type: actionTypes.SET_TASK_TODAY, id, todayFlag}
}
