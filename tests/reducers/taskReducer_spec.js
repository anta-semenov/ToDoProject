import { expect } from 'chai'
import { List, fromJS, Set } from 'immutable'
import reducer from '../../src/reducer/task'
import * as types from '../../src/constants/actionTypes'
import { NEW_TITLE } from '../../src/constants/defaults'
import { PRIORITY_NONE } from '../../src/constants/priorityLevels'

describe('Task reducer', () => {
  // Empty action
  it('Should return initial state', () => {
    const initialState = undefined
    const action = {}
    const nextState = fromJS([])
    expect(reducer(initialState, action)).to.equal(nextState)
  })
  it('Should return state for empty action', () => {
    const initialState = fromJS([
      {
        id: 0,
        title: 'Existing Task',
        completed: false,
        today: false,
        priority: PRIORITY_NONE
      }
    ])
    const action = {}
    expect(reducer(initialState, action)).to.equal(initialState)
  })


  //Add task
  it('Should handle ADD_TASK with empty action', () => {
    const initialState = List()
    const action = {
      type: types.ADD_TASK
    }
    const nextState = fromJS([
      {
        id: 0,
        title: NEW_TITLE,
        completed: false,
        today: false,
        priority: PRIORITY_NONE
      }
    ])
    expect(reducer(initialState, action)).to.equal(nextState)
  })
  it('Should handle ADD_TASK with empty store', () => {
    const initialState = List()
    const action = {
      type: types.ADD_TASK,
      properties: {
        title: 'Test Task',
        description: 'Task description'
      }
    }
    const nextState = fromJS([
      {
        id: 0,
        title: 'Test Task',
        description: 'Task description',
        completed: false,
        today: false,
        priority: PRIORITY_NONE

      }
    ])
    expect(reducer(initialState, action)).to.equal(fromJS(nextState))
  })
  it('Should handle ADD_TASK with not empty store', () => {
    const initialState = fromJS([
      {
        id: 0,
        title: 'Existing Task',
        completed: false,
        today: false
      }
    ])
    const action = {
      type: types.ADD_TASK,
      properties: {
        title: 'Test Task'
      }
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
        title: 'Test Task',
        completed: false,
        today: false,
        priority: PRIORITY_NONE
      }
    ])
    expect(reducer(initialState, action)).to.equal(nextState)
  })

  it('Should handle REMOVE_TASK', () => {
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
      type: types.REMOVE_TASK,
      id: 1
    }
    const nextState = fromJS([
      {
        id: 0,
        title: 'Existing Task',
        completed: false,
        today: false
      }
    ])
    expect(reducer(initialState, action)).to.equal(nextState)
  })

  it('Should handle REMOVE_TASK', () => {
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
      type: types.REMOVE_TASK,
      id: 3
    }
    expect(reducer(initialState, action)).to.equal(initialState)
  })

  it('Should handle EDIT_TASK', () => {
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
      type: types.EDIT_TASK,
      id: 1,
      properties: {
        title: 'Changed Task Tittle'
      }
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
        title: 'Changed Task Tittle',
        completed: false,
        today: false
      }
    ])
    expect(reducer(initialState, action)).to.equal(nextState)
  })

  it('Should handle COMPLETE_TASK', () => {
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
      type: types.COMPLETE_TASK,
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
        completed: true,
        today: false
      }
    ])
    expect(reducer(initialState, action)).to.equal(nextState)
  })

  it('Should handle COMPLETE_TASK with completed task', () => {
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
        completed: true,
        today: false
      }
    ])
    const action = {
      type: types.COMPLETE_TASK,
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
        today: true
      }
    ])
    expect(reducer(initialState, action)).to.equal(nextState)
  })

  it('Should handle SET_TASK_TODAY with completed task', () => {
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
        context: Set([1])
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
        context: Set([1])
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
        context: Set([1, 2])
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
        context: Set([1])
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
        context: Set([1])
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
        context: Set([1, 2])
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
        context: Set([2])
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
        context: Set([1, 2])
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
        context: Set([1, 2])
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
        context: Set([1])
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
