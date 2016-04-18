import * as actionTypes from '../constants/actionTypes'
import { fromJS, is } from 'immutable'
import { INITIAL_UI_STATE } from '../constants/defaults'


export default function uiState(state = INITIAL_UI_STATE, action) {
  switch (action.type) {
    case actionTypes.SET_SELECTED_SECTION:
      return setSection(state, action.section)
    case actionTypes.SET_SIDEBAR_SIZE:
      return setSidebarSize(state, action.sidebarSize)
    case actionTypes.SET_ACTIVE_ITEM:
      return setActiveItem(state, action.id)
    case actionTypes.SET_EDITING_SECTION:
      return setEditingSection(state, action.section)
    case actionTypes.TOGGLE_TASK_LATENCY:
      return toggleTaskLatency(state, action.id)
    case actionTypes.CLEAR_LATENT_TASKS:
      return clearLatentTasks(state)
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

function setActiveItem(state, id) {
  if (id >= 0) {
    return state.set('activeItem', fromJS(id))
  } else {
    return state.delete('activeItem')
  }
}

function setEditingSection(state, section) {
  if (section) {
    return state.set('editingSection', fromJS(section))
  } else {
    return state.delete('editingSection')
  }
}

function toggleTaskLatency(state, id) {
  return state.updateIn(['sectionLatentTasks'], val => {
    if (val) {
      const index = val.findIndex(item => item === id)
      if (index >= 0) {return val.delete(index)}
      else {return val.push(id)}
    }
    else {return fromJS([id])}
  })
}

function clearLatentTasks(state) {
  return state.delete('sectionLatentTasks')
}
