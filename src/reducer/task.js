import { fromJS, List } from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import { NEW_TASK_TITLE } from '../constants/defaults'
import { PRIORITY_NONE } from '../constants/priorityLevels'
import SOMEDAY_WAITING_PERIOD from '../constants/defaults'

const task = (state = fromJS({}), action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      return addTask(state, action.properties)
    case actionTypes.REMOVE_TASK:
      return state.delete(action.id)
    case actionTypes.EDIT_TASK:
      return editTask(state, action.id, action.properties)
    case actionTypes.REPLACE_TASK:
      return state.set(action.id, fromJS(action.newTask))
    case actionTypes.DELETE_TASK:
      return deleteTask(state, action.id, action.status)

    case actionTypes.COMPLETE_TASK:
      return completeTask(state, action.id, action.status, action.date)
    case actionTypes.SET_TASK_TODAY:
      return setTaskToday(state, action.id, action.status)
    case actionTypes.SET_TASK_SOMEDAY:
      return setTaskSomeday(state, action.id, action.status, action.date)

    case actionTypes.ADD_TASK_TO_PROJECT:
      return addTaskToProject(state, action.id, action.project)
    case actionTypes.REMOVE_PROJECT:
      return state.filter(item => item.get('project') !== action.id)
    case actionTypes.DELETE_PROJECT:
      return deleteProject(state, action.id, action.status)

    case actionTypes.ADD_TASK_CONTEXT:
      return addTaskContext(state, action.id, action.context)
    case actionTypes.REMOVE_TASK_CONTEXT:
      return removeTaskContext(state, action)
    case actionTypes.SWITCH_TASK_CONTEXT:
      return switchTaskContext(state, action.id, action.context)
    case actionTypes.REMOVE_CONTEXT:
      return removeContextFromTasks(state, action.id)

    case actionTypes.SET_STATE:
      return setState(state, action.state)
    case actionTypes.PROCESS_STATE:
      return processState(state)

    case actionTypes.START_TASK_TRACKING:
      return state.has(action.id) ? state.updateIn([action.id, 'tracking'], fromJS([]), val => val.push(fromJS({ startTime: action.startTime }))) : state
    case actionTypes.STOP_TASK_TRACKING:
      return state.updateIn([action.id, 'tracking'], undefined, val => val ? val.setIn([val.size - 1, 'endTime'], action.endTime) : undefined)
    default:
      return state
  }
}

export default task

const addTask = (state, properties = {}) => {
  if (!properties.id || state.has(properties.id)) {
    return state
  }
  const newTask = fromJS({
    id: properties.id,
    title: NEW_TASK_TITLE,
    completed: false,
    today: false,
    priority: PRIORITY_NONE,
    deleted: false,
    completedDeleted: false
  })
  return state.set(properties.id, newTask.merge(properties))
}

const editTask = (state, id, properties = {}) => {
  if (properties.id && properties.id != id) {
    if (state.has(properties.id)) {
      return state
    }
    const temp = state.get(id)
    return state.delete(id).set(properties.id, temp).mergeIn([properties.id], properties)
  } else {
    return state.mergeIn([id], properties)
  }
}

const deleteTask = (state, id, status = false) => state.withMutations(tasks => tasks.setIn([id, 'deleted'], status).setIn([id, 'completedDeleted'], status || state.getIn([id, 'completed'], false)))

const completeTask = (state, id, status = false, date) => {
  const newState = state.withMutations(tasks => tasks.setIn([id, 'completed'], status).setIn([id, 'completedDeleted'], status || state.getIn([id, 'deleted'], false)))
  if (status && date) {return newState.setIn([id, 'completedDate'], date)}
  return newState.deleteIn([id, 'completedDate'])
}

const setTaskToday = (state, id, status = false) => state.setIn([id, 'today'], status)

const setTaskSomeday = (state, id, status = false, date) => {
  const newState = state.setIn([id, 'someday'], status)
  if (status && date) {return newState.setIn([id, 'somedayDate'], date)}
  return newState.deleteIn([id, 'somedayDate'])
}

const addTaskToProject = (state, id, projectId) => {
  if (projectId) {
    return state.setIn([id, 'project'], projectId)
  } else {
    return state.deleteIn([id, 'project'])
  }
}

const deleteProject = (state, projectId, status = false) => {
  return state.map(item => item.get('project') !== projectId ? item : item.withMutations(task => {
    task.set('deleted', status).set('completedDeleted', status || task.get('completed'))
  }))
}

const addTaskContext = (state, id, contextId) => {
  return state.updateIn([id, 'contexts'], val => {
    if (val) {
      if (val.find(item => item === contextId)) {
        return val
      } else {
        return val.push(contextId)
      }
    } else {
      return List([contextId])
    }
  })
}

const removeTaskContext = (state, {id, context}) => {
  const temp =  state.updateIn([id, 'contexts'], val => {
    if (val) {
      return val.filter(item => item !== context)
    } else {
      return val
    }
  })
  if (temp.getIn([id, 'contexts']) && temp.getIn([id, 'contexts']).isEmpty()) {
    return temp.deleteIn([id, 'contexts'])
  } else {
    return temp
  }
}

const switchTaskContext = (state, taskId, contextId) => {
  const temp = state.updateIn([taskId, 'contexts'], val => {
    if (val) {
      const idIndex = val.indexOf(contextId)
      if (idIndex !== -1) {return val.delete(idIndex)}
      else {return val.push(contextId)}
    }
    else {
      return List([contextId])
    }
  })
  if (temp.getIn([taskId, 'contexts']) && temp.getIn([taskId, 'contexts']).isEmpty()) {
    return temp.deleteIn([taskId, 'contexts'])
  } else {
    return temp
  }
}

const setState = (state, newState) => newState.has('task') ? newState.get('task', fromJS({})) : state

const processState = (state) => state.map(item => item.withMutations(task => {
  //check if someday has expired
  if (task.get('someday') && (task.get('somedayDate', 0) + SOMEDAY_WAITING_PERIOD) <= Date.now()) {
    task.set('someday', false)
  }
  //check today date
  if (!task.get('today') && task.get('date')) {
    const today = new Date()
    const taskDate = new Date(task.get('date'))
    if (taskDate.getFullYear() === today.getFullYear() && taskDate.getMonth() === today.getMonth() && taskDate.getDate() === today.getDate()) {
      task.set('today', true)
    }
  }
  //completedDeleted property
  task.set('completedDeleted', task.get('completed') || task.get('deleted', false))
}))

const removeContextFromTasks = (state, contextId) => {
  return state.map(task => {
    const contexts = task.get('contexts')
    if (contexts) {
      const newContexts = contexts.filter(item => item !== contextId)
      if (!newContexts.isEmpty()) {
        return task.set('contexts', newContexts)
      } else {
        return task.delete('contexts')
      }
    } else {
      return task
    }
  })
}
