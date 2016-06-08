import { expect } from 'chai'
import { fromJS } from 'immutable'
import auth from '../../src/reducer/auth'
import { LOG_OUT, REQUEST_AUTH, RECIEVE_AUTH, ERROR_AUTH } from '../../src/constants/actionTypes'
import { AUTH_IN_PROGRESS, AUTH_SUCESS, AUTH_ERROR } from '../../src/constants/authStatus.js'

describe('Auth reducer', () => {
  it('Should return initial state', () => {
    expect(auth(undefined, {})).to.equal(fromJS({}))
  })
  it('Should return state for empty action', () => {
    const initialState = fromJS({
      authStatus: REQUEST_AUTH
    })
    expect(auth(initialState, {})).to.equal(initialState)
  })
  describe('REQUEST_AUTH', () => {
    it('Should handle REQUEST_AUTH with empty state', () => {
      const action = {type: REQUEST_AUTH}
      const nextState = fromJS({authStatus: AUTH_IN_PROGRESS})
      expect(auth(undefined, action)).to.equal(nextState)
    })
  })
})
