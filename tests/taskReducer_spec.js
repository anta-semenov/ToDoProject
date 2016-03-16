import expect from 'expect'
import { List, fromJS } from 'immutable'
import reducer from '../reducer/Task'
import * as types from '../constants/actionTypes'

describe('Task reducer', () => {
    // Empty action
    it('Should return initial state', () => {
        const initialState = undefined
        const action = {}
        const nextState = fromJS([])
        expect(reducer(initialState, action)).toEqual(fromJS(nextState))
    })
    it('Should return state for empty action', () => {
        const initialState = fromJS([
            {
                id: 0,
                title: 'Existing Task',
                completed: false,
                today: false
            }
        ])
        const action = {}
        expect(reducer(initialState, action)).toEqual(fromJS(initialState))
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
                title: 'New Task',
                completed: false,
                today: false
            }
        ])
        expect(reducer(initialState, action)).toEqual(nextState)
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
                completet: false,
                today: false

            }
        ])
        expect(reducer(initialState, action)).toEqual(fromJS(nextState))
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
                today: false
            }
        ])
        expect(reducer(initialState, action)).toEqual(nextState)
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
        expect(reducer(initialState, action)).toEqual(nextState)
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
        expect(reducer(initialState, action)).toEqual(nextState)
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
        expect(reducer(initialState, action)).toEqual(nextState)
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
                completed: true,
                today: false,
                project: 1
            }
        ])
        expect(reducer(initialState, action)).toEqual(nextState)
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
                completed: true,
                today: false,
                project: 2
            }
        ])
        expect(reducer(initialState, action)).toEqual(nextState)
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
        expect(reducer(initialState, action)).toEqual(nextState)
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
                context: [1]
            }
        ])
        expect(reducer(initialState, action)).toEqual(nextState)
    })
    it('Should handle ADD_TASK_CONTEXT with existing contexts', () => {
        const initialState = fromJS([
            {
                id: 1,
                title: 'Existing Task',
                completed: false,
                today: false,
                project: 1,
                context: [1]
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
                context: [1, 2]
            }
        ])
        expect(reducer(initialState, action)).toEqual(nextState)
    })
    it('Should handle ADD_TASK_CONTEXT with same contexts', () => {
        const initialState = fromJS([
            {
                id: 1,
                title: 'Existing Task',
                completed: false,
                today: false,
                project: 1,
                context: [1]
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
                context: [1]
            }
        ])
        expect(reducer(initialState, action)).toEqual(nextState)
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
                project: 1
            }
        ])
        expect(reducer(initialState, action)).toEqual(nextState)
    })
    it('Should handle REMOVE_TASK_CONTEXT', () => {
        const initialState = fromJS([
            {
                id: 1,
                title: 'Existing Task',
                completed: false,
                today: false,
                project: 1,
                context: [1, 2]
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
                context: [2]
            }
        ])
        expect(reducer(initialState, action)).toEqual(nextState)
    })
    it('Should handle REMOVE_TASK_CONTEXT with wrong context', () => {
        const initialState = fromJS([
            {
                id: 1,
                title: 'Existing Task',
                completed: false,
                today: false,
                project: 1,
                context: [1, 2]
            }
        ])
        const action = {
            type: types.ADD_TASK_CONTEXT,
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
                context: [1, 2]
            }
        ])
        expect(reducer(initialState, action)).toEqual(nextState)
    })

})
