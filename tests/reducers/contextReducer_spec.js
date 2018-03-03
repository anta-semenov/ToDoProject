import { fromJS } from 'immutable'
import reducer from '../../src/reducer/context'
import * as types from '../../src/constants/actionTypes'
import { NEW_CONTEXT_TITLE } from '../../src/constants/defaults'
import * as commonActions from '../../src/actions/commonActions'
import { deleteContext } from '../../src/actions/contextActions'

describe('Context reducer', () => {
    test('Should return initial state', () => {
        const initialState = undefined
        const action = {}
        const nextState = fromJS({})
        expect(reducer(initialState, action)).toEqual(fromJS(nextState))
    })
    test('Should return state for empty action', () => {
        const initialState = fromJS({
            cf1sobz3s0oc: {
                id: 'cf1sobz3s0oc',
                title: 'Existing context'
            }
        })
        const action = {}
        expect(reducer(initialState, action)).toEqual(fromJS(initialState))
    })

    describe('Add context', () => {
      test('Should handle ADD_CONTEXT with empty action', () => {
          const initialState = fromJS({})
          const action = {
              type: types.ADD_CONTEXT
          }
          const nextState = fromJS({})
          expect(reducer(initialState, action)).toEqual(fromJS(nextState))
      })
      test('Should handle ADD_CONTEXT with only id in properties', () => {
          const initialState = fromJS({})
          const action = {
              type: types.ADD_CONTEXT,
              properties: {
                  id: 'cf1sobz3s0oc'
              }
          }
          const nextState = fromJS({
              cf1sobz3s0oc: {
                  id: 'cf1sobz3s0oc',
                  title: NEW_CONTEXT_TITLE,
                  deleted: false
              }
          })
          expect(reducer(initialState, action)).toEqual(fromJS(nextState))
      })
      test('Should handle ADD_CONTEXT with empty store', () => {
          const initialState = fromJS({})
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
                  title: 'New custom context',
                  deleted: false
              }
          })
          expect(reducer(initialState, action)).toEqual(fromJS(nextState))
      })
      test('Should handle ADD_CONTEXT with not empty store', () => {
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
                  title: 'New custom context',
                  deleted: false
              }
          })
          expect(reducer(initialState, action)).toEqual(nextState)
      })

      test('Should do nothing when adding context with existing id', () => {
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
        expect(reducer(initialState, action)).toEqual(nextState)
      })

      test('Should do nothing when adding context without id', () => {
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
        expect(reducer(initialState, action)).toEqual(nextState)
      })
    })

    describe('Remove context', () => {
      test('Should handle REMOVE_CONTEXT', () => {
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
          expect(reducer(initialState, action)).toEqual(nextState)
      })

      test('Should handle REMOVE_CONTEXT with wrong id', () => {
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
          expect(reducer(initialState, action)).toEqual(initialState)
      })
    })

    describe('Edit context', () => {
      test('Should handle EDIT_CONTEXT', () => {
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
          expect(reducer(initialState, action)).toEqual(nextState)
      })

      test('Should handle EDIT_CONTEXT when id changed', () => {
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
          expect(reducer(initialState, action)).toEqual(nextState)
      })

      test('Should do nothing when id changed and new id already exist', () => {
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
                  id: 'cf1sobz3s0oc',
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
                  title: 'New custom context'
              }
          })
          expect(reducer(initialState, action)).toEqual(nextState)
      })
    })

    describe('Replace context', () => {
      test('Should handle REPLACE_CONTEXT with existing id', () => {
        const initialState = fromJS({
          b41sogy3s0oc: {
            id: 'b41sogy3s0oc',
            title: 'Existing Context'
          }
        })
        const action = {
          type: types.REPLACE_CONTEXT,
          id: 'b41sogy3s0oc',
          newContext: {
            id: 'b41sogy3s0oc',
            title: 'Changed Context Tittle'
          }
        }
        const nextState = fromJS({
          b41sogy3s0oc: {
            id: 'b41sogy3s0oc',
            title: 'Changed Context Tittle'
          }
        })
        expect(reducer(initialState, action)).toEqual(nextState)
      })
    })

    describe('Set state', () => {
      test('Should handle SET_STATE action without context field', () => {
        const initialState = fromJS({
          cf1sobz3s0oc: {
              id: 'cf1sobz3s0oc',
              title: 'Existing context'
          }
        })
        const newState = fromJS({
          task: {
            cf1sobz3s0o1: {
                id: 'cf1sobz3s0o1',
                title: 'Existing context 1'
            },
            cf1sobz3s0o2: {
                id: 'cf1sobz3s0o2',
                title: 'Existing context 1'
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
      test('Should handle SET_STATE action with context field', () => {
        const initialState = fromJS({
          cf1sobz3s0oc: {
              id: 'cf1sobz3s0oc',
              title: 'Existing context'
          }
        })

        const newState = fromJS({
          context: {
            cf1sobz3s0o1: {
                id: 'cf1sobz3s0o1',
                title: 'Existing context 1'
            },
            cf1sobz3s0o2: {
                id: 'cf1sobz3s0o2',
                title: 'Existing context 1'
            }
          },
          uiState: {
            selectedSection: {
              type: 'NEXT'
            }
          }
        })

        const nextState = fromJS({
          cf1sobz3s0o1: {
              id: 'cf1sobz3s0o1',
              title: 'Existing context 1'
          },
          cf1sobz3s0o2: {
              id: 'cf1sobz3s0o2',
              title: 'Existing context 1'
          }
        })

        const action = commonActions.setState(newState)

        expect(reducer(initialState, action)).toEqual(nextState)
      })
    })

    describe('Delete context', () => {
      test('Should handle DELETE_CONTEXT with true status', () => {
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
        const action = deleteContext('cf1sobz4s0oc', true)
        const nextState = fromJS({
            cf1sobz3s0oc: {
                id: 'cf1sobz3s0oc',
                title: 'Existing context'
            },
            cf1sobz4s0oc: {
                id: 'cf1sobz4s0oc',
                title: 'New custom context',
                deleted: true
            }
        })
        expect(reducer(initialState, action)).toEqual(nextState)
      })

      test('Should handle DELETE_CONTEXT with true status and true deleted', () => {
        const initialState = fromJS({
            cf1sobz3s0oc: {
                id: 'cf1sobz3s0oc',
                title: 'Existing context'
            },
            cf1sobz4s0oc: {
                id: 'cf1sobz4s0oc',
                title: 'New custom context',
                deleted: true
            }
        })
        const action = deleteContext('cf1sobz4s0oc', true)
        const nextState = fromJS({
            cf1sobz3s0oc: {
                id: 'cf1sobz3s0oc',
                title: 'Existing context'
            },
            cf1sobz4s0oc: {
                id: 'cf1sobz4s0oc',
                title: 'New custom context',
                deleted: true
            }
        })
        expect(reducer(initialState, action)).toEqual(nextState)
      })

      test('Should handle DELETE_CONTEXT with empty status and true deleted', () => {
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
        const action = deleteContext('cf1sobz4s0oc')
        const nextState = fromJS({
            cf1sobz3s0oc: {
                id: 'cf1sobz3s0oc',
                title: 'Existing context'
            },
            cf1sobz4s0oc: {
                id: 'cf1sobz4s0oc',
                title: 'New custom context',
                deleted: false
            }
        })
        expect(reducer(initialState, action)).toEqual(nextState)
      })

      test('Should handle DELETE_CONTEXT with false status and true deleted', () => {
        const initialState = fromJS({
            cf1sobz3s0oc: {
                id: 'cf1sobz3s0oc',
                title: 'Existing context'
            },
            cf1sobz4s0oc: {
                id: 'cf1sobz4s0oc',
                title: 'New custom context',
                deleted: true
            }
        })
        const action = deleteContext('cf1sobz4s0oc', false)
        const nextState = fromJS({
            cf1sobz3s0oc: {
                id: 'cf1sobz3s0oc',
                title: 'Existing context'
            },
            cf1sobz4s0oc: {
                id: 'cf1sobz4s0oc',
                title: 'New custom context',
                deleted: false
            }
        })
        expect(reducer(initialState, action)).toEqual(nextState)
      })

      test(
          'Should handle DELETE_CONTEXT with false status and empty deleted',
          () => {
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
            const action = deleteContext('cf1sobz4s0oc', false)
            const nextState = fromJS({
                cf1sobz3s0oc: {
                    id: 'cf1sobz3s0oc',
                    title: 'Existing context'
                },
                cf1sobz4s0oc: {
                    id: 'cf1sobz4s0oc',
                    title: 'New custom context',
                    deleted: false
                }
            })
            expect(reducer(initialState, action)).toEqual(nextState)
          }
      )
    })
})
