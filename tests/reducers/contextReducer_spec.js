import { expect } from 'chai'
import { fromJS, Map } from 'immutable'
import reducer from '../../src/reducer/context'
import * as types from '../../src/constants/actionTypes'
import { NEW_CONTEXT_TITLE } from '../../src/constants/defaults'

describe('Context reducer', () => {
    it('Should return initial state', () => {
        const initialState = undefined
        const action = {}
        const nextState = fromJS({})
        expect(reducer(initialState, action)).to.equal(fromJS(nextState))
    })
    it('Should return state for empty action', () => {
        const initialState = Map([
          [
            0,
            fromJS({
              id: 0,
              title: 'Existing context'
            })
          ]
        ])
        const action = {}
        expect(reducer(initialState, action)).to.equal(fromJS(initialState))
    })

    it('Should handle ADD_CONTEXT with empty action', () => {
        const initialState = Map()
        const action = {
            type: types.ADD_CONTEXT
        }
        const nextState = Map([
          [
            0,
            fromJS({
              id: 0,
              title: NEW_CONTEXT_TITLE
            })
          ]
        ])
        expect(reducer(initialState, action)).to.equal(fromJS(nextState))
    })
    it('Should handle ADD_CONTEXT with empty store', () => {
        const initialState = Map()
        const action = {
            type: types.ADD_CONTEXT,
            properties: {
                title: 'New custom context'
            }
        }
        const nextState = Map([
          [
            0,
            fromJS({
              id: 0,
              title: 'New custom context'
            })
          ]
        ])
        expect(reducer(initialState, action)).to.equal(fromJS(nextState))
    })
    it('Should handle ADD_CONTEXT with not empty store', () => {
        const initialState = Map([
          [
            0,
            fromJS({
              id: 0,
              title: 'Existing context'
            })
          ]
        ])
        const action = {
            type: types.ADD_CONTEXT,
            properties: {
                title: 'New custom context'
            }
        }
        const nextState = Map([
          [
            0,
            fromJS({
              id: 0,
              title: 'Existing context'
            })
          ],
          [
            1,
            fromJS({
              id: 1,
              title: 'New custom context'
            })
          ]
        ])
        expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle REMOVE_CONTEXT', () => {
        const initialState = Map([
          [
            0,
            fromJS({
              id: 0,
              title: 'Existing context'
            })
          ],
          [
            1,
            fromJS({
              id: 1,
              title: 'New context'
            })
          ]
        ])
        const action = {
            type: types.REMOVE_CONTEXT,
            id: 1
        }
        const nextState = Map([
          [
            0,
            fromJS({
              id: 0,
              title: 'Existing context'
            })
          ]
        ])
        expect(reducer(initialState, action)).to.equal(nextState)
    })

    it('Should handle REMOVE_CONTEXT with wrong id', () => {
        const initialState = Map([
          [
            0,
            fromJS({
              id: 0,
              title: 'Existing context'
            })
          ],
          [
            1,
            fromJS({
              id: 1,
              title: 'New context'
            })
          ]
        ])
        const action = {
            type: types.REMOVE_CONTEXT,
            id: 3
        }
        expect(reducer(initialState, action)).to.equal(initialState)
    })

    it('Should handle EDIT_CONTEXT', () => {
        const initialState = Map([
          [
            0,
            fromJS({
              id: 0,
              title: 'Existing context'
            })
          ],
          [
            1,
            fromJS({
              id: 1,
              title: 'New context'
            })
          ]
        ])
        const action = {
            type: types.EDIT_CONTEXT,
            id: 1,
            properties: {
                title: 'Changed Context Tittle'
            }
        }
        const nextState = Map([
          [
            0,
            fromJS({
              id: 0,
              title: 'Existing context'
            })
          ],
          [
            1,
            fromJS({
              id: 1,
              title: 'Changed Context Tittle'
            })
          ]
        ])
        expect(reducer(initialState, action)).to.equal(nextState)
    })
})
