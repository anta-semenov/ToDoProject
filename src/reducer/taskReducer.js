import { fromJS } from 'immutable'
import * as actionTypes from '../constants/actionTypes'

const NEW_TITLE = 'New Task'

export default function task(state = fromJS([]), action) {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      return addTask(state, action.properties)
    default:
      return state
  }
}

function addTask(state, properties = {}) {
  const newId = state.reduce((id, item) => {
    return Math.max(id, item)
  }, 0) + 1
  const newTask = fromJS({
    id: newId,
    title: NEW_TITLE,
    completed: false,
    today: false
  })

  return state.push(newTask.mergeWith((prev, next) => next, properties))
}
