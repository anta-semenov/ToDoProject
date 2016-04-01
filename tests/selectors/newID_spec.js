import { expect } from 'chai'
import { fromJS } from 'immutable'
import { nextID, makeNextIDSelector } from '../../src/selectors/nextID'

describe('newId selectors', () => {
  it('Should provide newId object for empty store', () => {
    const newID = nextID(undefined)

    expect(newID).to.equal(0)
    })
  it('Should return corect newId with not empty state', () => {
    const initialState = fromJS([
      {
        id: 2,
        title: 'Task 2'
      },
      {
        id: 3,
        title: 'Task 3'
      }
    ])

    const newID = nextID(initialState)

    expect(newID).to.equal(4)
  })

  it('Should return corect newId with not empty unoredered state', () => {
    const initialState = fromJS([
      {
        id: 4,
        title: 'Task 4'
      },
      {
        id: 1,
        title: 'Task 1'
      }
    ])

    const newID = nextID(initialState)

    expect(newID).to.equal(5)
  })
  it('Should return corect newId with not empty unoredered state', () => {
    const initialState = fromJS([
      {
        id: 4,
        title: 'Task 4'
      },
      {
        id: 1,
        title: 'Task 1'
      }
    ])

    const newID = makeNextIDSelector()(initialState)

    expect(newID).to.equal(5)
  })
})
