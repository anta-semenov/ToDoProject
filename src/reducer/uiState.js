import * as actionTypes from '../constants/actionTypes'
import { fromJS, is, Set } from 'immutable'
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
    case actionTypes.TOGGLE_TASK_COMPLETED_LATENCY:
      return toggleTaskCompletedLatency(state, action.id)
    case actionTypes.CLEAR_COMPLETED_LATENT_TASKS:
      return clearCompletedLatentTasks(state)
    case actionTypes.TOGGLE_TASK_TODAY_LATENCY:
      return toggleTaskTodayLatency(state, action.id)
    case actionTypes.CLEAR_TODAY_LATENT_TASKS:
      return clearTodayLatentTasks(state)
    case actionTypes.SET_SYNCING:
      return setSyncing(state, action.status)
    case actionTypes.SET_OFFLINE:
      return setOffline(state, action.status)
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
  if (id != undefined) {
    return state.set('activeItem', id)
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

function toggleTaskCompletedLatency(state, id) {
  return state.updateIn(['sectionCompletedLatentTasks'], val => {
    if (val) {
      if (val.has(id)) {return val.delete(id)}
      else {return val.add(id)}
    }
    else {return Set([id])}
  })
}

function clearCompletedLatentTasks(state) {
  return state.delete('sectionCompletedLatentTasks')
}

function toggleTaskTodayLatency(state, id) {
  return state.updateIn(['sectionTodayLatentTasks'], val => {
    if (val) {
      if (val.has(id)) {return val.delete(id)}
      else {return val.add(id)}
    }
    else {return Set([id])}
  })
}
function clearTodayLatentTasks(state) {
  return state.delete('sectionTodayLatentTasks')
}

function setSyncing(state, status = false) {
  if (status) {
    return state.set('syncing', status)
  } else {
    return state.delete('syncing')
  }
}

function setOffline(state, status = false) {
  if (status) {
    return state.set('offline', status)
  } else {
    return state.delete('offline')
  }
}
