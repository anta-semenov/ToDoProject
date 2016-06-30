import { fromJS, is } from 'immutable'
import { UNDO, REDO, SET_STATE, CLEAR_UNDO_REDO } from '../constants/actionTypes'

const PAST_PROPERTY_NAME = 'past'
const FUTURE_PROPERTY_NAME = 'future'

const undoRedo = (reducer, filters = {}) => (state = fromJS({}), action) => {
  const { undoProps, undoActions } = filters
  const actionFilter = [UNDO, REDO, SET_STATE, CLEAR_UNDO_REDO, ...(undoActions || [])]

  if (undoActions && !actionFilter.find(item => item === action.type)) {
    return reducer(state, action)
  }

  const stateForSaving = stateForSave(state, undoProps)
  const tempState = commonStateReducer(state, action, reducer)

  if (is(stateForSave(tempState, undoProps), stateForSaving)) {
    return tempState
  }

  return tempState.withMutations(map => {
    map.set(PAST_PROPERTY_NAME, pastReducer(map.get(PAST_PROPERTY_NAME), action, stateForSaving))
    .set(FUTURE_PROPERTY_NAME, futureReducer(map.get(FUTURE_PROPERTY_NAME), action, stateForSaving))
  })
}

const stateForSave = (state, undoProps) => state.filter((value, key) => key !== PAST_PROPERTY_NAME && key !== FUTURE_PROPERTY_NAME && (!undoProps || undoProps.find(item => item === key)))

const pastReducer = (state = fromJS([]), action, stateForSave) => {
  switch (action.type) {
    case UNDO:
      return state.skipLast(1)
    case CLEAR_UNDO_REDO:
    case SET_STATE:
      return fromJS([])
    default:
      if (is(state.last(), stateForSave)) {
        return state
      } else {
        return state.push(stateForSave)
      }
  }
}

const futureReducer = (state = fromJS([]), action, stateForSave) => {
  switch (action.type) {
    case REDO:
      return state.skipLast(1)
    case UNDO:
      if (is(state.last(), stateForSave)) {
        return state
      } else {
        return state.push(stateForSave)
      }
    default:
      return fromJS([])
  }
}

const commonStateReducer = (state, action, reducer) => {
  switch (action.type) {
    case UNDO:
      return state.merge(state.get(PAST_PROPERTY_NAME, fromJS([])).last())
    case REDO:
      return state.merge(state.get(FUTURE_PROPERTY_NAME, fromJS([])).last())
    default:
      return reducer(state, action)
  }
}

export default undoRedo

export const getPresentState = (state) => state.delete('past').delete('future')
