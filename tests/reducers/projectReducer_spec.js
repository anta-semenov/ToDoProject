import { expect } from 'chai'
import { fromJS } from 'immutable'
import reducer from '../../src/reducer/project'
import * as types from '../../src/constants/actionTypes'
import { NEW_PROJECT_TITLE } from '../../src/constants/defaults'
import * as commonActions from '../../src/actions/commonActions'
import { deleteProject } from '../../src/actions/projectActions'

describe('Project reducer', () => {
  it('Should return initial state', () => {
    const initialState = undefined
    const action = {}
    const nextState = fromJS({})
    expect(reducer(initialState, action)).to.equal(fromJS(nextState))
  })
  it('Should return state for empty action', () => {
    const initialState = fromJS({
      bh52ogy5s0fm: {
        id: 'bh52ogy5s0fm',
        title: 'Existing Project',
        completed: false
      }
    })
    const action = {}
    expect(reducer(initialState, action)).to.equal(fromJS(initialState))
  })

  describe('Add project', () => {
    it('Should handle ADD_PROJECT with empty action', () => {
      const initialState = fromJS({})
      const action = {
        type: types.ADD_PROJECT
      }
      const nextState = fromJS({})
      expect(reducer(initialState, action)).to.equal(fromJS(nextState))
    })
    it('Should handle ADD_PROJECT with only id in action properties', () => {
      const initialState = fromJS({})
      const action = {
        type: types.ADD_PROJECT,
        properties: {
          id: 'bh52ogy5s0fm'
        }
      }
      const nextState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: NEW_PROJECT_TITLE,
          completed: false,
          deleted: false,
          completedDeleted: false
        }
      })
      expect(reducer(initialState, action)).to.equal(fromJS(nextState))
    })
    it('Should handle ADD_PROJECT with empty store', () => {
      const initialState = fromJS({})
      const action = {
        type: types.ADD_PROJECT,
        properties: {
          id: 'bh52ogy5s0fm',
          title: 'New Custom Project',
          description: 'Project description'
        }
      }
      const nextState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'New Custom Project',
          description: 'Project description',
          completed: false,
          deleted: false,
          completedDeleted: false
        }
      })
      expect(reducer(initialState, action)).to.equal(fromJS(nextState))
    })
    it('Should handle ADD_PROJECT with not empty store', () => {
      const initialState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        }
      })
      const action = {
        type: types.ADD_PROJECT,
        properties: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project'
        }
      }
      const nextState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: false,
          deleted: false,
          completedDeleted: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should do nothing when no id in properties', () => {
      const initialState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        }
      })
      const action = {
        type: types.ADD_PROJECT,
        properties: {
          title: 'New Custom Project'
        }
      }
      const nextState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should do nothing when add context with existing id', () => {
      const initialState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'Changed Project Title',
          completed: false
        }
      })
      const action = {
        type: types.ADD_PROJECT,
        properties: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project'
        }
      }
      const nextState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'Changed Project Title',
          completed: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })

  describe('Remove project', () => {
    it('Should handle REMOVE_PROJECT', () => {
      const initialState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: false
        }
      })
      const action = {
        type: types.REMOVE_PROJECT,
        id: 'bh32ogy5s0fm'
      }
      const nextState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle REMOVE_PROJECT with wrong id', () => {
      const initialState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: false
        }
      })
      const action = {
        type: types.REMOVE_PROJECT,
        id: 'bh32ogy5s0fk'
      }
      expect(reducer(initialState, action)).to.equal(initialState)
    })
  })

  describe('Edit project', () => {
    it('Should handle EDIT_PROJECT', () => {
      const initialState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: false
        }
      })
      const action = {
        type: types.EDIT_PROJECT,
        id: 'bh32ogy5s0fm',
        properties: {
          title: 'Changed Project Tittle'
        }
      }
      const nextState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'Changed Project Tittle',
          completed: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle EDIT_PROJECT with new id', () => {
      const initialState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: false
        }
      })
      const action = {
        type: types.EDIT_PROJECT,
        id: 'bh32ogy5s0fm',
        properties: {
          id: 'bh3h8gy5s0fm',
          title: 'Changed Project Tittle'
        }
      }
      const nextState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh3h8gy5s0fm: {
          id: 'bh3h8gy5s0fm',
          title: 'Changed Project Tittle',
          completed: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should do nothing when new id already exist', () => {
      const initialState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: false
        }
      })
      const action = {
        type: types.EDIT_PROJECT,
        id: 'bh32ogy5s0fm',
        properties: {
          id: 'bh52ogy5s0fm',
          title: 'Changed Project Tittle'
        }
      }
      const nextState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })

  describe('Replace project', () => {
    it('Should handle REPLACE_PROJECT with existing id', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Project',
          completed: false
        }
      })
      const action = {
        type: types.REPLACE_PROJECT,
        id: 'b41sogy3s0oc',
        newProject: {
          id: 'b41sogy3s0oc',
          title: 'Changed Project Tittle',
          completed: true
        }
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Changed Project Tittle',
          completed: true
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })

  describe('Complete project', () => {
    it('Should handle COMPLETE_PROJECT', () => {
      const initialState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: false
        }
      })
      const action = {
        type: types.COMPLETE_PROJECT,
        id: 'bh32ogy5s0fm',
        status: true,
        date: 1467200092084
      }
      const nextState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: true,
          completedDate: 1467200092084,
          completedDeleted: true
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle COMPLETE_PROJECT with true status and true complete', () => {
      const initialState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: true,
          completedDate: 1467200092084
        }
      })
      const action = {
        type: types.COMPLETE_PROJECT,
        id: 'bh32ogy5s0fm',
        status: true,
        date: 1468200092084
      }
      const nextState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: true,
          completedDate: 1468200092084,
          completedDeleted: true
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle COMPLETE_PROJECT with false status and true complete', () => {
      const initialState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: true,
          completedDate: 1468200092084
        }
      })
      const action = {
        type: types.COMPLETE_PROJECT,
        id: 'bh32ogy5s0fm',
        status: false,
        date: undefined
      }
      const nextState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: false,
          completedDeleted: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle COMPLETE_PROJECT with false status and false complete', () => {
      const initialState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: false
        }
      })
      const action = {
        type: types.COMPLETE_PROJECT,
        id: 'bh32ogy5s0fm',
        status: false,
        date: undefined
      }
      const nextState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: false,
          completedDeleted: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle COMPLETE_PROJECT without status and true complete', () => {
      const initialState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: true,
          completedDate: 1468200092084
        }
      })
      const action = {
        type: types.COMPLETE_PROJECT,
        id: 'bh32ogy5s0fm'
      }
      const nextState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: false,
          completedDeleted: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle COMPLETE_PROJECT without status and false complete', () => {
      const initialState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: false
        }
      })
      const action = {
        type: types.COMPLETE_PROJECT,
        id: 'bh32ogy5s0fm'
      }
      const nextState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: false,
          completedDeleted: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })

  describe('Delete project', () => {
    it('Should handle DELETE_PROJECT with true status', () => {
      const initialState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: false
        }
      })
      const action = deleteProject('bh32ogy5s0fm', true)

      const nextState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: false,
          deleted: true,
          completedDeleted: true
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle DELETE_PROJECT with true status and true delete', () => {
      const initialState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: false,
          deleted: true
        }
      })
      const action = deleteProject('bh32ogy5s0fm', true)

      const nextState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: false,
          deleted: true,
          completedDeleted: true
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle DELETE_PROJECT with empty status and true delete', () => {
      const initialState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: false,
          deleted: true
        }
      })
      const action = deleteProject('bh32ogy5s0fm')

      const nextState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: false,
          deleted: false,
          completedDeleted: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle DELETE_PROJECT with false status', () => {
      const initialState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: true,
          deleted: true
        }
      })
      const action = deleteProject('bh32ogy5s0fm', false)

      const nextState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: true,
          deleted: false,
          completedDeleted: true
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle DELETE_PROJECT with false status and false delete', () => {
      const initialState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: false,
          deleted: false
        }
      })
      const action = deleteProject('bh32ogy5s0fm', false)

      const nextState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: false,
          deleted: false,
          completedDeleted: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle DELETE_PROJECT with empty status', () => {
      const initialState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: true
        }
      })
      const action = deleteProject('bh32ogy5s0fm')

      const nextState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        },
        bh32ogy5s0fm: {
          id: 'bh32ogy5s0fm',
          title: 'New Custom Project',
          completed: true,
          deleted: false,
          completedDeleted: true
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })

  describe('Set state', () => {
    it('Should handle SET_STATE action without project field', () => {
      const initialState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        }
      })
      const newState = fromJS({
        task: {
          bh52ogy5s0f1: {
            id: 'bh52ogy5s0f1',
            title: 'Existing Project 1',
            completed: false
          },
          bh52ogy5s0f2: {
            id: 'bh52ogy5s0f2',
            title: 'Existing Project 1',
            completed: false
          }
        },
        uiState: {
          selectedSection: {
            type: 'NEXT'
          }
        }
      })
      const action = commonActions.setState(newState)

      expect(reducer(initialState, action)).to.equal(initialState)
    })
    it('Should handle SET_STATE action with project field', () => {
      const initialState = fromJS({
        bh52ogy5s0fm: {
          id: 'bh52ogy5s0fm',
          title: 'Existing Project',
          completed: false
        }
      })

      const newState = fromJS({
        project: {
          bh52ogy5s0f1: {
            id: 'bh52ogy5s0f1',
            title: 'Existing Project 1',
            completed: false
          },
          bh52ogy5s0f2: {
            id: 'bh52ogy5s0f2',
            title: 'Existing Project 1',
            completed: false
          }
        },
        uiState: {
          selectedSection: {
            type: 'NEXT'
          }
        }
      })

      const nextState = fromJS({
        bh52ogy5s0f1: {
          id: 'bh52ogy5s0f1',
          title: 'Existing Project 1',
          completed: false
        },
        bh52ogy5s0f2: {
          id: 'bh52ogy5s0f2',
          title: 'Existing Project 1',
          completed: false
        }
      })

      const action = commonActions.setState(newState)

      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })
})
