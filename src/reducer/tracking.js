import { fromJS } from 'immutable'
import { START_TASK_TRACKING, STOP_TASK_TRACKING, SET_STATE } from '../constants/actionTypes'

const tracking = (state = fromJS({}), action) => {
  switch (action.type) {
    case START_TASK_TRACKING:
      return state.get('task') === action.id ? state : state.set('task', action.id)
    case STOP_TASK_TRACKING:
      return state.get('task') === action.id ? state.delete('task') : state
    case SET_STATE:
      return action.state.has('tracking') ? action.state.get('tracking', fromJS({})) : state
    default:
      return state
  }
}
export default tracking

/*
 * Selectors
 */

export const getTrackingTaskId = (state = fromJS({})) => state.get('task')
