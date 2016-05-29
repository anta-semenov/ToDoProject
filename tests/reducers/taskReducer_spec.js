import { expect } from 'chai'
import { fromJS, Set } from 'immutable'
import reducer from '../../src/reducer/task'
import * as types from '../../src/constants/actionTypes'
import { NEW_TASK_TITLE } from '../../src/constants/defaults'
import { PRIORITY_NONE } from '../../src/constants/priorityLevels'
import * as commonActions from '../../src/actions/commonActions'

describe('Task reducer', () => {
  // Empty action
  it('Should return initial state', () => {
    const initialState = undefined
    const action = {}
    const nextState = fromJS({})
    expect(reducer(initialState, action)).to.equal(nextState)
  })
  it('should return state for empty action', () => {
    const initialState = fromJS({
      'b41sogy3s0oc': {
        id: 'b41sogy3s0oc',
        title: 'Existing Task',
        completed: false,
        today: false,
        priority: PRIORITY_NONE
      }
    })
    const action = {}
    expect(reducer(initialState, action)).to.equal(initialState)
  })

  //Add task
  describe('Add task', () => {
    it('should handle ADD_TASK with empty action', () => {
      const initialState = fromJS({})
      const action = {
        type: types.ADD_TASK
      }
      const nextState = fromJS({})
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle ADD_TASK with only id in properties', () => {
      const initialState = fromJS({})
      const action = {
        type: types.ADD_TASK,
        properties: {
          id: 'b41sogy3s0oc'
        }
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: NEW_TASK_TITLE,
          completed: false,
          today: false,
          priority: PRIORITY_NONE
        }
      })
      expect(reducer(initialState, action)).to.equal(fromJS(nextState))
    })
    it('Should handle ADD_TASK with empty store', () => {
      const initialState = fromJS({})
      const action = {
        type: types.ADD_TASK,
        properties: {
          id: 'b41sogy3s0oc',
          title: 'Test Task',
          description: 'Task description'
        }
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Test Task',
          description: 'Task description',
          completed: false,
          today: false,
          priority: PRIORITY_NONE
        }
      })
      expect(reducer(initialState, action)).to.equal(fromJS(nextState))
    })
    it('Should handle ADD_TASK with not empty store', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        }
      })
      const action = {
        type: types.ADD_TASK,
        properties: {
          id: 'b41sogy3s0ok',
          title: 'Test Task'
        }
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'Test Task',
          completed: false,
          today: false,
          priority: PRIORITY_NONE
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should add nothing when properties do not content id', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        }
      })
      const action = {
        type: types.ADD_TASK,
        properties: {
          title: 'Test Task'
        }
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should do nothing when add task with existind id', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'Test Task',
          completed: false,
          today: false,
          priority: PRIORITY_NONE
        }
      })
      const action = {
        type: types.ADD_TASK,
        properties: {
          id: 'b41sogy3s0ok',
          title: 'New Test Task',
          today: true
        }
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'Test Task',
          completed: false,
          today: false,
          priority: PRIORITY_NONE
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should convert context properties to Set, if it is not instance of Set', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        }
      })
      const action = {
        type: types.ADD_TASK,
        properties: {
          id: 'b41sogy3s0ok',
          title: 'Test Task',
          context: ['a91sogy3s0o0','a91sogy3s0o1']
        }
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'Test Task',
          completed: false,
          today: false,
          priority: PRIORITY_NONE,
          context: Set(['a91sogy3s0o0','a91sogy3s0o1'])
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })

  describe('Remove task', () => {
    it('Should handle REMOVE_TASK', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      const action = {
        type: types.REMOVE_TASK,
        id: 'b41sogy3s0ok'
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle REMOVE_TASK with wrong id', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      const action = {
        type: types.REMOVE_TASK,
        id: 'b41sogy4s0ok'
      }
      expect(reducer(initialState, action)).to.equal(initialState)
    })
  })

  describe('Edit task', () => {
    it('Should handle EDIT_TASK', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      const action = {
        type: types.EDIT_TASK,
        id: 'b41sogy3s0ok',
        properties: {
          title: 'Changed Task Tittle'
        }
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'Changed Task Tittle',
          completed: false,
          today: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle EDIT_TASK when id changed', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      const action = {
        type: types.EDIT_TASK,
        id: 'b41sogy3s0ok',
        properties: {
          id: 'b41sogy4s0ok',
          title: 'Changed Task Tittle'
        }
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy4s0ok: {
          id: 'b41sogy4s0ok',
          title: 'Changed Task Tittle',
          completed: false,
          today: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should do nothing when id changed and new id already exist', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      const action = {
        type: types.EDIT_TASK,
        id: 'b41sogy3s0ok',
        properties: {
          id: 'b41sogy3s0oc',
          title: 'Changed Task Tittle'
        }
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should convert context properties to Set if new properties have it', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      const action = {
        type: types.EDIT_TASK,
        id: 'b41sogy3s0ok',
        properties: {
          title: 'Changed Task Tittle',
          context: ['a91sogy3s0o0','a91sogy3s0o1']
        }
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'Changed Task Tittle',
          completed: false,
          today: false,
          context: Set(['a91sogy3s0o0','a91sogy3s0o1'])
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })

  describe('Complete', () => {
    it('Should handle COMPLETE_TASK', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      const action = {
        type: types.COMPLETE_TASK,
        id: 'b41sogy3s0ok',
        status: true
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'New Task',
          completed: true,
          today: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle COMPLETE_TASK already completed', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'New Task',
          completed: true,
          today: false
        }
      })
      const action = {
        type: types.COMPLETE_TASK,
        id: 'b41sogy3s0ok',
        status: true
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'New Task',
          completed: true,
          today: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle COMPLETE_TASK already completed and empty status', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'New Task',
          completed: true,
          today: false
        }
      })
      const action = {
        type: types.COMPLETE_TASK,
        id: 'b41sogy3s0ok'
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle COMPLETE_TASK with completed task', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'New Task',
          completed: true,
          today: false
        }
      })
      const action = {
        type: types.COMPLETE_TASK,
        id: 'b41sogy3s0ok',
        status: false
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle COMPLETE_TASK with uncompleted task', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      const action = {
        type: types.COMPLETE_TASK,
        id: 'b41sogy3s0ok',
        status: false
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle COMPLETE_TASK with uncompleted task and empty status', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      const action = {
        type: types.COMPLETE_TASK,
        id: 'b41sogy3s0ok'
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })

  describe('Today', () => {
    it('Should handle SET_TASK_TODAY', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0om: {
          id: 'b41sogy3s0om',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      const action = {
        type: types.SET_TASK_TODAY,
        id: 'b41sogy3s0om',
        status: true
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0om: {
          id: 'b41sogy3s0om',
          title: 'New Task',
          completed: false,
          today: true
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle SET_TASK_TODAY with today true', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0om: {
          id: 'b41sogy3s0om',
          title: 'New Task',
          completed: false,
          today: true
        }
      })
      const action = {
        type: types.SET_TASK_TODAY,
        id: 'b41sogy3s0om',
        status: true
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0om: {
          id: 'b41sogy3s0om',
          title: 'New Task',
          completed: false,
          today: true
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle SET_TASK_TODAY with today true and empty status', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0om: {
          id: 'b41sogy3s0om',
          title: 'New Task',
          completed: false,
          today: true
        }
      })
      const action = {
        type: types.SET_TASK_TODAY,
        id: 'b41sogy3s0om'
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0om: {
          id: 'b41sogy3s0om',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle SET_TASK_TODAY with today task', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0om: {
          id: 'b41sogy3s0om',
          title: 'New Task',
          completed: false,
          today: true
        }
      })
      const action = {
        type: types.SET_TASK_TODAY,
        id: 'b41sogy3s0om',
        status: false
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0om: {
          id: 'b41sogy3s0om',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle SET_TASK_TODAY with today false', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0om: {
          id: 'b41sogy3s0om',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      const action = {
        type: types.SET_TASK_TODAY,
        id: 'b41sogy3s0om',
        status: false
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0om: {
          id: 'b41sogy3s0om',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle SET_TASK_TODAY with today false and empty status', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0om: {
          id: 'b41sogy3s0om',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      const action = {
        type: types.SET_TASK_TODAY,
        id: 'b41sogy3s0om'
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        },
        b41sogy3s0om: {
          id: 'b41sogy3s0om',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })

  describe('Project', () => {
    it('Should handle ADD_TASK_TO_PROJECT without any project', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        },
        b41sogy3s0om: {
          id: 'b41sogy3s0om',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      const action = {
        type: types.ADD_TASK_TO_PROJECT,
        id: 'b41sogy3s0om',
        project: 'bh52ogy5s0fm'
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        },
        b41sogy3s0om: {
          id: 'b41sogy3s0om',
          title: 'New Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle ADD_TASK_TO_PROJECT with existing project', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        },
        b41sogy3s0om: {
          id: 'b41sogy3s0om',
          title: 'New Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        }
      })
      const action = {
        type: types.ADD_TASK_TO_PROJECT,
        id: 'b41sogy3s0om',
        project: 'bh32ogy7s0fm'
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        },
        b41sogy3s0om: {
          id: 'b41sogy3s0om',
          title: 'New Task',
          completed: false,
          today: false,
          project: 'bh32ogy7s0fm'
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle ADD_TASK_TO_PROJECT to an empty project', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        },
        b41sogy3s0om: {
          id: 'b41sogy3s0om',
          title: 'New Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        }
      })
      const action = {
        type: types.ADD_TASK_TO_PROJECT,
        id: 'b41sogy3s0om',
        project: undefined
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        },
        b41sogy3s0om: {
          id: 'b41sogy3s0om',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })


  //context
  describe('Context', () => {
    it('Should handle ADD_TASK_CONTEXT with no context', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        }
      })
      const action = {
        type: types.ADD_TASK_CONTEXT,
        id: 'b41sogy3s0oc',
        context: '6f1sobz3s0oc'
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: Set(['6f1sobz3s0oc'])
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle ADD_TASK_CONTEXT with existing contexts', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: Set(['6f1sobz3s0oc'])
        }
      })
      const action = {
        type: types.ADD_TASK_CONTEXT,
        id: 'b41sogy3s0oc',
        context: '6c1sobz9s0oc'
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: Set(['6f1sobz3s0oc', '6c1sobz9s0oc'])
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle ADD_TASK_CONTEXT with same contexts', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: Set(['6f1sobz3s0oc'])
        }
      })
      const action = {
        type: types.ADD_TASK_CONTEXT,
        id: 'b41sogy3s0oc',
        context: '6f1sobz3s0oc'
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: Set(['6f1sobz3s0oc'])
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle REMOVE_TASK_CONTEXT with empty context', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        }
      })
      const action = {
        type: types.REMOVE_TASK_CONTEXT,
        id: 'b41sogy3s0oc',
        context: '6f1sobz3s0oc'
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle REMOVE_TASK_CONTEXT', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: Set(['6f1sobz3s0oc', '6c1sobz9s0oc', '2f1s7bz9s0ol', '2j1s7bz9s0ol'])
        }
      })
      const action = {
        type: types.REMOVE_TASK_CONTEXT,
        id: 'b41sogy3s0oc',
        context: '6c1sobz9s0oc'
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: Set(['6f1sobz3s0oc', '2f1s7bz9s0ol', '2j1s7bz9s0ol'])
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle REMOVE_TASK_CONTEXT with wrong context', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: Set(['6f1sobz3s0oc', '6c1sobz9s0oc', '2f1s7bz9s0ol', '2j1s7bz9s0ol'])
        }
      })
      const action = {
        type: types.REMOVE_TASK_CONTEXT,
        id: 'b41sogy3s0oc',
        context: '8f1sobz3s0oc'
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: Set(['6f1sobz3s0oc', '6c1sobz9s0oc', '2f1s7bz9s0ol', '2j1s7bz9s0ol'])
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle REMOVE_TASK_CONTEXT for the last context', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: Set(['6f1sobz3s0oc'])
        }
      })
      const action = {
        type: types.REMOVE_TASK_CONTEXT,
        id: 'b41sogy3s0oc',
        context: '6f1sobz3s0oc'
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SWITCH_TASK_CONTEXT to add context for task with no contexts', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        }
      })
      const action = {
        type: types.SWITCH_TASK_CONTEXT,
        id: 'b41sogy3s0oc',
        context: '6f1sobz3s0oc'
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: Set(['6f1sobz3s0oc'])
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SWITCH_TASK_CONTEXT to add context for task with existing contexts', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: Set(['406s5gokjy0'])
        }
      })
      const action = {
        type: types.SWITCH_TASK_CONTEXT,
        id: 'b41sogy3s0oc',
        context: '6f1sobz3s0oc'
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: Set(['406s5gokjy0', '6f1sobz3s0oc'])
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SWITCH_TASK_CONTEXT to remove context from task', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: Set(['406s5gokjy0', '6f1sobz3s0oc'])
        }
      })
      const action = {
        type: types.SWITCH_TASK_CONTEXT,
        id: 'b41sogy3s0oc',
        context: '6f1sobz3s0oc'
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: Set(['406s5gokjy0'])
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle SWITCH_TASK_CONTEXT to remove last context from task', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: Set(['6f1sobz3s0oc'])
        }
      })
      const action = {
        type: types.SWITCH_TASK_CONTEXT,
        id: 'b41sogy3s0oc',
        context: '6f1sobz3s0oc'
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        }
      })
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })

  describe('Set state', () => {
    it('Should handle set state', () => {
      const initialState = fromJS({
        'b41sogy3s0oc': {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          priority: PRIORITY_NONE
        }
      })

      const newState = fromJS({
        task: {
          b41sogy3s0o1: {
            id: 'b41sogy3s0o1',
            title: 'Test task 1'
          },
          b41sogy3s0o2: {
            id: 'b41sogy3s0o2',
            title: 'Test task 2'
          }
        },
        uiState: {
          selectedSection: {
            type: 'NEXT'
          }
        }
      })

      const nextState = fromJS({
        b41sogy3s0o1: {
          id: 'b41sogy3s0o1',
          title: 'Test task 1'
        },
        b41sogy3s0o2: {
          id: 'b41sogy3s0o2',
          title: 'Test task 2'
        }
      })

      const action = commonActions.setState(newState)

      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })
})
