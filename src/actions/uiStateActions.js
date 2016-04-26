import * as actionTypes from '../constants/actionTypes'

export function setSelectedSection(section) {
  return {type: actionTypes.SET_SELECTED_SECTION, section}
}

export function setSidebarSize(size) {
  return {type: actionTypes.SET_SIDEBAR_SIZE, size}
}

export function setActiveItem(id) {
  return {type: actionTypes.SET_ACTIVE_ITEM, id}
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

export function toggleTaskTodayLatency(id) {
  return {type: actionTypes.TOGGLE_TASK_TODAY_LATENCY, id}
}
export function clearTodayLatentTasks() {
  return {type: actionTypes.CLEAR_TODAY_LATENT_TASKS}
}
