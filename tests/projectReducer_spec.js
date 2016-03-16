import expect from 'expect'
import { List, fromJS } from 'immutable'
import reducer from '../Reducer/Project'
import * as actionTypes from '../constants/ActionTypes'

describe('Project reducer', () => {
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
                title: 'Existing Project',
                completed: false
            }
        ])
        const action = {}
        expect(reducer(initialState, action)).toEqual(fromJS(initialState))
    })

    it('Should handle ADD_PROJECT with empty action', () => {
        const initialState = List()
        const action = {
            type: types.ADD_PROJECT
        }
        const nextState = from([
            {
                id: 0,
                title: 'New Project',
                completed: false
            }
        ])
        expect(reducer(initialState, action)).toEqual(fromJS(nextState))
    })
    it('Should handle ADD_PROJECT with empty store', () => {
        const initialState = List()
        const action = {
            type: types.ADD_PROJECT,
            properties: {
                title: 'New Project',
                description: 'Project description'
            }
        }
        const nextState = from([
            {
                id: 0,
                title: 'New Project',
                description: 'Project description',
                completed: false
            }
        ])
        expect(reducer(initialState, action)).toEqual(fromJS(nextState))
    })
    it('Should handle ADD_PROJECT with not empty store', () => {
        const initialState = fromJS([
            {
                id: 0,
                title: 'Existing Project',
                completed: false
            }
        ])
        const action = {
            type: types.ADD_PROJECT,
            properties: {
                title: 'New Project'
            }
        }
        const nextState = fromJS([
            {
                id: 0,
                title: 'Existing Project',
                completed: false
            },
            {
                id: 1,
                title: 'New Project',
                completed: false
            }
        ])
        expect(reducer(initialState, action)).toEqual(nextState)
    })

    it('Should handle REMOVE_PROJECT', () => {
        const initialState = fromJS([
            {
                id: 0,
                title: 'Existing Project',
                completed: false
            },
            {
                id: 1,
                title: 'New Project',
                completed: false
            }
        ])
        const action = {
            type: types.REMOVE_PROJECT,
            id: 1
        }
        const nextState = fromJS([
            {
                id: 0,
                title: 'Existing Project',
                completed: false
            }
        ])
        expect(reducer(initialState, action)).toEqual(nextState)
    })

    it('Should handle EDIT_PROJECT', () => {
        const initialState = fromJS([
            {
                id: 0,
                title: 'Existing Project',
                completed: false
            },
            {
                id: 1,
                title: 'New Project',
                completed: false
            }
        ])
        const action = {
            type: types.EDIT_PROJECT,
            id: 1,
            properties: {
                title: 'Changed Project Tittle'
            }
        }
        const nextState = fromJS([
            {
                id: 0,
                title: 'Existing Project',
                completed: false
            },
            {
                id: 1,
                title: 'Changed Project Tittle',
                completed: false
            }
        ])
        expect(reducer(initialState, action)).toEqual(nextState)
    })

    it('Should handle COMPLETE_PROJECT', () => {
        const initialState = fromJS([
            {
                id: 0,
                title: 'Existing Project',
                completed: false
            },
            {
                id: 1,
                title: 'New Project',
                completed: false
            }
        ])
        const action = {
            type: types.COMPLETE_PROJECT,
            id: 1
        }
        const nextState = fromJS([
            {
                id: 0,
                title: 'Existing Project',
                completed: false
            },
            {
                id: 1,
                title: 'New Project',
                completed: true
            }
        ])
        expect(reducer(initialState, action)).toEqual(nextState)
    })
})
