import { fromJS } from 'immutable'
import reducer from '../../src/reducer/task'
import * as types from '../../src/constants/actionTypes'
import { NEW_TASK_TITLE } from '../../src/constants/defaults'
import { PRIORITY_NONE } from '../../src/constants/priorityLevels'
import * as commonActions from '../../src/actions/commonActions'
import { removeProject, deleteProject } from '../../src/actions/projectActions'
import { removeContext } from '../../src/actions/contextActions'
import * as taskActions from '../../src/actions/taskActions'

describe('Task reducer', () => {
  // Empty action
  test('Should return initial state', () => {
    const initialState = undefined
    const action = {}
    const nextState = fromJS({})
    expect(reducer(initialState, action)).toEqual(nextState)
  })
  test('should return state for empty action', () => {
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
    expect(reducer(initialState, action)).toEqual(initialState)
  })
  describe('Add task', () => {
    test('should handle ADD_TASK with empty action', () => {
      const initialState = fromJS({})
      const action = {
        type: types.ADD_TASK
      }
      const nextState = fromJS({})
      expect(reducer(initialState, action)).toEqual(nextState)
    })
    test('Should handle ADD_TASK with only id in properties', () => {
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
          priority: PRIORITY_NONE,
          deleted: false,
          completedDeleted: false
        }
      })
      expect(reducer(initialState, action)).toEqual(fromJS(nextState))
    })
    test('Should handle ADD_TASK with empty store', () => {
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
          priority: PRIORITY_NONE,
          deleted: false,
          completedDeleted: false
        }
      })
      expect(reducer(initialState, action)).toEqual(fromJS(nextState))
    })
    test('Should handle ADD_TASK with not empty store', () => {
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
          priority: PRIORITY_NONE,
          deleted: false,
          completedDeleted: false
        }
      })
      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should add nothing when properties do not content id', () => {
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
      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should do nothing when add task with existind id', () => {
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
      expect(reducer(initialState, action)).toEqual(nextState)
    })
  })
  describe('Remove task', () => {
    test('Should handle REMOVE_TASK', () => {
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
      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should handle REMOVE_TASK with wrong id', () => {
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
      expect(reducer(initialState, action)).toEqual(initialState)
    })
  })
  describe('Edit task', () => {
    test('Should handle EDIT_TASK', () => {
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
      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should handle EDIT_TASK when id changed', () => {
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
      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should do nothing when id changed and new id already exist', () => {
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
      expect(reducer(initialState, action)).toEqual(nextState)
    })
  })
  describe('Replace task', () => {
    test('Should handle REPLACE_TASK with existing id', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          date: 1467259200000
        }
      })
      const action = {
        type: types.REPLACE_TASK,
        id: 'b41sogy3s0oc',
        newTask: {
          id: 'b41sogy3s0oc',
          title: 'Changed Task Tittle',
          completed: true,
          today: false
        }
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Changed Task Tittle',
          completed: true,
          today: false
        }
      })
      expect(reducer(initialState, action)).toEqual(nextState)
    })
  })

  describe('Delete task', () => {
    test('Should handle DELETE_TASK', () => {
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
      const action = taskActions.deleteTask('b41sogy3s0ok', true)
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
          today: false,
          deleted: true,
          completedDeleted: true
        }
      })
      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should handle DELETE_TASK already deleted', () => {
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
          today: false,
          deleted: true
        }
      })
      const action = taskActions.deleteTask('b41sogy3s0ok', true)
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
          today: false,
          deleted: true,
          completedDeleted: true
        }
      })
      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should handle DELETE_TASK with deleted task and empty status', () => {
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
          today: false,
          deleted: true
        }
      })
      const action = taskActions.deleteTask('b41sogy3s0ok')
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
          today: false,
          deleted: false,
          completedDeleted: false
        }
      })
      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should handle DELETE_TASK with deleted task', () => {
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
          today: false,
          deleted: true
        }
      })
      const action = taskActions.deleteTask('b41sogy3s0ok', false)
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
          today: false,
          deleted: false,
          completedDeleted: false
        }
      })
      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test(
      'Should handle DELETE_TASK without deleted property and status false',
      () => {
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
        const action = taskActions.deleteTask('b41sogy3s0ok', false)
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
            today: false,
            deleted: false,
            completedDeleted: false
          }
        })
        expect(reducer(initialState, action)).toEqual(nextState)
      }
    )

    test(
      'Should handle DELETE_TASK with delete property false and false status',
      () => {
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
            today: false,
            deleted: false
          }
        })
        const action = taskActions.deleteTask('b41sogy3s0ok', false)
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
            today: false,
            deleted: false,
            completedDeleted: false
          }
        })
        expect(reducer(initialState, action)).toEqual(nextState)
      }
    )

    test(
      'Should handle DELETE_TASK without delete property and empty status',
      () => {
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
        const action = taskActions.deleteTask('b41sogy3s0ok')
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
            today: false,
            deleted: false,
            completedDeleted: false
          }
        })
        expect(reducer(initialState, action)).toEqual(nextState)
      }
    )
  })

  describe('Complete', () => {
    test('Should handle COMPLETE_TASK', () => {
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
        status: true,
        date: 1467200092084
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
          today: false,
          completedDate: 1467200092084,
          completedDeleted: true
        }
      })
      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should handle COMPLETE_TASK already completed', () => {
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
          today: false,
          completedDate: 1467200092084
        }
      })
      const action = {
        type: types.COMPLETE_TASK,
        id: 'b41sogy3s0ok',
        status: true,
        date: 1468200092084
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
          completedDate: 1468200092084,
          today: false,
          completedDeleted: true
        }
      })
      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should handle COMPLETE_TASK already completed and empty status', () => {
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
          completedDate: 1468200092084,
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
          today: false,
          completedDeleted: false
        }
      })
      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should handle COMPLETE_TASK with completed task', () => {
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
          completedDate: 1468200092084,
          today: false
        }
      })
      const action = {
        type: types.COMPLETE_TASK,
        id: 'b41sogy3s0ok',
        status: false,
        date: undefined
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
          today: false,
          completedDeleted: false
        }
      })
      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should handle COMPLETE_TASK with uncompleted task', () => {
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
          today: false,
          completedDeleted: false
        }
      })
      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test(
      'Should handle COMPLETE_TASK with uncompleted task and empty status',
      () => {
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
            today: false,
            completedDeleted: false
          }
        })
        expect(reducer(initialState, action)).toEqual(nextState)
      }
    )
  })

  describe('Today', () => {
    test('Should handle SET_TASK_TODAY', () => {
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
      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should handle SET_TASK_TODAY with today true', () => {
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
      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should handle SET_TASK_TODAY with today true and empty status', () => {
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
      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should handle SET_TASK_TODAY with today task', () => {
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
      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should handle SET_TASK_TODAY with today false', () => {
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
      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should handle SET_TASK_TODAY with today false and empty status', () => {
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
      expect(reducer(initialState, action)).toEqual(nextState)
    })
  })

  describe('Project', () => {
    test('Should handle ADD_TASK_TO_PROJECT without any project', () => {
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
      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should handle ADD_TASK_TO_PROJECT with existing project', () => {
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
      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should handle ADD_TASK_TO_PROJECT to an empty project', () => {
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
      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should handle REMOVE_PROJECT action', () => {
      const initialState = fromJS({
        b41sogy3s0o1: {
          id: 'b41sogy3s0o1',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        },
        b41sogy3s0o2: {
          id: 'b41sogy3s0o2',
          title: 'New Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        },
        b41sogy3s0o3: {
          id: 'b41sogy3s0o3',
          title: 'New Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0f2'
        }
      })

      const action = removeProject('bh52ogy5s0fm')

      const nextState = fromJS({
        b41sogy3s0o3: {
          id: 'b41sogy3s0o3',
          title: 'New Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0f2'
        }
      })

      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should handle DELETE_PROJECT action without status', () => {
      const initialState = fromJS({
        b41sogy3s0o1: {
          id: 'b41sogy3s0o1',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        },
        b41sogy3s0o2: {
          id: 'b41sogy3s0o2',
          title: 'New Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        },
        b41sogy3s0o3: {
          id: 'b41sogy3s0o3',
          title: 'New Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0f2'
        }
      })

      const action = deleteProject('bh52ogy5s0fm')

      const nextState = fromJS({
        b41sogy3s0o1: {
          id: 'b41sogy3s0o1',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          deleted: false,
          completedDeleted: false
        },
        b41sogy3s0o2: {
          id: 'b41sogy3s0o2',
          title: 'New Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          deleted: false,
          completedDeleted: false
        },
        b41sogy3s0o3: {
          id: 'b41sogy3s0o3',
          title: 'New Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0f2'
        }
      })

      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should handle DELETE_PROJECT action with true status', () => {
      const initialState = fromJS({
        b41sogy3s0o1: {
          id: 'b41sogy3s0o1',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        },
        b41sogy3s0o2: {
          id: 'b41sogy3s0o2',
          title: 'New Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        },
        b41sogy3s0o3: {
          id: 'b41sogy3s0o3',
          title: 'New Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0f2'
        }
      })

      const action = deleteProject('bh52ogy5s0fm', true)

      const nextState = fromJS({
        b41sogy3s0o1: {
          id: 'b41sogy3s0o1',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          deleted: true,
          completedDeleted: true
        },
        b41sogy3s0o2: {
          id: 'b41sogy3s0o2',
          title: 'New Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          deleted: true,
          completedDeleted: true
        },
        b41sogy3s0o3: {
          id: 'b41sogy3s0o3',
          title: 'New Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0f2'
        }
      })

      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test('Should handle DELETE_PROJECT action with false status', () => {
      const initialState = fromJS({
        b41sogy3s0o1: {
          id: 'b41sogy3s0o1',
          title: 'Existing Task',
          completed: true,
          today: false,
          project: 'bh52ogy5s0fm'
        },
        b41sogy3s0o2: {
          id: 'b41sogy3s0o2',
          title: 'New Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        },
        b41sogy3s0o3: {
          id: 'b41sogy3s0o3',
          title: 'New Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0f2'
        }
      })

      const action = deleteProject('bh52ogy5s0fm', false)

      const nextState = fromJS({
        b41sogy3s0o1: {
          id: 'b41sogy3s0o1',
          title: 'Existing Task',
          completed: true,
          today: false,
          project: 'bh52ogy5s0fm',
          deleted: false,
          completedDeleted: true
        },
        b41sogy3s0o2: {
          id: 'b41sogy3s0o2',
          title: 'New Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          deleted: false,
          completedDeleted: false
        },
        b41sogy3s0o3: {
          id: 'b41sogy3s0o3',
          title: 'New Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0f2'
        }
      })

      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test(
      'Should handle DELETE_PROJECT action with true status and already deleted task',
      () => {
        const initialState = fromJS({
          b41sogy3s0o1: {
            id: 'b41sogy3s0o1',
            title: 'Existing Task',
            completed: false,
            today: false,
            project: 'bh52ogy5s0fm',
            deleted: true
          },
          b41sogy3s0o2: {
            id: 'b41sogy3s0o2',
            title: 'New Task',
            completed: false,
            today: false,
            project: 'bh52ogy5s0fm'
          },
          b41sogy3s0o3: {
            id: 'b41sogy3s0o3',
            title: 'New Task',
            completed: false,
            today: false,
            project: 'bh52ogy5s0f2'
          }
        })

        const action = deleteProject('bh52ogy5s0fm', true)

        const nextState = fromJS({
          b41sogy3s0o1: {
            id: 'b41sogy3s0o1',
            title: 'Existing Task',
            completed: false,
            today: false,
            project: 'bh52ogy5s0fm',
            deleted: true,
            completedDeleted: true
          },
          b41sogy3s0o2: {
            id: 'b41sogy3s0o2',
            title: 'New Task',
            completed: false,
            today: false,
            project: 'bh52ogy5s0fm',
            deleted: true,
            completedDeleted: true
          },
          b41sogy3s0o3: {
            id: 'b41sogy3s0o3',
            title: 'New Task',
            completed: false,
            today: false,
            project: 'bh52ogy5s0f2'
          }
        })

        expect(reducer(initialState, action)).toEqual(nextState)
      }
    )
  })

  //context
  describe('Context', () => {
    test('Should handle ADD_TASK_CONTEXT with no context', () => {
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
          contexts: ['6f1sobz3s0oc']
        }
      })
      expect(reducer(initialState, action)).toEqual(nextState)
    })
    test('Should handle ADD_TASK_CONTEXT with existing contexts', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: ['6f1sobz3s0oc']
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
          contexts: ['6f1sobz3s0oc', '6c1sobz9s0oc']
        }
      })
      expect(reducer(initialState, action)).toEqual(nextState)
    })
    test('Should handle ADD_TASK_CONTEXT with same contexts', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: ['6f1sobz3s0oc']
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
          contexts: ['6f1sobz3s0oc']
        }
      })
      expect(reducer(initialState, action)).toEqual(nextState)
    })
    test('Should handle REMOVE_TASK_CONTEXT with empty context', () => {
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
      expect(reducer(initialState, action)).toEqual(nextState)
    })
    test('Should handle REMOVE_TASK_CONTEXT', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: ['6f1sobz3s0oc', '6c1sobz9s0oc', '2f1s7bz9s0ol', '2j1s7bz9s0ol']
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
          contexts: ['6f1sobz3s0oc', '2f1s7bz9s0ol', '2j1s7bz9s0ol']
        }
      })
      expect(reducer(initialState, action)).toEqual(nextState)
    })
    test('Should handle REMOVE_TASK_CONTEXT with wrong context', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: ['6f1sobz3s0oc', '6c1sobz9s0oc', '2f1s7bz9s0ol', '2j1s7bz9s0ol']
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
          contexts: ['6f1sobz3s0oc', '6c1sobz9s0oc', '2f1s7bz9s0ol', '2j1s7bz9s0ol']
        }
      })
      expect(reducer(initialState, action)).toEqual(nextState)
    })
    test('Should handle REMOVE_TASK_CONTEXT for the last context', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: ['6f1sobz3s0oc']
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
      expect(reducer(initialState, action)).toEqual(nextState)
    })
    test(
      'Should handle SWITCH_TASK_CONTEXT to add context for task with no contexts',
      () => {
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
            contexts: ['6f1sobz3s0oc']
          }
        })
        expect(reducer(initialState, action)).toEqual(nextState)
      }
    )
    test(
      'Should handle SWITCH_TASK_CONTEXT to add context for task with existing contexts',
      () => {
        const initialState = fromJS({
          b41sogy3s0oc: {
            id: 'b41sogy3s0oc',
            title: 'Existing Task',
            completed: false,
            today: false,
            project: 'bh52ogy5s0fm',
            contexts: ['406s5gokjy0']
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
            contexts: ['406s5gokjy0', '6f1sobz3s0oc']
          }
        })
        expect(reducer(initialState, action)).toEqual(nextState)
      }
    )
    test('Should handle SWITCH_TASK_CONTEXT to remove context from task', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: ['406s5gokjy0', '6f1sobz3s0oc']
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
          contexts: ['406s5gokjy0']
        }
      })
      expect(reducer(initialState, action)).toEqual(nextState)
    })
    test(
      'Should handle SWITCH_TASK_CONTEXT to remove last context from task',
      () => {
        const initialState = fromJS({
          b41sogy3s0oc: {
            id: 'b41sogy3s0oc',
            title: 'Existing Task',
            completed: false,
            today: false,
            project: 'bh52ogy5s0fm',
            contexts: ['6f1sobz3s0oc']
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
        expect(reducer(initialState, action)).toEqual(nextState)
      }
    )

    test('Should handle REMOVE_CONTEXT', () => {
      const initialState = fromJS({
        b41sogy3s0o1: {
          id: 'b41sogy3s0o1',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: ['6f1sobz3s0oc']
        },
        b41sogy3s0o2: {
          id: 'b41sogy3s0o2',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: ['6f1sobz3s0oc', '6f1sobz3s0od']
        },
        b41sogy3s0o3: {
          id: 'b41sogy3s0o3',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: ['6f1sobz3s0od', '6f1sobz3s0ob']
        },
        b41sogy3s0o4: {
          id: 'b41sogy3s0o4',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        }
      })

      const action = removeContext('6f1sobz3s0oc')

      const nextState = fromJS({
        b41sogy3s0o1: {
          id: 'b41sogy3s0o1',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        },
        b41sogy3s0o2: {
          id: 'b41sogy3s0o2',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: ['6f1sobz3s0od']
        },
        b41sogy3s0o3: {
          id: 'b41sogy3s0o3',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm',
          contexts: ['6f1sobz3s0od', '6f1sobz3s0ob']
        },
        b41sogy3s0o4: {
          id: 'b41sogy3s0o4',
          title: 'Existing Task',
          completed: false,
          today: false,
          project: 'bh52ogy5s0fm'
        }
      })

      expect(reducer(initialState, action)).toEqual(nextState)
    })
  })

  describe('Set state', () => {
    test('Should handle set state without task field', () => {
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
        context: {
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
      const action = commonActions.setState(newState)

      expect(reducer(initialState, action)).toEqual(initialState)
    })
    test('Should handle set state with task field', () => {
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

      expect(reducer(initialState, action)).toEqual(nextState)
    })
  })
  describe('Task tracking', () => {
    test('Should handle START_TASK_TRACKING with empty state', () => {
      const action = {
        type: types.START_TASK_TRACKING,
        id: '40gnkhutsvo',
        startTime: 1467058902561
      }
      expect(reducer(fromJS({}), action)).toEqual(fromJS({}))
    })
    test('Should handle START_TASK_TRACKING with no task', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        }
      })
      const action = {
        type: types.START_TASK_TRACKING,
        id: '40gnkhutsvo',
        startTime: 1467058902561
      }
      expect(reducer(initialState, action)).toEqual(initialState)
    })
    test('Should handle START_TASK_TRACKING with task', () => {
      const initialState1 = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        }
      })
      const initialState2 = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          tracking: [
            {
              startTime: 1466957388121,
              endTime: 1467036315074
            }
          ]
        }
      })
      const action = {
        type: types.START_TASK_TRACKING,
        id: 'b41sogy3s0oc',
        startTime: 1467058902561
      }
      const nextState1 = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          tracking: [
            { startTime: 1467058902561 }
          ]
        }
      })
      const nextState2 = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          tracking: [
            {
              startTime: 1466957388121,
              endTime: 1467036315074
            },
            {
              startTime: 1467058902561
            }
          ]
        }
      })
      expect(reducer(initialState1, action)).toEqual(nextState1)
      expect(reducer(initialState2, action)).toEqual(nextState2)
    })
    test('Should handle STOP_TASK_TRACKING with no tracking task', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false
        }
      })
      const action = {
        type: types.STOP_TASK_TRACKING,
        endTime: 1467058902561
      }
      expect(reducer(initialState, action)).toEqual(initialState)
    })
    test('Should handle STOP_TASK_TRACKING with tracking task', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          tracking: [
            {
              startTime: 1466957388121
            }
          ]
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      const action = {
        type: types.STOP_TASK_TRACKING,
        id: 'b41sogy3s0oc',
        endTime: 1467058902561
      }
      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          today: false,
          tracking: [
            {
              startTime: 1466957388121,
              endTime: 1467058902561
            }
          ]
        },
        b41sogy3s0ok: {
          id: 'b41sogy3s0ok',
          title: 'New Task',
          completed: false,
          today: false
        }
      })
      expect(reducer(initialState, action)).toEqual(nextState)
    })
  })

  describe('Someday', () => {
    test('Should handle SET_TASK_SOMEDAY', () => {
      const initialState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          someday: false
        },
        b41sogy3s0om: {
          id: 'b41sogy3s0om',
          title: 'New Task',
          completed: false,
          someday: false
        }
      })

      const action = taskActions.setTaskSomeday('b41sogy3s0om', true)

      const nextState = fromJS({
        b41sogy3s0oc: {
          id: 'b41sogy3s0oc',
          title: 'Existing Task',
          completed: false,
          someday: false
        },
        b41sogy3s0om: {
          id: 'b41sogy3s0om',
          title: 'New Task',
          completed: false,
          someday: true,
          somedayDate: Date.now()
        }
      })

      expect(reducer(initialState, action)).toEqual(nextState)
    })

    test(
      'Should handle SET_TASK_SOMEDAY with someday true and true status',
      () => {
        const initialState = fromJS({
          b41sogy3s0oc: {
            id: 'b41sogy3s0oc',
            title: 'Existing Task',
            completed: false,
            someday: false
          },
          b41sogy3s0om: {
            id: 'b41sogy3s0om',
            title: 'New Task',
            completed: false,
            someday: true
          }
        })

        const action = taskActions.setTaskSomeday('b41sogy3s0om', true)

        const nextState = fromJS({
          b41sogy3s0oc: {
            id: 'b41sogy3s0oc',
            title: 'Existing Task',
            completed: false,
            someday: false
          },
          b41sogy3s0om: {
            id: 'b41sogy3s0om',
            title: 'New Task',
            completed: false,
            someday: true,
            somedayDate: Date.now()
          }
        })

        expect(reducer(initialState, action)).toEqual(nextState)
      }
    )

    test(
      'Should handle SET_TASK_SOMEDAY with someday true and empty status',
      () => {
        const initialState = fromJS({
          b41sogy3s0oc: {
            id: 'b41sogy3s0oc',
            title: 'Existing Task',
            completed: false,
            someday: false
          },
          b41sogy3s0om: {
            id: 'b41sogy3s0om',
            title: 'New Task',
            completed: false,
            someday: true
          }
        })

        const action = taskActions.setTaskSomeday('b41sogy3s0om')

        const nextState = fromJS({
          b41sogy3s0oc: {
            id: 'b41sogy3s0oc',
            title: 'Existing Task',
            completed: false,
            someday: false
          },
          b41sogy3s0om: {
            id: 'b41sogy3s0om',
            title: 'New Task',
            completed: false,
            someday: false
          }
        })

        expect(reducer(initialState, action)).toEqual(nextState)
      }
    )

    test(
      'Should handle SET_TASK_SOMEDAY with someday true and false status',
      () => {
        const initialState = fromJS({
          b41sogy3s0oc: {
            id: 'b41sogy3s0oc',
            title: 'Existing Task',
            completed: false,
            someday: false
          },
          b41sogy3s0om: {
            id: 'b41sogy3s0om',
            title: 'New Task',
            completed: false,
            someday: true
          }
        })

        const action = taskActions.setTaskSomeday('b41sogy3s0om', false)

        const nextState = fromJS({
          b41sogy3s0oc: {
            id: 'b41sogy3s0oc',
            title: 'Existing Task',
            completed: false,
            someday: false
          },
          b41sogy3s0om: {
            id: 'b41sogy3s0om',
            title: 'New Task',
            completed: false,
            someday: false
          }
        })

        expect(reducer(initialState, action)).toEqual(nextState)
      }
    )

    test(
      'Should handle SET_TASK_SOMEDAY with someday false and false status',
      () => {
        const initialState = fromJS({
          b41sogy3s0oc: {
            id: 'b41sogy3s0oc',
            title: 'Existing Task',
            completed: false,
            someday: false
          },
          b41sogy3s0om: {
            id: 'b41sogy3s0om',
            title: 'New Task',
            completed: false,
            someday: false
          }
        })

        const action = taskActions.setTaskSomeday('b41sogy3s0om', false)

        const nextState = fromJS({
          b41sogy3s0oc: {
            id: 'b41sogy3s0oc',
            title: 'Existing Task',
            completed: false,
            someday: false
          },
          b41sogy3s0om: {
            id: 'b41sogy3s0om',
            title: 'New Task',
            completed: false,
            someday: false
          }
        })

        expect(reducer(initialState, action)).toEqual(nextState)
      }
    )

    test(
      'Should handle SET_TASK_SOMEDAY with someday false and empty status',
      () => {
        const initialState = fromJS({
          b41sogy3s0oc: {
            id: 'b41sogy3s0oc',
            title: 'Existing Task',
            completed: false,
            someday: false
          },
          b41sogy3s0om: {
            id: 'b41sogy3s0om',
            title: 'New Task',
            completed: false,
            someday: false
          }
        })

        const action = taskActions.setTaskSomeday('b41sogy3s0om')

        const nextState = fromJS({
          b41sogy3s0oc: {
            id: 'b41sogy3s0oc',
            title: 'Existing Task',
            completed: false,
            someday: false
          },
          b41sogy3s0om: {
            id: 'b41sogy3s0om',
            title: 'New Task',
            completed: false,
            someday: false
          }
        })

        expect(reducer(initialState, action)).toEqual(nextState)
      }
    )
  })
})
