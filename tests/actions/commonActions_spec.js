import * as types from '../../src/constants/actionTypes'
import { setState, logout } from '../../src/actions/commonActions'
import { fromJS } from 'immutable'

describe('Common action creators', () => {
  test('Should create action to set state', () => {
    const state = fromJS({
      uiState: {
        activeItem: 'testID'
      }
    })

    const expectedAction = {
      type: types.SET_STATE,
      state
    }

    expect(setState(state)).toEqual(expectedAction)
  })

  test('Should create action to log out', () => {
    const expectedAction = {
      type: types.LOG_OUT
    }
    expect(logout()).toEqual(expectedAction)
  })
})
