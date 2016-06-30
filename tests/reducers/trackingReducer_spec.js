import { expect } from 'chai'
import { fromJS } from 'immutable'
import tracking from '../../src/reducer/tracking'
import { START_TASK_TRACKING, STOP_TASK_TRACKING } from '../../src/constants/actionTypes'

describe('Tracking reducer', () => {
  it('Should return undefined state',() => {
    expect(tracking(undefined, {})).to.equal(fromJS({}))
  })
  it('Should return state for empty action', () => {
    const initialState = fromJS({
      task: '40gafk2gci6'
    })
    expect(tracking(initialState, {})).to.equal(initialState)
  })
  it('Should handle START_TASK_TRACKING', () => {
    const action = {
      type: START_TASK_TRACKING,
      id: '40gafk2gci6',
      startTime: 1467058902561
    }
    const nextState = fromJS({
      task: '40gafk2gci6'
    })
    expect(tracking(fromJS({}), action)).to.equal(nextState)
  })
  it('Should handle STOP_TASK_TRACKING', () => {
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
    expect(tracking(initialState, action1)).to.equal(fromJS({}))
    expect(tracking(initialState, action2)).to.equal(initialState)
  })
})
