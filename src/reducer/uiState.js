import * as actionTypes from '../constants/actionTypes'
import * as sectionTypes from '../constants/sectionTypes'
import { fromJS, is } from 'immutable'


export default function uiState(state = fromJS({}), action) {
  switch (action.type) {
    case actionTypes.SET_SELECTED_SECTION:
      return setSection(state, action.section)
    case actionTypes.SET_SIDEBAR_SIZE:
      return setSidebarSize(state, action.sidebarSize)
    case actionTypes.SET_ACTIVE_ITEM:
      return setActiveItem(state, action.activeItem)
    default:
    return state
  }
}

function setSection(state, section) {
  if (section) {
    const immutableSection = fromJS(section)
    if (is(state.get('selectedSection'), immutableSection)) {
      return state
    } else {
      return state.set('selectedSection', fromJS(section)).delete('activeItem')
    }
  }
  else {
    return state.delete('selectedSection')
  }
}

function setSidebarSize(state, size) {
  if (size) {
    return state.set('sidebarSize', size)
  } else {
    return state.delete('sidebarSize')
  }
}

function setActiveItem(state, activeItem) {
  if (activeItem) {
    return state.set('activeItem', fromJS(activeItem))
  } else {
    return state.delete('activeItem')
  }
}
