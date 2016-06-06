import * as actionTypes from '../constants/actionTypes'
import { fromJS, is, Set, Map } from 'immutable'
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
    case actionTypes.TOGGLE_TASK_LATENCY:
      return toggleTaskLatency(state, action.id, action.status)
    case actionTypes.CLEAR_LATENT_TASKS:
      return clearLatentTasks(state)
    case actionTypes.SET_SYNCING:
      return setProperty(state, 'syncing', action.status)
    case actionTypes.SET_OFFLINE:
      return setProperty(state, 'offline', action.status)
    case actionTypes.SET_PROPERTY:
      return setProperty(state, action.property, action.value)
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

function toggleTaskLatency(state, id, status) {
  return state.updateIn(['sectionLatentTasks'], val => {
    if (val) {
      const temp = val.update(id, 0, latency => status ? ++latency : --latency)
      return temp.get(id) <= 0 ? temp.delete(id) : temp
    }
    else {
      if (status) {return Map().set(id, 1)}
      else {return val}
    }
  })
}
function clearLatentTasks(state) {
  return state.delete('sectionLatentTasks')
}

function setProperty(state, property, value) {
  if (property) {
    if (value) {
      return state.set(property, value)
    } else {
      return state.delete(property)
    }
  } else {
    return state
  }
}
