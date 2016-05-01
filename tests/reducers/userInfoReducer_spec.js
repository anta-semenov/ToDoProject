import { expect } from 'chai'
import { fromJS } from 'immutable'
import reducer from '../../src/reducer/userInfo'
import * as actions from '../../src/actions/userInfo'

describe('User info reducer', () => {
  it('Should return initial state', () => {
    const initialState = undefined
    const action = {}
    const nextState = fromJS({})

    expect(reducer(initialState, action)).to.equal(nextState)
  })

  it('Should return state for empty action', () => {
    const initialState = fromJS({
      uid: 1,
      name: 'Test'
    })
    const action = {}
    const nextState = fromJS({
      uid: 1,
      name: 'Test'
    })

    expect(reducer(initialState, action)).to.equal(nextState)
  })

  describe('Set user info', () => {
    it('Should handle SET_USER_INFO with empty state and empty action parameter', () => {
      const initialState = fromJS({})
      const action = actions.setUserInfo()
      const nextState = fromJS({})

      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle SET_USER_INFO with empty action parameter', () => {
      const initialState = fromJS({
        uid: 1,
        name: 'Test'
      })
      const action = actions.setUserInfo()
      const nextState = fromJS({
        uid: 1,
        name: 'Test'
      })

      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle SET_USER_INFO with empty state', () => {
      const initialState = fromJS({})
      const userInfo = {
        uid: 1,
        name: 'Test'
      }
      const action = actions.setUserInfo(userInfo)
      const nextState = fromJS({
        uid: 1,
        name: 'Test'
      })

      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle SET_USER_INFO setting different userInfo properties', () => {
      const initialState = fromJS({
        uid: 1,
        name: 'Test'
      })
      const userInfo = {
        mail: 'test@test.com'
      }
      const action = actions.setUserInfo(userInfo)
      const nextState = fromJS({
        uid: 1,
        name: 'Test',
        mail: 'test@test.com'
      })

      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle SET_USER_INFO setting same userInfo properties', () => {
      const initialState = fromJS({
        uid: 1,
        name: 'Test'
      })
      const userInfo = {
        name: 'John'
      }
      const action = actions.setUserInfo(userInfo)
      const nextState = fromJS({
        uid: 1,
        name: 'John'
      })

      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })

  describe('Clear user info', () => {
    it('Should handle CLEAR_USER_INFO with empty state', () => {
      const initialState = fromJS({})
      const action = actions.clearUserInfo()
      const nextState = fromJS({})

      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle CLEAR_USER_INFO', () => {
      const initialState = fromJS({
        uid: 1,
        name: 'Test'
      })
      const action = actions.clearUserInfo()
      const nextState = fromJS({})

      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })
})
