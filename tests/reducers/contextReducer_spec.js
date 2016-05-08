import { expect } from 'chai'
import { fromJS } from 'immutable'
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
        const initialState = fromJS({
            cf1sobz3s0oc: {
                id: 'cf1sobz3s0oc',
                title: 'Existing context'
            }
        })
        const action = {}
        expect(reducer(initialState, action)).to.equal(fromJS(initialState))
    })

    describe('Add context', () => {
      it('Should handle ADD_CONTEXT with empty action', () => {
          const initialState = fromJS({})
          const action = {
              type: types.ADD_CONTEXT
          }
          const nextState = fromJS({})
          expect(reducer(initialState, action)).to.equal(fromJS(nextState))
      })
      it('Should handle ADD_CONTEXT with empty store', () => {
          const initialState = List()
          const action = {
              type: types.ADD_CONTEXT,
              properties: {
                  id: 'cf1sobz3s0oc',
                  title: 'New custom context'
              }
          }
          const nextState = fromJS({
              cf1sobz3s0oc: {
                  id: 'cf1sobz3s0oc',
                  title: 'New custom context'
              }
          })
          expect(reducer(initialState, action)).to.equal(fromJS(nextState))
      })
      it('Should handle ADD_CONTEXT with not empty store', () => {
          const initialState = fromJS({
              cf1sobz3s0oc: {
                  id: 'cf1sobz3s0oc',
                  title: 'Existing context'
              }
          })
          const action = {
              type: types.ADD_CONTEXT,
              properties: {
                  id: 'cf1sobz4s0oc',
                  title: 'New custom context'
              }
          }
          const nextState = fromJS({
              cf1sobz3s0oc: {
                  id: 'cf1sobz3s0oc',
                  title: 'Existing context'
              },
              cf1sobz4s0oc: {
                  id: 'cf1sobz4s0oc',
                  title: 'New custom context'
              }
          })
          expect(reducer(initialState, action)).to.equal(nextState)
      })

      it('Should do nothing when adding context with existing id', () => {
        const initialState = fromJS({
            cf1sobz3s0oc: {
                id: 'cf1sobz3s0oc',
                title: 'Existing context'
            },
            cf1sobz4s0oc: {
                id: 'cf1sobz4s0oc',
                title: 'Changed context title'
            }
        })
        const action = {
            type: types.ADD_CONTEXT,
            properties: {
                id: 'cf1sobz4s0oc',
                title: 'New custom context'
            }
        }
        const nextState = fromJS({
            cf1sobz3s0oc: {
                id: 'cf1sobz3s0oc',
                title: 'Existing context'
            },
            cf1sobz4s0oc: {
                id: 'cf1sobz4s0oc',
                title: 'Changed context title'
            }
        })
        expect(reducer(initialState, action)).to.equal(nextState)
      })

      it('Should do nothing when adding context without id', () => {
        const initialState = fromJS({
            cf1sobz3s0oc: {
                id: 'cf1sobz3s0oc',
                title: 'Existing context'
            }
        })
        const action = {
            type: types.ADD_CONTEXT,
            properties: {
                title: 'New custom context'
            }
        }
        const nextState = fromJS({
            cf1sobz3s0oc: {
                id: 'cf1sobz3s0oc',
                title: 'Existing context'
            }
        })
        expect(reducer(initialState, action)).to.equal(nextState)
      })
    })

    describe('Remove context', () => {
      it('Should handle REMOVE_CONTEXT', () => {
          const initialState = fromJS({
              cf1sobz3s0oc: {
                  id: 'cf1sobz3s0oc',
                  title: 'Existing context'
              },
              cf1sobz4s0oc: {
                  id: 'cf1sobz4s0oc',
                  title: 'New custom context'
              }
          })
          const action = {
              type: types.REMOVE_CONTEXT,
              id: 'cf1sobz4s0oc'
          }
          const nextState = fromJS({
              cf1sobz3s0oc: {
                  id: 'cf1sobz3s0oc',
                  title: 'Existing context'
              }
          })
          expect(reducer(initialState, action)).to.equal(nextState)
      })

      it('Should handle REMOVE_CONTEXT with wrong id', () => {
          const initialState = fromJS({
              cf1sobz3s0oc: {
                  id: 'cf1sobz3s0oc',
                  title: 'Existing context'
              },
              cf1sobz4s0oc: {
                  id: 'cf1sobz4s0oc',
                  title: 'New custom context'
              }
          })
          const action = {
              type: types.REMOVE_CONTEXT,
              id: 'cb1sobz4s0oc'
          }
          expect(reducer(initialState, action)).to.equal(initialState)
      })
    })

    describe('Edit context', () => {
      it('Should handle EDIT_CONTEXT', () => {
          const initialState = fromJS({
              cf1sobz3s0oc: {
                  id: 'cf1sobz3s0oc',
                  title: 'Existing context'
              },
              cf1sobz4s0oc: {
                  id: 'cf1sobz4s0oc',
                  title: 'New custom context'
              }
          })
          const action = {
              type: types.EDIT_CONTEXT,
              id: 'cf1sobz4s0oc',
              properties: {
                  title: 'Changed Context Tittle'
              }
          }
          const nextState = fromJS({
              cf1sobz3s0oc: {
                  id: 'cf1sobz3s0oc',
                  title: 'Existing context'
              },
              cf1sobz4s0oc: {
                  id: 'cf1sobz4s0oc',
                  title: 'Changed Context Tittle'
              }
          })
          expect(reducer(initialState, action)).to.equal(nextState)
      })

      it('Should handle EDIT_CONTEXT when id changed', () => {
          const initialState = fromJS({
              cf1sobz3s0oc: {
                  id: 'cf1sobz3s0oc',
                  title: 'Existing context'
              },
              cf1sobz4s0oc: {
                  id: 'cf1sobz4s0oc',
                  title: 'New custom context'
              }
          })
          const action = {
              type: types.EDIT_CONTEXT,
              id: 'cf1sobz4s0oc',
              properties: {
                  id: 'cf1sobz5s0oc',
                  title: 'Changed Context Tittle'
              }
          }
          const nextState = fromJS({
              cf1sobz3s0oc: {
                  id: 'cf1sobz3s0oc',
                  title: 'Existing context'
              },
              cf1sobz5s0oc: {
                  id: 'cf1sobz5s0oc',
                  title: 'Changed Context Tittle'
              }
          })
          expect(reducer(initialState, action)).to.equal(nextState)
      })
    })
})
