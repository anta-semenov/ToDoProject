import { expect } from 'chai'
import * as types from '../../src/constants/actionTypes'
import * as actions from '../../src/actions/commonActions'
import { fromJS } from 'immutable'

describe('Common action creators', () => {
  it('Should create action to set state', () => {
    const state = fromJS({
      uiState: {
        activeItem: 'testID'
      }
    })

    const expectedAction = {
      type: types.SET_STATE,
      state
    }

    expect(actions.setState(state)).to.deep.equal(expectedAction)
  })

  it('Should create action to log in', () => {
    const parameters = {
      type: 'email',
      email: 'test@test.com',
      password: '123'
    }

    const expectedAction = {
      type: types.LOG_IN,
      parameters
    }

    expect(actions.logIn(parameters)).to.deep.equal(expectedAction)
  })

  it('Should create action to sign in', () => {
    const parameters = {
      type: 'email',
      email: 'test@test.com',
      password: '123'
    }

    const expectedAction = {
      type: types.SIGN_IN,
      parameters
    }

    expect(actions.signIn(parameters)).to.deep.equal(expectedAction)
  })

  it('Should create action to log out', () => {
    const expectedAction = {
      type: types.LOG_OUT
    }

    expect(actions.logOut()).to.deep.equal(expectedAction)
  })
})
