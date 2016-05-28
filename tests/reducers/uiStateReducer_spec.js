import { expect } from 'chai'
import { fromJS, Set } from 'immutable'
import reducer from '../../src/reducer/uiState'
import * as actionTypes from '../../src/constants/actionTypes'
import { DEFAULT_SIDEBAR_SIZE } from '../../src/constants/defaults'
import * as sectionTypes from '../../src/constants/sectionTypes'
import { INITIAL_UI_STATE } from '../../src/constants/defaults'
import * as actionCreator from '../../src/actions/uiStateActions'

describe('UI state reducer', () => {
  it('Should return initial state', () => {
    const initialState = undefined
    const action = {}
    const nextState = INITIAL_UI_STATE
    expect(reducer(initialState, action)).to.equal(nextState)
  })
  it('Should return state for empty action', () => {
    const initialState = fromJS({
      sidebarSize: DEFAULT_SIDEBAR_SIZE
    })
    const action = {}
    expect(reducer(initialState, action)).to.equal(initialState)
  })

  describe('Set selected section', () => {
    it('Should handle SET_SELECTED_SECTION with empty action parameter and empty store', () => {
      const initialState = fromJS({})
      const action = {
        type: actionTypes.SET_SELECTED_SECTION
      }
      const nextState = fromJS({})
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_SELECTED_SECTION with empty action parameter', () => {
      const initialState = fromJS({
        selectedSection: {
          type: sectionTypes.PROJECT,
          id: 'bh52ogy5s0fm'
        },
        sidebarSize: DEFAULT_SIDEBAR_SIZE
      })
      const action = {
        type: actionTypes.SET_SELECTED_SECTION
      }
      const nextState = fromJS({
        sidebarSize: DEFAULT_SIDEBAR_SIZE
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_SELECTED_SECTION', () => {
      const initialState = fromJS({
        selectedSection: {
          type: sectionTypes.PROJECT,
          id: 'bh52ogy5s0fm'
        },
        sidebarSize: DEFAULT_SIDEBAR_SIZE
      })
      const action = {
        type: actionTypes.SET_SELECTED_SECTION,
        section: {
          type: sectionTypes.PROJECTS
        }
      }
      const nextState = fromJS({
        selectedSection: {
          type: sectionTypes.PROJECTS
        },
        sidebarSize: DEFAULT_SIDEBAR_SIZE
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_SELECTED_SECTION with empty store', () => {
      const initialState = fromJS({})
      const action = {
        type: actionTypes.SET_SELECTED_SECTION,
        section: {type: sectionTypes.PROJECTS}
      }
      const nextState = fromJS({
        selectedSection: {
          type: sectionTypes.PROJECTS
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should clear active item when change selected section', () => {
      const initialState = fromJS({
        selectedSection: {
          type: sectionTypes.PROJECT,
          id: 'bh52ogy5s0fm'
        },
        sidebarSize: DEFAULT_SIDEBAR_SIZE,
        activeItem: 'b41sogy3s0os'
      })
      const action = {
        type: actionTypes.SET_SELECTED_SECTION,
        section: {
          type: sectionTypes.PROJECTS
        }
      }
      const nextState = fromJS({
        selectedSection: {
          type: sectionTypes.PROJECTS
        },
        sidebarSize: DEFAULT_SIDEBAR_SIZE
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should not clear active item when set the same selected section', () => {
      const initialState = fromJS({
        selectedSection: {
          type: sectionTypes.PROJECT,
          id: 'bh52ogy5s0fm'
        },
        sidebarSize: DEFAULT_SIDEBAR_SIZE,
        activeItem: 'b41sogy3s0os'
      })
      const action = {
        type: actionTypes.SET_SELECTED_SECTION,
        section: {
          type: sectionTypes.PROJECT,
          id: 'bh52ogy5s0fm'
        }
      }
      const nextState = fromJS({
        selectedSection: {
          type: sectionTypes.PROJECT,
          id: 'bh52ogy5s0fm'
        },
        sidebarSize: DEFAULT_SIDEBAR_SIZE,
        activeItem: 'b41sogy3s0os'
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })

  describe('Set sidebar size', () => {
    it('Should handle SET_SIDEBAR_SIZE with empty action parameter and empty store', () => {
      const initialState = fromJS({})
      const action = {
        type: actionTypes.SET_SIDEBAR_SIZE
      }
      const nextState = fromJS({})
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_SIDEBAR_SIZE with empty action parameter', () => {
      const initialState = fromJS({
        sidebarSize: '180px',
        activeItem: 'b41sogy3s0os'
      })
      const action = {
        type: actionTypes.SET_SIDEBAR_SIZE
      }
      const nextState = fromJS({
        activeItem: 'b41sogy3s0os'
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_SIDEBAR_SIZE', () => {
      const initialState = fromJS({
        sidebarSize: '180px',
        activeItem: 'b41sogy3s0os'
      })
      const action = {
        type: actionTypes.SET_SIDEBAR_SIZE,
        sidebarSize: '190px'
      }
      const nextState = fromJS({
        sidebarSize: '190px',
        activeItem: 'b41sogy3s0os'
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_SIDEBAR_SIZE with empty store', () => {
      const initialState = fromJS({})
      const action = {
        type: actionTypes.SET_SIDEBAR_SIZE,
        sidebarSize: '190px'
      }
      const nextState = fromJS({
        sidebarSize: '190px'
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })

  describe('Set active item', () => {
    it('Should handle SET_ACTIVE_ITEM with empty action parameter and empty store', () => {
      const initialState = fromJS({})
      const action = {
        type: actionTypes.SET_ACTIVE_ITEM
      }
      const nextState = fromJS({})
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_ACTIVE_ITEM with empty action parameter', () => {
      const initialState = fromJS({
        activeItem: 'b41sogy3s0os',
        sidebarSize: DEFAULT_SIDEBAR_SIZE
      })
      const action = {
        type: actionTypes.SET_ACTIVE_ITEM
      }
      const nextState = fromJS({
        sidebarSize: DEFAULT_SIDEBAR_SIZE
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_ACTIVE_ITEM', () => {
      const initialState = fromJS({
        activeItem: 'b41sogy3s0os',
        sidebarSize: DEFAULT_SIDEBAR_SIZE
      })
      const action = {
        type: actionTypes.SET_ACTIVE_ITEM,
        id: 0
      }
      const nextState = fromJS({
        activeItem: 0,
        sidebarSize: DEFAULT_SIDEBAR_SIZE
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_ACTIVE_ITEM', () => {
      const initialState = fromJS({
        activeItem: 'b41sogy3s0os',
        sidebarSize: DEFAULT_SIDEBAR_SIZE
      })
      const action = {
        type: actionTypes.SET_ACTIVE_ITEM,
        id: 'b41sogy3s0o6'
      }
      const nextState = fromJS({
        activeItem: 'b41sogy3s0o6',
        sidebarSize: DEFAULT_SIDEBAR_SIZE
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_ACTIVE_ITEM with empty store', () => {
      const initialState = fromJS({})
      const action = {
        type: actionTypes.SET_ACTIVE_ITEM,
        id: 'b41sogy3s0os'
      }
      const nextState = fromJS({
        activeItem: 'b41sogy3s0os'
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })

  describe('Set editing section', () => {
    it('Should handle SET_EDITING_SECTION with empty action parameter and empty store', () => {
      const initialState = fromJS({})
      const action = actionCreator.setEditingSection()
      const nextState = fromJS({})

      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle SET_EDITING_SECTION with empty action parameter', () => {
      const initialState = fromJS({
        editingSection: {
          type: sectionTypes.CONTEXT,
          id: 'cf1sobz3s0oc'
        },
        sidebarSize: DEFAULT_SIDEBAR_SIZE
      })
      const action = actionCreator.setEditingSection()
      const nextState = fromJS({
        sidebarSize: DEFAULT_SIDEBAR_SIZE
      })

      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle SET_EDITING_SECTION', () => {
      const initialState = fromJS({
        editingSection: {
          type: sectionTypes.CONTEXT,
          id: 'cf1sobz3s0oc'
        },
        sidebarSize: DEFAULT_SIDEBAR_SIZE
      })
      const action = actionCreator.setEditingSection({
        type: sectionTypes.PROJECT,
        id: 'bh52ogy5s0fm'
      })
      const nextState = fromJS({
        editingSection: {
          type: sectionTypes.PROJECT,
          id: 'bh52ogy5s0fm'
        },
        sidebarSize: DEFAULT_SIDEBAR_SIZE
      })

      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle SET_EDITING_SECTION with empty store', () => {
      const initialState = fromJS({})
      const action = actionCreator.setEditingSection({
        type: sectionTypes.PROJECT,
        id: 'bh52ogy5s0fm'
      })
      const nextState = fromJS({
        editingSection: {
          type: sectionTypes.PROJECT,
          id: 'bh52ogy5s0fm'
        }
      })

      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })

  describe('Section Completed Latent Tasks', () => {
    describe('TOGGLE_TASK_COMPLETED_LATENCY', () => {
      it('Should handle TOGGLE_TASK_COMPLETED_LATENCY with empty state', () => {
        const initialState = fromJS({})
        const action = actionCreator.toggleTaskCompletedLatency('b41sogy3s0o2')
        const nextState = fromJS({
          sectionCompletedLatentTasks: Set(['b41sogy3s0o2'])
        })
        expect(reducer(initialState, action)).to.equal(nextState)
      })
      it('Should handle TOGGLE_TASK_COMPLETED_LATENCY with undefined latent list', () => {
        const initialState = fromJS({
          sectionCompletedLatentTasks: undefined
        })
        const action = actionCreator.toggleTaskCompletedLatency('b41sogy3s0o2')
        const nextState = fromJS({
          sectionCompletedLatentTasks: Set(['b41sogy3s0o2'])
        })
        expect(reducer(initialState, action)).to.equal(nextState)
      })
      it('Should handle TOGGLE_TASK_COMPLETED_LATENCY with existing latent list but without a task', () => {
        const initialState = fromJS({
          sectionCompletedLatentTasks: Set(['b41sogy3s0o0', 'b41sogy3s0o7'])
        })
        const action = actionCreator.toggleTaskCompletedLatency('b41sogy3s0o2')
        const nextState = fromJS({
          sectionCompletedLatentTasks: Set(['b41sogy3s0o0', 'b41sogy3s0o7', 'b41sogy3s0o2'])
        })
        expect(reducer(initialState, action)).to.equal(nextState)
      })
      it('Should handle TOGGLE_TASK_COMPLETED_LATENCY with existing latent list but with a task', () => {
        const initialState = fromJS({
          sectionCompletedLatentTasks: Set(['b41sogy3s0o0', 'b41sogy3s0o7', 'b41sogy3s0o3', 'b41sogy3s0o5', 'b41sogy3s0o2', 'b41sogy3s0o4'])
        })
        const action = actionCreator.toggleTaskCompletedLatency('b41sogy3s0o2')
        const nextState = fromJS({
          sectionCompletedLatentTasks: Set(['b41sogy3s0o0', 'b41sogy3s0o7', 'b41sogy3s0o3', 'b41sogy3s0o5', 'b41sogy3s0o4'])
        })
        expect(reducer(initialState, action)).to.equal(nextState)
      })
    })
    describe('CLEAR_COMPLETED_LATENT_TASKS', () => {
      it('Should handle CLEAR_COMPLETED_LATENT_TASKS with empty state', () => {
        const initialState = fromJS({})
        const action = actionCreator.clearCompletedLatentTasks()
        expect(reducer(initialState, action)).to.equal(initialState)
      })
      it('Should handle CLEAR_COMPLETED_LATENT_TASKS with existing state', () => {
        const initialState = fromJS({
          sectionCompletedLatentTasks: Set(['b41sogy3s0o0', 'b41sogy3s0o7', 'b41sogy3s0o2', 'b41sogy3s0o5'])
        })
        const action = actionCreator.clearCompletedLatentTasks()
        const nextState = fromJS({})
        expect(reducer(initialState, action)).to.equal(nextState)
      })
    })
  })

  describe('Section Latent Tasks', () => {
    describe('TOGGLE_TASK_LATENCY', () => {
      it('Should handle TOGGLE_TASK_LATENCY with empty state and true status', () => {
        const initialState = fromJS({})
        const action = actionCreator.toggleTaskLatency('b41sogy3s0o2', true)
        const nextState = fromJS({
          sectionLatentTasks: Set(['b41sogy3s0o2'])
        })
        expect(reducer(initialState, action)).to.equal(nextState)
      })
      it('Should handle TOGGLE_TASK_LATENCY with empty state and false status', () => {
        const initialState = fromJS({})
        const action = actionCreator.toggleTaskLatency('b41sogy3s0o2', false)
        expect(reducer(initialState, action)).to.equal(initialState)
      })
      it('Should handle TOGGLE_TASK_LATENCY with undefined latent list and true status', () => {
        const initialState = fromJS({
          sectionLatentTasks: undefined
        })
        const action = actionCreator.toggleTaskLatency('b41sogy3s0o2', true)
        const nextState = fromJS({
          sectionLatentTasks: Set(['b41sogy3s0o2'])
        })
        expect(reducer(initialState, action)).to.equal(nextState)
      })
      it('Should handle TOGGLE_TASK_LATENCY with undefined latent list and false status', () => {
        const initialState = fromJS({
          sectionLatentTasks: undefined
        })
        const action = actionCreator.toggleTaskLatency('b41sogy3s0o2', false)
        expect(reducer(initialState, action)).to.equal(initialState)
      })
      it('Should handle TOGGLE_TASK_LATENCY with existing latent list but without a task and true status', () => {
        const initialState = fromJS({
          sectionLatentTasks: Set(['b41sogy3s0o0', 'b41sogy3s0o7'])
        })
        const action = actionCreator.toggleTaskLatency('b41sogy3s0o2', true)
        const nextState = fromJS({
          sectionLatentTasks: Set(['b41sogy3s0o0', 'b41sogy3s0o7', 'b41sogy3s0o2'])
        })
        expect(reducer(initialState, action)).to.equal(nextState)
      })
      it('Should handle TOGGLE_TASK_LATENCY with existing latent list but without a task and false status', () => {
        const initialState = fromJS({
          sectionLatentTasks: Set(['b41sogy3s0o0', 'b41sogy3s0o7'])
        })
        const action = actionCreator.toggleTaskLatency('b41sogy3s0o2', false)
        expect(reducer(initialState, action)).to.equal(initialState)
      })
      it('Should handle TOGGLE_TASK_LATENCY with existing latent list, with a task and true status', () => {
        const initialState = fromJS({
          sectionLatentTasks: Set(['b41sogy3s0o0', 'b41sogy3s0o7', 'b41sogy3s0o3', 'b41sogy3s0o5', 'b41sogy3s0o2', 'b41sogy3s0o4'])
        })
        const action = actionCreator.toggleTaskLatency('b41sogy3s0o2', true)
        expect(reducer(initialState, action)).to.equal(initialState)
      })
      it('Should handle TOGGLE_TASK_LATENCY with existing latent list, with a task and false status', () => {
        const initialState = fromJS({
          sectionLatentTasks: Set(['b41sogy3s0o0', 'b41sogy3s0o7', 'b41sogy3s0o3', 'b41sogy3s0o5', 'b41sogy3s0o2', 'b41sogy3s0o4'])
        })
        const action = actionCreator.toggleTaskLatency('b41sogy3s0o2', false)
        const nextState = fromJS({
          sectionLatentTasks: Set(['b41sogy3s0o0', 'b41sogy3s0o7', 'b41sogy3s0o3', 'b41sogy3s0o5', 'b41sogy3s0o4'])
        })
        expect(reducer(initialState, action)).to.equal(nextState)
      })
    })
    describe('CLEAR_LATENT_TASKS', () => {
      it('Should handle CLEAR_LATENT_TASKS with empty state', () => {
        const initialState = fromJS({})
        const action = actionCreator.clearLatentTasks()
        expect(reducer(initialState, action)).to.equal(initialState)
      })
      it('Should handle CLEAR_LATENT_TASKS with existing state', () => {
        const initialState = fromJS({
          sectionLatentTasks: Set(['b41sogy3s0o0', 'b41sogy3s0o7', 'b41sogy3s0o2', 'b41sogy3s0o5'])
        })
        const action = actionCreator.clearLatentTasks()
        const nextState = fromJS({})
        expect(reducer(initialState, action)).to.equal(nextState)
      })
    })
  })

  describe('Set syncing', () => {
    it('Should handle SET_SYNCING with empty state and empty parameter', () => {
      const initialState = fromJS({})
      const action = actionCreator.setSyncing()
      const nextState = fromJS({})
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_SYNCING with empty state', () => {
      const initialState = fromJS({})
      const action = actionCreator.setSyncing(true)
      const nextState = fromJS({
        syncing: true
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_SYNCING with empty parameter', () => {
      const initialState = fromJS({
        syncing: true,
        activeItem: 'b41sogy3s0os'
      })
      const action = actionCreator.setSyncing()
      const nextState = fromJS({
        activeItem: 'b41sogy3s0os'
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_SYNCING with false parameter', () => {
      const initialState = fromJS({
        syncing: true,
        activeItem: 'b41sogy3s0os'
      })
      const action = actionCreator.setSyncing(false)
      const nextState = fromJS({
        activeItem: 'b41sogy3s0os'
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })

  describe('Set offline', () => {
    it('Should handle SET_OFFLINE with empty state and empty parameter', () => {
      const initialState = fromJS({})
      const action = actionCreator.setOffline()
      const nextState = fromJS({})
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_OFFLINE with empty state', () => {
      const initialState = fromJS({})
      const action = actionCreator.setOffline(true)
      const nextState = fromJS({
        offline: true
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_OFFLINE with empty parameter', () => {
      const initialState = fromJS({
        offline: true,
        activeItem: 'b41sogy3s0os'
      })
      const action = actionCreator.setOffline()
      const nextState = fromJS({
        activeItem: 'b41sogy3s0os'
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_OFFLINE with false parameter', () => {
      const initialState = fromJS({
        offline: true,
        activeItem: 'b41sogy3s0os'
      })
      const action = actionCreator.setOffline(false)
      const nextState = fromJS({
        activeItem: 'b41sogy3s0os'
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })

  describe('Set auth status', () => {
    it('Should handle SET_AUTH_STATUS with empty state and empty parameter', () => {
      const initialState = fromJS({})
      const action = actionCreator.setAuthStatus()
      const nextState = fromJS({})
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_AUTH_STATUS with empty state', () => {
      const initialState = fromJS({})
      const action = actionCreator.setAuthStatus(true)
      const nextState = fromJS({
        authStatus: true
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_AUTH_STATUS with empty parameter', () => {
      const initialState = fromJS({
        authStatus: true,
        activeItem: 'b41sogy3s0os'
      })
      const action = actionCreator.setAuthStatus()
      const nextState = fromJS({
        activeItem: 'b41sogy3s0os'
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_AUTH_STATUS with false parameter', () => {
      const initialState = fromJS({
        authStatus: true,
        activeItem: 'b41sogy3s0os'
      })
      const action = actionCreator.setAuthStatus(false)
      const nextState = fromJS({
        activeItem: 'b41sogy3s0os'
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })

  describe('Set auth error message', () => {
    it('Should handle SET_AUTH_ERROR_MESSAGE with empty state and empty parameter', () => {
      const initialState = fromJS({})
      const action = actionCreator.setAuthErrorMessage()
      const nextState = fromJS({})
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_AUTH_ERROR_MESSAGE with empty state', () => {
      const initialState = fromJS({})
      const action = actionCreator.setAuthErrorMessage('test error message')
      const nextState = fromJS({
        authErrorMessage: 'test error message'
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_AUTH_ERROR_MESSAGE with empty parameter', () => {
      const initialState = fromJS({
        authErrorMessage: 'test error message',
        activeItem: 'b41sogy3s0os'
      })
      const action = actionCreator.setAuthErrorMessage()
      const nextState = fromJS({
        activeItem: 'b41sogy3s0os'
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_AUTH_ERROR_MESSAGE with empty message', () => {
      const initialState = fromJS({
        authErrorMessage: 'test error message',
        activeItem: 'b41sogy3s0os'
      })
      const action = actionCreator.setAuthErrorMessage('')
      const nextState = fromJS({
        activeItem: 'b41sogy3s0os'
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })

  describe('Set property', () => {
    it('Should handle SET_PROPERTY with empty state and empty property value', () => {
      const initialState = fromJS({})
      const action = actionCreator.setProperty('testProperty')
      const nextState = fromJS({})
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_PROPERTY with empty state', () => {
      const initialState = fromJS({})
      const action = actionCreator.setProperty('authErrorMessage', 'test error message')
      const nextState = fromJS({
        authErrorMessage: 'test error message'
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_PROPERTY with empty parameter', () => {
      const initialState = fromJS({
        authErrorMessage: 'test error message',
        activeItem: 'b41sogy3s0os'
      })
      const action = actionCreator.setProperty('authErrorMessage')
      const nextState = fromJS({
        activeItem: 'b41sogy3s0os'
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })
})
