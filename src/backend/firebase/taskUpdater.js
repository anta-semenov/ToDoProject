import * as actionTypes from '../../constants/actionTypes'

export default function taskUpdater(updateObjects, action, newState) {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      return addTask(updateObjects, newState)
    default:
      return updateObjects
  }
}

function addTask(updateObjects, newState) {
  const value = newState.last().toJS()
  const updateURL = 'task/' + value.id
  return updateObjects.push({updateURL, value})
}
