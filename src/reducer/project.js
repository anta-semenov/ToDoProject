import { fromJS } from 'immutable'
import { NEW_PROJECT_TITLE } from '../constants/defaults'
import * as actionTypes from '../constants/actionTypes'

const project = (state = fromJS({}), action) => {
  switch (action.type) {
    case actionTypes.ADD_PROJECT:
      return addProject(state, action.properties)

    case actionTypes.REMOVE_PROJECT:
      return state.delete(action.id)

    case actionTypes.EDIT_PROJECT:
      return editProject(state, action.id, action.properties)

    case actionTypes.REPLACE_PROJECT:
      return state.set(action.id, fromJS(action.newProject))

    case actionTypes.COMPLETE_PROJECT:
      return completeProject(state, action.id, action.status, action.date)

    case actionTypes.DELETE_PROJECT:
      return deleteProject(state, action.id, action.status)

    case actionTypes.SET_STATE:
      return setState(state, action.state)

    case actionTypes.PROCESS_STATE:
      return processState(state)

    default:
      return state
  }
}

export default project

const addProject = (state, properties = {}) => {
  if (!properties.id || state.has(properties.id)) {
    return state
  }
  const newProject = fromJS({
    id: properties.id,
    title: NEW_PROJECT_TITLE,
    completed: false,
    deleted: false,
    completedDeleted: false
  })
  return state.set(properties.id, newProject.merge(properties))
}

const editProject = (state, id, properties = {}) => {
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

const completeProject = (state, id, status = false, date) => {
  const newState = state.withMutations(item => item.setIn([id, 'completed'], status).setIn([id, 'completedDeleted'], status || item.getIn([id, 'deleted'], false)))
  if (status && date) {return newState.setIn([id, 'completedDate'], date)}
  return newState.deleteIn([id, 'completedDate'])
}

const deleteProject = (state, id, status = false) => state.withMutations(item => item.setIn([id, 'deleted'], status).setIn([id, 'completedDeleted'], status || item.getIn([id, 'completed'])))

const setState = (state, newState) => newState.has('project') ? newState.get('project', fromJS({})) : state

const processState = (state) => state.map(item => item.withMutations(project => {
  project.set('completedDeleted', project.get('completed') || project.get('deleted', false))
}))

/*
 * Selectors
 */

export const getProjects = (state = fromJS({})) => state.filter(project => !project.get('completedDeleted'))
