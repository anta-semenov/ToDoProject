import { expect } from 'chai'
import { List, fromJS, Set } from 'immutable'
import reducer from '../../src/reducer/task'
import * as types from '../../src/constants/actionTypes'
import { NEW_TASK_TITLE } from '../../src/constants/defaults'
import { PRIORITY_NONE } from '../../src/constants/priorityLevels'

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
    it('Should handle ADD_TASK with empty store', () => {
      const initialState = List()
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
      const initialState = fromJS([
        {
          id: 0,
          title: 'Existing Task',
          completed: false,
          today: false
        },
        {
          id: 1,
          title: 'New Task',
          completed: false,
          today: false
        }
      ])
      const action = {
        type: types.SET_TASK_TODAY,
        id: 1,
        status: true
      }
      const nextState = fromJS([
        {
          id: 0,
          title: 'Existing Task',
          completed: false,
          today: false
        },
        {
          id: 1,
          title: 'New Task',
          completed: false,
          today: true
        }
      ])
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle SET_TASK_TODAY with today true', () => {
      const initialState = fromJS([
        {
          id: 0,
          title: 'Existing Task',
          completed: false,
          today: false
        },
        {
          id: 1,
          title: 'New Task',
          completed: false,
          today: true
        }
      ])
      const action = {
        type: types.SET_TASK_TODAY,
        id: 1,
        status: true
      }
      const nextState = fromJS([
        {
          id: 0,
          title: 'Existing Task',
          completed: false,
          today: false
        },
        {
          id: 1,
          title: 'New Task',
          completed: false,
          today: true
        }
      ])
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle SET_TASK_TODAY with today true and empty status', () => {
      const initialState = fromJS([
        {
          id: 0,
          title: 'Existing Task',
          completed: false,
          today: false
        },
        {
          id: 1,
          title: 'New Task',
          completed: false,
          today: true
        }
      ])
      const action = {
        type: types.SET_TASK_TODAY,
        id: 1
      }
      const nextState = fromJS([
        {
          id: 0,
          title: 'Existing Task',
          completed: false,
          today: false
        },
        {
          id: 1,
          title: 'New Task',
          completed: false,
          today: false
        }
      ])
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle SET_TASK_TODAY with today task', () => {
      const initialState = fromJS([
        {
          id: 0,
          title: 'Existing Task',
          completed: false,
          today: false
        },
        {
          id: 1,
          title: 'New Task',
          completed: false,
          today: true
        }
      ])
      const action = {
        type: types.SET_TASK_TODAY,
        id: 1,
        status: false
      }
      const nextState = fromJS([
        {
          id: 0,
          title: 'Existing Task',
          completed: false,
          today: false
        },
        {
          id: 1,
          title: 'New Task',
          completed: false,
          today: false
        }
      ])
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle SET_TASK_TODAY with today false', () => {
      const initialState = fromJS([
        {
          id: 0,
          title: 'Existing Task',
          completed: false,
          today: false
        },
        {
          id: 1,
          title: 'New Task',
          completed: false,
          today: false
        }
      ])
      const action = {
        type: types.SET_TASK_TODAY,
        id: 1,
        status: false
      }
      const nextState = fromJS([
        {
          id: 0,
          title: 'Existing Task',
          completed: false,
          today: false
        },
        {
          id: 1,
          title: 'New Task',
          completed: false,
          today: false
        }
      ])
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle SET_TASK_TODAY with today false and empty status', () => {
      const initialState = fromJS([
        {
          id: 0,
          title: 'Existing Task',
          completed: false,
          today: false
        },
        {
          id: 1,
          title: 'New Task',
          completed: false,
          today: false
        }
      ])
      const action = {
        type: types.SET_TASK_TODAY,
        id: 1
      }
      const nextState = fromJS([
        {
          id: 0,
          title: 'Existing Task',
          completed: false,
          today: false
        },
        {
          id: 1,
          title: 'New Task',
          completed: false,
          today: false
        }
      ])
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })

  describe('Project', () => {
    it('Should handle ADD_TASK_TO_PROJECT without any project', () => {
      const initialState = fromJS([
        {
          id: 0,
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 1
        },
        {
          id: 1,
          title: 'New Task',
          completed: false,
          today: false
        }
      ])
      const action = {
        type: types.ADD_TASK_TO_PROJECT,
        id: 1,
        project: 1
      }
      const nextState = fromJS([
        {
          id: 0,
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 1
        },
        {
          id: 1,
          title: 'New Task',
          completed: false,
          today: false,
          project: 1
        }
      ])
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle ADD_TASK_TO_PROJECT with existing project', () => {
      const initialState = fromJS([
        {
          id: 0,
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 1
        },
        {
          id: 1,
          title: 'New Task',
          completed: false,
          today: false,
          project: 1
        }
      ])
      const action = {
        type: types.ADD_TASK_TO_PROJECT,
        id: 1,
        project: 2
      }
      const nextState = fromJS([
        {
          id: 0,
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 1
        },
        {
          id: 1,
          title: 'New Task',
          completed: false,
          today: false,
          project: 2
        }
      ])
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle ADD_TASK_TO_PROJECT to an empty project', () => {
      const initialState = fromJS([
        {
          id: 0,
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 1
        },
        {
          id: 1,
          title: 'New Task',
          completed: false,
          today: false,
          project: 1
        }
      ])
      const action = {
        type: types.ADD_TASK_TO_PROJECT,
        id: 1,
        project: undefined
      }
      const nextState = fromJS([
        {
          id: 0,
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 1
        },
        {
          id: 1,
          title: 'New Task',
          completed: false,
          today: false
        }
      ])
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })

  describe('Context', () => {
    //context
    it('Should handle ADD_TASK_CONTEXT with no context', () => {
      const initialState = fromJS([
        {
          id: 1,
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 1
        }
      ])
      const action = {
        type: types.ADD_TASK_CONTEXT,
        id: 1,
        context: 1
      }
      const nextState = fromJS([
        {
          id: 1,
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 1,
          contexts: Set([1])
        }
      ])
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle ADD_TASK_CONTEXT with existing contexts', () => {
      const initialState = fromJS([
        {
          id: 1,
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 1,
          contexts: Set([1])
        }
      ])
      const action = {
        type: types.ADD_TASK_CONTEXT,
        id: 1,
        context: 2
      }
      const nextState = fromJS([
        {
          id: 1,
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 1,
          contexts: Set([1, 2])
        }
      ])
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle ADD_TASK_CONTEXT with same contexts', () => {
      const initialState = fromJS([
        {
          id: 1,
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 1,
          contexts: Set([1])
        }
      ])
      const action = {
        type: types.ADD_TASK_CONTEXT,
        id: 1,
        context: 1
      }
      const nextState = fromJS([
        {
          id: 1,
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 1,
          contexts: Set([1])
        }
      ])
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle REMOVE_TASK_CONTEXT with empty context', () => {
      const initialState = fromJS([
        {
          id: 1,
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 1
        }
      ])
      const action = {
        type: types.REMOVE_TASK_CONTEXT,
        id: 1,
        context: 1
      }
      const nextState = fromJS([
        {
          id: 1,
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 1
        }
      ])
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle REMOVE_TASK_CONTEXT', () => {
      const initialState = fromJS([
        {
          id: 1,
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 1,
          contexts: Set([0, 2, 1, 3, 4])
        }
      ])
      const action = {
        type: types.REMOVE_TASK_CONTEXT,
        id: 1,
        context: 1
      }
      const nextState = fromJS([
        {
          id: 1,
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 1,
          contexts: Set([0, 2, 3, 4])
        }
      ])
      expect(reducer(initialState, action)).to.equal(nextState)
    })
    it('Should handle REMOVE_TASK_CONTEXT with wrong context', () => {
      const initialState = fromJS([
        {
          id: 1,
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 1,
          contexts: Set([1, 2])
        }
      ])
      const action = {
        type: types.REMOVE_TASK_CONTEXT,
        id: 1,
        context: 3
      }
      const nextState = fromJS([
        {
          id: 1,
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 1,
          contexts: Set([1, 2])
        }
      ])
      expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle REMOVE_TASK_CONTEXT for the last context', () => {
      const initialState = fromJS([
        {
          id: 1,
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 1,
          contexts: Set([1])
        }
      ])
      const action = {
        type: types.REMOVE_TASK_CONTEXT,
        id: 1,
        context: 1
      }
      const nextState = fromJS([
        {
          id: 1,
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 1
        }
      ])
      expect(reducer(initialState, action)).to.equal(nextState)
    })
  })
})
