import { expect } from 'chai'
import * as actionTypes from '../../src/constants/actionTypes'
import * as actions from '../../src/actions/userInfo'

describe('User info action creator', () => {
  it('Should return action to setting userInfo', () => {
    const userInfo = {
      uid: 1,
      name: 'Test'
    }
    const expectedAction = {
      type: actionTypes.SET_USER_INFO,
      userInfo
    }
    expect(actions.setUserInfo(userInfo)).to.deep.equal(expectedAction)
  })

  it('Should return action to clear userInfo', () => {
    const expectedAction = {
      type: actionTypes.CLEAR_USER_INFO
    }
    expect(actions.clearUserInfo()).to.deep.equal(expectedAction)
  })
})
