import { fromJS } from 'immutable'
import { START_TASK_TRACKING, STOP_TASK_TRACKING } from '../constants/actionTypes'

const tracking = (state = fromJS({}), action) => {
  switch (action.type) {
    case START_TASK_TRACKING:
      return state.get('task') === action.id ? state : state.set('task', action.id)
    case STOP_TASK_TRACKING:
      return state.get('task') === action.id ? state.delete('task') : state
    default:
      return state
  }
}
export default tracking

/*
 * Selectors
 */

export const getTrackingTaskId = (state = fromJS({})) => state.get('task')
