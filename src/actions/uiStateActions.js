import * as actionTypes from '../constants/actionTypes'

export function setSidebarSize(size) {
  return {type: actionTypes.SET_SIDEBAR_SIZE, size}
}

export function setEditingSection(section) {
  return {type: actionTypes.SET_EDITING_SECTION, section}
}

export function toggleTaskCompletedLatency(id) {
  return {type: actionTypes.TOGGLE_TASK_COMPLETED_LATENCY, id}
}
export function clearCompletedLatentTasks() {
  return {type: actionTypes.CLEAR_COMPLETED_LATENT_TASKS}
}

export function toggleTaskLatency(id, status) {
  return {type: actionTypes.TOGGLE_TASK_LATENCY, id, status}
}
export function clearLatentTasks() {
  return {type: actionTypes.CLEAR_LATENT_TASKS}
}

export function setSyncing(status) {
  return {type: actionTypes.SET_SYNCING, status}
}

export function setOffline(status) {
  return {type: actionTypes.SET_OFFLINE, status}
}

export function setAuthStatus(status) {
  return {type: actionTypes.SET_AUTH_STATUS, status}
}

export function setAuthErrorMessage(message) {
  return {type: actionTypes.SET_AUTH_ERROR_MESSAGE, message}
}

export function setProperty(property, value) {
  return {type: actionTypes.SET_PROPERTY, property, value}
}
