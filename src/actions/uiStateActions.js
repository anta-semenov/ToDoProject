import * as actionTypes from '../constants/actionTypes'

export function setSelectedSection(section) {
  return {type: actionTypes.SET_SELECTED_SECTION, section}
}

export function setSidebarSize(size) {
  return {type: actionTypes.SET_SIDEBAR_SIZE, size}
}

export function setActiveItem(item) {
  return {type: actionTypes.SET_ACTIVE_ITEM, item}
}
