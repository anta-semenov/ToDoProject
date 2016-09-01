import { expect } from 'chai'
import * as types from '../../src/constants/actionTypes'
import * as actions from '../../src/actions/uiStateActions'
import * as sections from '../../src/constants/sectionTypes'

describe('UI state action creators', () => {
  it('Should create an action to set sidebar size', () => {
    const size = '250px'
    const expectedAction = {
      type: types.SET_SIDEBAR_SIZE,
      size
    }
    expect(actions.setSidebarSize(size)).to.deep.equal(expectedAction)
  })

  it('Should create an action to set editing item', () => {
    const section = {
      type: sections.PROJECT,
      id: 1
    }

    const expectedAction = {
      type: types.SET_EDITING_SECTION,
      section
    }

    expect(actions.setEditingSection(section)).to.deep.equal(expectedAction)
  })
  it('Should create an action to toggle completed task latency', () => {
    const expectedAction = {
      type: types.TOGGLE_TASK_COMPLETED_LATENCY,
      id: 0
    }
    expect(actions.toggleTaskCompletedLatency(0)).to.deep.equal(expectedAction)
  })
  it('Should create an action to clear completed latent tasks', () => {
    const expectedAction = {
      type: types.CLEAR_COMPLETED_LATENT_TASKS
    }
    expect(actions.clearCompletedLatentTasks()).to.deep.equal(expectedAction)
  })

  it('Should create an action to toggle task latency', () => {
    const expectedAction = {
      type: types.TOGGLE_TASK_LATENCY,
      id: 0,
      status: true
    }
    expect(actions.toggleTaskLatency(0, true)).to.deep.equal(expectedAction)
  })
  it('Should create an action to clear today latent tasks', () => {
    const expectedAction = {
      type: types.CLEAR_LATENT_TASKS
    }
    expect(actions.clearLatentTasks()).to.deep.equal(expectedAction)
  })

  it('Should create an action to set syncing', () => {
    const expectedAction = {
      type: types.SET_SYNCING,
      status: true
    }
    expect(actions.setSyncing(true)).to.deep.equal(expectedAction)
  })

  it('Should create an action to set offline', () => {
    const expectedAction = {
      type: types.SET_OFFLINE,
      status: true
    }
    expect(actions.setOffline(true)).to.deep.equal(expectedAction)
  })

  it('Should create an action to set auth status', () => {
    const expectedAction = {
      type: types.SET_AUTH_STATUS,
      status: true
    }
    expect(actions.setAuthStatus(true)).to.deep.equal(expectedAction)
  })

  it('Should create an action to set auth error message', () => {
    const expectedAction = {
      type: types.SET_AUTH_ERROR_MESSAGE,
      message: 'test message'
    }
    expect(actions.setAuthErrorMessage('test message')).to.deep.equal(expectedAction)
  })

  it('Should create an action to set auth error message', () => {
    const property = 'showAuthMenu'
    const value = true
    const expectedAction = {
      type: types.SET_PROPERTY,
      property,
      value
    }
    expect(actions.setProperty(property, value)).to.deep.equal(expectedAction)
  })
})
