import { expect } from 'chai'
import { fromJS, Set } from 'immutable'
import reducer from '../../src/reducer/uiState'
import * as actionTypes from '../../src/constants/actionTypes'
import { DEFAULT_SIDEBAR_SIZE } from '../../src/constants/defaults'
import * as sectionTypes from '../../src/constants/sectionTypes'
import * as itemTypes from '../../src/constants/itemTypes'
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
          id: 0
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
          id: 0
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
          id: 0
        },
        sidebarSize: DEFAULT_SIDEBAR_SIZE,
        activeItem: {
          type: itemTypes.TASK,
          id: 2
        }
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
          id: 0
        },
        sidebarSize: DEFAULT_SIDEBAR_SIZE,
        activeItem: {
          type: itemTypes.TASK,
          id: 2
        }
      })
      const action = {
        type: actionTypes.SET_SELECTED_SECTION,
        section: {
          type: sectionTypes.PROJECT,
          id: 0
        }
      }
      const nextState = fromJS({
        selectedSection: {
          type: sectionTypes.PROJECT,
          id: 0
        },
        sidebarSize: DEFAULT_SIDEBAR_SIZE,
        activeItem: {
          type: itemTypes.TASK,
          id: 2
        }
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
        activeItem: {
          type: itemTypes.TASK,
          id: 2
        }
      })
      const action = {
        type: actionTypes.SET_SIDEBAR_SIZE
      }
      const nextState = fromJS({
        activeItem: {
          type: itemTypes.TASK,
          id: 2
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_SIDEBAR_SIZE', () => {
      const initialState = fromJS({
        sidebarSize: '180px',
        activeItem: {
          type: itemTypes.TASK,
          id: 2
        }
      })
      const action = {
        type: actionTypes.SET_SIDEBAR_SIZE,
        sidebarSize: '190px'
      }
      const nextState = fromJS({
        sidebarSize: '190px',
        activeItem: {
          type: itemTypes.TASK,
          id: 2
        }
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
        activeItem: 0,
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
        activeItem: 0,
        sidebarSize: DEFAULT_SIDEBAR_SIZE
      })
      const action = {
        type: actionTypes.SET_ACTIVE_ITEM,
        id: 2
      }
      const nextState = fromJS({
        activeItem: 2,
        sidebarSize: DEFAULT_SIDEBAR_SIZE
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_ACTIVE_ITEM with empty store', () => {
      const initialState = fromJS({})
      const action = {
        type: actionTypes.SET_ACTIVE_ITEM,
        id: 2
      }
      const nextState = fromJS({
        activeItem: 2
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
          id: 0
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
          id: 0
        },
        sidebarSize: DEFAULT_SIDEBAR_SIZE
      })
      const action = actionCreator.setEditingSection({
        type: sectionTypes.PROJECT,
        id: 2
      })
      const nextState = fromJS({
        editingSection: {
          type: sectionTypes.PROJECT,
          id: 2
        },
        sidebarSize: DEFAULT_SIDEBAR_SIZE
      })

      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle SET_EDITING_SECTION with empty store', () => {
      const initialState = fromJS({})
      const action = actionCreator.setEditingSection({
        type: sectionTypes.PROJECT,
        id: 2
      })
      const nextState = fromJS({
        editingSection: {
          type: sectionTypes.PROJECT,
          id: 2
        }
      })

      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })
  describe('Section Completed Latent Tasks', () => {
    describe('TOGGLE_TASK_COMPLETED_LATENCY', () => {
      it('Should handle TOGGLE_TASK_COMPLETED_LATENCY with empty state', () => {
        const initialState = fromJS({})
        const action = actionCreator.toggleTaskCompletedLatency(2)
        const nextState = fromJS({
          sectionCompletedLatentTasks: Set([2])
        })
        expect(reducer(initialState, action)).to.equal(nextState)
      })
      it('Should handle TOGGLE_TASK_COMPLETED_LATENCY with undefined latent list', () => {
        const initialState = fromJS({
          sectionCompletedLatentTasks: undefined
        })
        const action = actionCreator.toggleTaskCompletedLatency(2)
        const nextState = fromJS({
          sectionCompletedLatentTasks: Set([2])
        })
        expect(reducer(initialState, action)).to.equal(nextState)
      })
      it('Should handle TOGGLE_TASK_COMPLETED_LATENCY with existing latent list but without a task', () => {
        const initialState = fromJS({
          sectionCompletedLatentTasks: Set([0, 7])
        })
        const action = actionCreator.toggleTaskCompletedLatency(2)
        const nextState = fromJS({
          sectionCompletedLatentTasks: Set([0, 7, 2])
        })
        expect(reducer(initialState, action)).to.equal(nextState)
      })
      it('Should handle TOGGLE_TASK_COMPLETED_LATENCY with existing latent list but with a task', () => {
        const initialState = fromJS({
          sectionCompletedLatentTasks: Set([0, 7, 3, 5, 2, 4])
        })
        const action = actionCreator.toggleTaskCompletedLatency(2)
        const nextState = fromJS({
          sectionCompletedLatentTasks: Set([0, 7, 3, 5, 4])
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
          sectionCompletedLatentTasks: Set([0, 7, 2, 5])
        })
        const action = actionCreator.clearCompletedLatentTasks()
        const nextState = fromJS({})
        expect(reducer(initialState, action)).to.equal(nextState)
      })
    })
  })

  describe('Section Today Latent Tasks', () => {
    describe('TOGGLE_TASK_TODAY_LATENCY', () => {
      it('Should handle TOGGLE_TASK_TODAY_LATENCY with empty state', () => {
        const initialState = fromJS({})
        const action = actionCreator.toggleTaskTodayLatency(2)
        const nextState = fromJS({
          sectionTodayLatentTasks: Set([2])
        })
        expect(reducer(initialState, action)).to.equal(nextState)
      })
      it('Should handle TOGGLE_TASK_TODAY_LATENCY with undefined latent list', () => {
        const initialState = fromJS({
          sectionTodayLatentTasks: undefined
        })
        const action = actionCreator.toggleTaskTodayLatency(2)
        const nextState = fromJS({
          sectionTodayLatentTasks: Set([2])
        })
        expect(reducer(initialState, action)).to.equal(nextState)
      })
      it('Should handle TOGGLE_TASK_TODAY_LATENCY with existing latent list but without a task', () => {
        const initialState = fromJS({
          sectionTodayLatentTasks: Set([0, 7])
        })
        const action = actionCreator.toggleTaskTodayLatency(2)
        const nextState = fromJS({
          sectionTodayLatentTasks: Set([0, 7, 2])
        })
        expect(reducer(initialState, action)).to.equal(nextState)
      })
      it('Should handle TOGGLE_TASK_TODAY_LATENCY with existing latent list but with a task', () => {
        const initialState = fromJS({
          sectionTodayLatentTasks: Set([0, 7, 3, 5, 2, 4])
        })
        const action = actionCreator.toggleTaskTodayLatency(2)
        const nextState = fromJS({
          sectionTodayLatentTasks: Set([0, 7, 3, 5, 4])
        })
        expect(reducer(initialState, action)).to.equal(nextState)
      })
    })
    describe('CLEAR_TODAY_LATENT_TASKS', () => {
      it('Should handle CLEAR_TODAY_LATENT_TASKS with empty state', () => {
        const initialState = fromJS({})
        const action = actionCreator.clearTodayLatentTasks()
        expect(reducer(initialState, action)).to.equal(initialState)
      })
      it('Should handle CLEAR_TODAY_LATENT_TASKS with existing state', () => {
        const initialState = fromJS({
          sectionTodayLatentTasks: Set([0, 7, 2, 5])
        })
        const action = actionCreator.clearTodayLatentTasks()
        const nextState = fromJS({})
        expect(reducer(initialState, action)).to.equal(nextState)
      })
    })
  })
})
