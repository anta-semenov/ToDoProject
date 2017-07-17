/* global Promise */
import { fromJS } from 'immutable'
import * as actionTypes from '../constants/actionTypes'
import * as api from '../backend/firebase/api'
import uniqueKey from '../utils/uniqueKeyGenerator'
import {shiftDate} from '../utils/date'
import { DATA_TYPES } from '../constants/defaults'
import { loadState } from '../backend/localStore'
import { INITIAL_STATE } from '../constants/defaults'
import {getUid, getProjects, getTasks} from '../reducer'

// Helper
const forceFirebaseEnchancer = (action) => ({...action, saveToFirebase: true})

//Plain action creators
export const setState = (state) => ({ type: actionTypes.SET_STATE, state })
export const requestAuth = () => ({ type: actionTypes.REQUEST_AUTH })
export const errorAuth = (error) => ({
  type: actionTypes.ERROR_AUTH,
  errorMessage: error.message || 'Something went wrong',
  errorCode: error.code
})
export const logout = () => ({ type: actionTypes.LOG_OUT })

export const requestData = () => ({ type: actionTypes.REQUEST_DATA })
export const recieveData = () => ({ type: actionTypes.RECIEVE_DATA })
export const errorData = (error) => ({ type: actionTypes.ERROR_DATA, error })

export const processState = () => ({ type: actionTypes.PROCESS_STATE })

//Thunk action creators
export const login = (type) => (dispatch) => {
  dispatch(requestAuth())
  return api.auth(type).then(
    response => {
      if (response.user.uid) {
        dispatch(recieveAuth(response.user, uniqueKey()))
      }
      else {
        dispatch(errorAuth({ errorMessage: 'Authentification failed. There is no such user'}))
      }
    },
    error => dispatch(errorAuth(error))
  )
}

export const logoutThunk = () => api.unAuth()
export const recieveAuth = (userData, clientId) => (dispatch) => {
  dispatch({ type: actionTypes.RECIEVE_AUTH, userData, clientId })
  dispatch(requestData())
  Promise.all(DATA_TYPES.map(dataType => {
    let filter
    switch (dataType) {
      case 'context':
        filter = {type: '<=', key:'deleted', value: false}
        break
      case 'task':
      case 'project':
        filter = {type: '<=', key:'completedDeleted', value: false}
        break
      default:
        filter = {}
        break
    }
    return api.fetchData(userData.uid, dataType, filter)
  })).then(
    results => {

      // Check if there exist any data in this account. If not, then we will try to load data from local storage, and then from initial state
      const doesDataExist = results.reduce((check, result) => check || result.val() !== null, false)
      if (doesDataExist) {
        dispatch(setState(results.reduce((newState, result, index) => newState.set(DATA_TYPES[index], fromJS(result.val() || {})), fromJS({}))))
      } else {
        dispatch(setState(INITIAL_STATE)) // Reset state, so diff function in firebase middleware could find difference
        dispatch(forceFirebaseEnchancer(setState(loadState() || INITIAL_STATE)))
      }
      dispatch(processState())
      dispatch(recieveData())
      dispatch(loadCompletedTasks())
    },
    error => dispatch(errorData(error))
  )
}

export const loadCompletedTasks = () => (dispatch, getState) => {
  const state = getState()
  const startDate = shiftDate(new Date(), -1, 'month').getTime()
  api.fetchData(
    getUid(state),
    'task',
    {type: '>=', key: 'completedDate', value: startDate}
  ).then(result => {
    const completedTasks = result.val()

    if (!completedTasks || Object.keys(completedTasks).length == 0) return

    //retreive completed tasks projects
    const completedTasksProjectsIds = []
    Object.keys(completedTasks).forEach(({project}) => {
      if (project && !completedTasksProjectsIds.includes(project)) {
        completedTasksProjectsIds.push(project)
      }
    })

    //get projects from state
    const stateProjectsIds = getProjects(state).map(item => item.get('id')).toList().toArray()
    const completedTasksProjectsNotInState = completedTasksProjectsIds.filter(
      id => !stateProjectsIds.includes(id)
    )

    let projectRequest

    if (completedTasksProjectsNotInState.length > 0) {
      projectRequest = Promise.all(completedTasksProjectsNotInState.map(
        id => api.fetchData(getUid(state), 'project', {type: '==', key: 'id', value: id})
      ))
    } else {
      projectRequest = new Promise(resolve => resolve({val: () => ({})}))
    }

    projectRequest.then(projectResult => {
      const projectsNotInState = projectResult.val()

      const tasks = getTasks(state).merge(fromJS(completedTasks))
      const projects = getProjects(state).merge(fromJS(projectsNotInState))
      const newState = fromJS({}).set('task', tasks).set('project', projects)
      dispatch(setState(newState))
    })
  })
}
