import * as actionTypes from '../constants/actionTypes'

export const addTask = (properties) => ({type: actionTypes.ADD_TASK, properties: { ...properties, createdDate: Date.now() }})
export const removeTask = (id) => ({type: actionTypes.REMOVE_TASK, id})
export const editTask = (id, properties) => ({type: actionTypes.EDIT_TASK, id, properties})
export const replaceTask = (id, newTask) => ({ type: actionTypes.REPLACE_TASK, id, newTask })

export const addTaskToProject = (id, project) => ({type: actionTypes.ADD_TASK_TO_PROJECT, id, project})
export const addTaskContext = (id, context) => ({type: actionTypes.ADD_TASK_CONTEXT, id, context})
export const removeTaskContext = (id, context) =>  ({type: actionTypes.REMOVE_TASK_CONTEXT, id, context})
export const switchTaskContext = (id, context) => ({type: actionTypes.SWITCH_TASK_CONTEXT, id, context})

export const completeTask = (id, status) => ({type: actionTypes.COMPLETE_TASK, date: status ? Date.now() : undefined, id, status})
export const setTaskToday = (id, status) => ({type: actionTypes.SET_TASK_TODAY, id, status})
export const startTaskTracking = id => ({ type: actionTypes.START_TASK_TRACKING, startTime: Date.now(), id })
export const stopTaskTracking = id => ({ type: actionTypes.STOP_TASK_TRACKING, endTime: Date.now(), id })
export const setTaskSomeday = (id, status) => ({type: actionTypes.SET_TASK_SOMEDAY, id, status})
