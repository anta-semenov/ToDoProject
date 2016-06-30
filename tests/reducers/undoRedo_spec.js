import { expect } from 'chai'
import undoRedo from '../../src/reducer/undoRedo'
import { fromJS } from 'immutable'
import { undo, redo, setState, clearUndoRedo } from '../../src/actions/commonActions'

describe('Undo/Redo', () => {
  const testStartState = fromJS({
    testKey1: {
      item1: {id:0, title: 'test'},
      item2: {id:2, title: 'item 2'}
    },
    testKey2: {
      item3: {id:3, title: 'item 3'},
      item4: {id:4, title: 'item 4'}
    },
    testKey3: [0,2,4],
    past: [{
      testKey1: {
        item1: {id:0, title: 'test'}
      },
      testKey2: {
        item3: {id:3, title: 'item 10'},
        item4: {id:4, title: 'item 4'}
      },
      testKey3: [0,4]
    }],
    future: [{
      testKey1: {
        item2: {id:2, title: 'item 2'}
      },
      testKey2: {
        item3: {id:3, title: 'item 10'}
      },
      testKey3: [0,3]
    }]
  })

  describe('Past states', () => {
    it('Should save current state to past for every action except undo', () => {
      const reducer = undoRedo(state => state.setIn(['testKey1', 'item1', 'id'], 1))

      const action = {
        type: 'SOME_ACTION',
        properties: {
          prop1: 2,
          prop2: 'test prop'
        }
      }

      const initialState = testStartState.delete('past')

      const nextState = reducer(initialState, action)

      const expectedPastState = fromJS([{
        testKey1: {
          item1: {id:0, title: 'test'},
          item2: {id:2, title: 'item 2'}
        },
        testKey2: {
          item3: {id:3, title: 'item 3'},
          item4: {id:4, title: 'item 4'}
        },
        testKey3: [0,2,4]
      }])

      expect(nextState.getIn(['past'])).to.equal(expectedPastState)
    })

    it('Should add new state to past for every action except undo', () => {
      const reducer = undoRedo(state => state.setIn(['testKey1', 'item1', 'id'], 1))

      const action = {
        type: 'SOME_ACTION',
        properties: {
          prop1: 2,
          prop2: 'test prop'
        }
      }

      const nextState = reducer(testStartState, action)

      const expectedPastState = fromJS([
        {
          testKey1: {
            item1: {id:0, title: 'test'}
          },
          testKey2: {
            item3: {id:3, title: 'item 10'},
            item4: {id:4, title: 'item 4'}
          },
          testKey3: [0,4]
        },
        {
          testKey1: {
            item1: {id:0, title: 'test'},
            item2: {id:2, title: 'item 2'}
          },
          testKey2: {
            item3: {id:3, title: 'item 3'},
            item4: {id:4, title: 'item 4'}
          },
          testKey3: [0,2,4]
        }
      ])

      expect(nextState.getIn(['past'])).to.equal(expectedPastState)
    })

    it('Should remove last state from past for undo action', () => {
      const reducer = undoRedo(state => state)

      const nextState = reducer(testStartState, undo())

      expect(nextState.get('past')).to.equal(fromJS([]))
    })

    it('Should not add new state to past if saved state match with last state in past', () => {
      const reducer = undoRedo(state => state.setIn(['testKey1', 'item1', 'id'], 1))

      const action = {
        type: 'SOME_ACTION',
        properties: {
          prop1: 2,
          prop2: 'test prop'
        }
      }

      const pastState = fromJS([
        {
          testKey1: {
            item1: {id:0, title: 'test'}
          },
          testKey2: {
            item3: {id:3, title: 'item 10'},
            item4: {id:4, title: 'item 4'}
          },
          testKey3: [0,4]
        },
        {
          testKey1: {
            item1: {id:0, title: 'test'},
            item2: {id:2, title: 'item 2'}
          },
          testKey2: {
            item3: {id:3, title: 'item 3'},
            item4: {id:4, title: 'item 4'}
          },
          testKey3: [0,2,4]
        }
      ])

      const nextState = reducer(testStartState.set('past', pastState), action)

      expect(nextState.get('past')).to.equal(pastState)

    })

    it('Should not save if action dont change it', () => {
      const reducer = undoRedo(state => state)

      const action = {
        type: 'SOME_ACTION',
        properties: {
          prop1: 2,
          prop2: 'test prop'
        }
      }

      const nextState = reducer(testStartState, action)

      const expectedPastState = fromJS([
        {
          testKey1: {
            item1: {id:0, title: 'test'}
          },
          testKey2: {
            item3: {id:3, title: 'item 10'},
            item4: {id:4, title: 'item 4'}
          },
          testKey3: [0,4]
        }
      ])

      expect(nextState.getIn(['past'])).to.equal(expectedPastState)
    })

    it('Should save to past only state properties that are in undoProps filter', () => {
      const filters = {
        undoProps: ['testKey1', 'testKey3']
      }
      const reducer = undoRedo(state => state.setIn(['testKey1', 'item1', 'id'], 1), filters)

      const action = {
        type: 'SOME_ACTION',
        properties: {
          prop1: 2,
          prop2: 'test prop'
        }
      }

      const nextState = reducer(testStartState, action)

      const expectedLastPastState = fromJS({
        testKey1: {
          item1: {id:0, title: 'test'},
          item2: {id:2, title: 'item 2'}
        },
        testKey3: [0,2,4]
      })

      expect(nextState.get('past').last()).to.equal(expectedLastPastState)
    })

    it('Should not save state if action dont change state produced by undoProps filter', () => {
      const filters = {
        undoProps: ['testKey1', 'testKey3']
      }
      const reducer = undoRedo(state => state.setIn(['testKey2', 'item3', 'id'], 10), filters)

      const action = {
        type: 'SOME_ACTION',
        properties: {
          prop1: 2,
          prop2: 'test prop'
        }
      }

      const nextState = reducer(testStartState, action)

      const expectedLastPastState = fromJS({
        testKey1: {
          item1: {id:0, title: 'test'}
        },
        testKey2: {
          item3: {id:3, title: 'item 10'},
          item4: {id:4, title: 'item 4'}
        },
        testKey3: [0,4]
      })

      expect(nextState.get('past').last()).to.equal(expectedLastPastState)
    })

    it('Should clear past state for setState action', () => {
      const reducer = undoRedo(state => state.setIn(['testKey1', 'item1', 'id'], 1))

      const nextState = reducer(testStartState, setState(fromJS({})))

      expect(nextState.get('past')).to.equal(fromJS([]))
    })

    it('Should clear past state for clearUndoRedo action', () => {
      const reducer = undoRedo(state => state.setIn(['testKey1', 'item1', 'id'], 1))

      const nextState = reducer(testStartState, clearUndoRedo())

      expect(nextState.get('past')).to.equal(fromJS([]))
    })

    it('Should save current state for actions in undoActions filter', () => {
      const filter = {undoActions: ['SOME_ACTION']}
      const reducer = undoRedo(state => state.setIn(['testKey1', 'item1', 'id'], 1), filter)

      const action = {
        type: 'SOME_ACTION',
        properties: {
          prop1: 2,
          prop2: 'test prop'
        }
      }

      const nextState = reducer(testStartState, action)

      const expectedPastState = fromJS([
        {
          testKey1: {
            item1: {id:0, title: 'test'}
          },
          testKey2: {
            item3: {id:3, title: 'item 10'},
            item4: {id:4, title: 'item 4'}
          },
          testKey3: [0,4]
        },
        {
          testKey1: {
            item1: {id:0, title: 'test'},
            item2: {id:2, title: 'item 2'}
          },
          testKey2: {
            item3: {id:3, title: 'item 3'},
            item4: {id:4, title: 'item 4'}
          },
          testKey3: [0,2,4]
        }
      ])

      expect(nextState.getIn(['past'])).to.equal(expectedPastState)
    })

    it('Should not save current state if action isnt in undoActions filter', () => {
      const filter = {undoActions: ['SOME_ACTION_1']}
      const reducer = undoRedo(state => state.setIn(['testKey1', 'item1', 'id'], 1), filter)

      const action = {
        type: 'SOME_ACTION',
        properties: {
          prop1: 2,
          prop2: 'test prop'
        }
      }

      const nextState = reducer(testStartState, action)

      const expectedPastState = fromJS([
        {
          testKey1: {
            item1: {id:0, title: 'test'}
          },
          testKey2: {
            item3: {id:3, title: 'item 10'},
            item4: {id:4, title: 'item 4'}
          },
          testKey3: [0,4]
        }
      ])

      expect(nextState.getIn(['past'])).to.equal(expectedPastState)
    })
  })

  describe('Future states', () => {
    it('Should clear future states for every action except undo/redo', () => {
      const reducer = undoRedo(state => state.setIn(['testKey2', 'item3', 'id'], 10))

      const action = {
        type: 'SOME_ACTION',
        properties: {
          prop1: 2,
          prop2: 'test prop'
        }
      }

      const nextState = reducer(testStartState, action)

      expect(nextState.get('future')).to.equal(fromJS([]))
    })

    it('Should save current state to future for undo action', () => {
      const reducer = undoRedo(state => state.setIn(['testKey2', 'item3', 'id'], 10))

      const nextState = reducer(testStartState, undo())

      expect(nextState.get('future').last()).to.equal(fromJS({
        testKey1: {
          item1: {id:0, title: 'test'},
          item2: {id:2, title: 'item 2'}
        },
        testKey2: {
          item3: {id:3, title: 'item 3'},
          item4: {id:4, title: 'item 4'}
        },
        testKey3: [0,2,4]
      }))
    })

    it('Should remove last state from future for redo action', () => {
      const reducer = undoRedo(state => state)

      const futureState = fromJS([
        {
          testKey1: {
            item2: {id:2, title: 'item 2'}
          },
          testKey2: {
            item3: {id:3, title: 'item 10'}
          },
          testKey3: [0,3]
        },
        {
          testKey1: {
            item1: {id:1, title: 'test'},
            item2: {id:2, title: 'item 2'}
          },
          testKey2: {
            item3: {id:3, title: 'item 3'},
            item4: {id:4, title: 'item 4'}
          },
          testKey3: [0,2,4]
        }
      ])

      const nextState = reducer(testStartState.set('future', futureState), redo())

      expect(nextState.get('future')).to.equal(fromJS([{
        testKey1: {
          item2: {id:2, title: 'item 2'}
        },
        testKey2: {
          item3: {id:3, title: 'item 10'}
        },
        testKey3: [0,3]
      }]))
    })

    it('Should save to future only state properties that are in undoProps filter', () => {
      const filters = {
        undoProps: ['testKey1', 'testKey3']
      }
      const reducer = undoRedo(state => state.setIn(['testKey2', 'item3', 'id'], 10), filters)

      const nextState = reducer(testStartState, undo())

      expect(nextState.get('future').last()).to.equal(fromJS({
        testKey1: {
          item1: {id:0, title: 'test'},
          item2: {id:2, title: 'item 2'}
        },
        testKey3: [0,2,4]
      }))
    })

    it('Should not add state to future if it match with last state in future', () => {
      const reducer = undoRedo(state => state.setIn(['testKey2', 'item3', 'id'], 10))

      const futureState = fromJS([
        {
          testKey1: {
            item2: {id:2, title: 'item 2'}
          },
          testKey2: {
            item3: {id:3, title: 'item 10'}
          },
          testKey3: [0,3]
        },
        {
          testKey1: {
            item1: {id:0, title: 'test'},
            item2: {id:2, title: 'item 2'}
          },
          testKey2: {
            item3: {id:3, title: 'item 3'},
            item4: {id:4, title: 'item 4'}
          },
          testKey3: [0,2,4]
        }
      ])

      const nextState = reducer(testStartState.set('future', futureState), undo())

      expect(nextState.get('future')).to.equal(futureState)
    })
  })

  describe('Common state', () => {
    it('Should set state properties except past and future from last past state for undo action', () => {
      const reducer = undoRedo(state => state)

      const nextState = reducer(testStartState, undo()).delete('past').delete('future')

      expect(nextState).to.equal(fromJS({
        testKey1: {
          item1: {id:0, title: 'test'}
        },
        testKey2: {
          item3: {id:3, title: 'item 10'},
          item4: {id:4, title: 'item 4'}
        },
        testKey3: [0,4]
      }))
    })

    it('Should set state properties except past and future from last future state for redo action', () => {
      const reducer = undoRedo(state => state)

      const nextState = reducer(testStartState, redo()).delete('past').delete('future')

      expect(nextState).to.equal(fromJS({
        testKey1: {
          item2: {id:2, title: 'item 2'}
        },
        testKey2: {
          item3: {id:3, title: 'item 10'}
        },
        testKey3: [0,3]
      }))
    })

    it('Should set only properties that are in restore state for undo action', () => {
      const reducer = undoRedo(state => state)

      const nextState = reducer(testStartState.deleteIn(['past', 0, 'testKey2']), undo()).delete('past').delete('future')

      expect(nextState).to.equal(fromJS({
        testKey1: {
          item1: {id:0, title: 'test'}
        },
        testKey2: {
          item3: {id:3, title: 'item 3'},
          item4: {id:4, title: 'item 4'}
        },
        testKey3: [0,4]
      }))
    })

    it('Should set only properties that are in restore state for redo action', () => {
      const reducer = undoRedo(state => state)

      const nextState = reducer(testStartState.deleteIn(['future', 0, 'testKey2']), redo()).delete('past').delete('future')

      expect(nextState).to.equal(fromJS({
        testKey1: {
          item2: {id:2, title: 'item 2'}
        },
        testKey2: {
          item3: {id:3, title: 'item 3'},
          item4: {id:4, title: 'item 4'}
        },
        testKey3: [0,3]
      }))
    })
  })
})
