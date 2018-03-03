import { fromJS } from 'immutable'
import tracking from '../../src/reducer/tracking'
import { START_TASK_TRACKING, STOP_TASK_TRACKING, SET_STATE } from '../../src/constants/actionTypes'

describe('Tracking reducer', () => {
  test('Should return undefined state', () => {
    expect(tracking(undefined, {})).toEqual(fromJS({}))
  })
  test('Should return state for empty action', () => {
    const initialState = fromJS({
      task: '40gafk2gci6'
    })
    expect(tracking(initialState, {})).toEqual(initialState)
  })
  test('Should handle START_TASK_TRACKING', () => {
    const action = {
      type: START_TASK_TRACKING,
      id: '40gafk2gci6',
      startTime: 1467058902561
    }
    const nextState = fromJS({
      task: '40gafk2gci6'
    })
    expect(tracking(fromJS({}), action)).toEqual(nextState)
  })
  test('Should handle STOP_TASK_TRACKING', () => {
    const initialState = fromJS({
      task: '40gafk2gci6'
    })
    const action1 = {
      type: STOP_TASK_TRACKING,
      id: '40gafk2gci6',
      endTime:1467058902561
    }
    const action2 = {
      type: STOP_TASK_TRACKING,
      id: '40gafk2gc26',
      endTime:1467058902561
    }
    expect(tracking(initialState, action1)).toEqual(fromJS({}))
    expect(tracking(initialState, action2)).toEqual(initialState)
  })
  test('Should handle SET_STATE with empty new state', () => {
    const initialState = fromJS({ task: '40gafk2gci6' })
    const action = {
      type: SET_STATE,
      state: fromJS({ tracking: {} })
    }
    expect(tracking(initialState, action)).toEqual(fromJS({}))
  })
  test('Should handle SET_STATE with not empty new state', () => {
    const action = {
      type: SET_STATE,
      state: fromJS({
        tracking: { task: '40gafk2gci6' }
      })
    }
    const nextState = fromJS({ task: '40gafk2gci6'})
    expect(tracking(fromJS({}), action)).toEqual(nextState)
  })
})
