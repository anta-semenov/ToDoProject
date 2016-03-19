import { expect } from 'chai'
import { fromJS } from 'immutable'
import reducer from '../../src/reducer/uiState'
import * as actionTypes from '../../src/constants/actionTypes'
import { DEFAULT_SIDEBAR_SIZE } from '../../src/constants/defaults'
import * as sectionTypes from '../../src/constants/sectionTypes'
import * as itemTypes from '../../src/constants/itemTypes'

describe('UI state reducer', () => {
  it('Should return initial state', () => {
    const initialState = undefined
    const action = {}
    const nextState = fromJS({})
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
        section: sectionTypes.PROJECTS
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
        section: sectionTypes.PROJECTS
      }
      const nextState = fromJS({
        selectedSection: {
          type: sectionTypes.PROJECTS
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
    it('Should handle SET_SELECTED_SECTION with empty store', () => {
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
        activeItem: {
          type: itemTypes.TASK,
          id: 0
        },
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
        activeItem: {
          type: itemTypes.TASK,
          id: 0
        },
        sidebarSize: DEFAULT_SIDEBAR_SIZE
      })
      const action = {
        type: actionTypes.SET_ACTIVE_ITEM,
        activeItem: {
          type: itemTypes.TASK,
          id: 2
        }
      }
      const nextState = fromJS({
        activeItem: {
          type: itemTypes.TASK,
          id: 2
        },
        sidebarSize: DEFAULT_SIDEBAR_SIZE
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SET_SELECTED_SECTION with empty store', () => {
      const initialState = fromJS({})
      const action = {
        type: actionTypes.SET_ACTIVE_ITEM,
        activeItem: {
          type: itemTypes.TASK,
          id: 2
        }
      }
      const nextState = fromJS({
        activeItem: {
          type: itemTypes.TASK,
          id: 2
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })
})