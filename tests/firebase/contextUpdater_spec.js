import { expect } from 'chai'
import { fromJS } from 'immutable'
import contextUpdater from '../../src/backend/firebase/updaters/contextUpdater'
import * as actions from '../../src/actions/contextActions'
import contextReducer from '../../src/reducer/context'
import { NEW_CONTEXT_TITLE } from '../../src/constants/defaults'

describe('Firebase context updater', () => {
  const testState = fromJS({
    a2ps56y3sfo0: {
      id: 'a2ps56y3sfo0',
      title: 'Test context'
    }
  })

  it('Should handle add context action', () => {
    const newContextProperties = {
      id: 'a2ps56y3sfo3'
    }
    const action = actions.addContext(newContextProperties)
    const newState = contextReducer(testState, action)

    const expectedUpdateObject = [{
      updateURL: 'context/a2ps56y3sfo3',
      value: {
        id: 'a2ps56y3sfo3',
        title: NEW_CONTEXT_TITLE
      }
    }]

    expect(contextUpdater([], action, newState)).to.deep.equal(expectedUpdateObject)
  })

  it('Should handle remove context action', () => {
    const action = actions.removeContext('a2ps56y3sfo0')
    const newState = contextReducer(testState, action)

    const expectedUpdateObject = [{
      updateURL: 'context/a2ps56y3sfo0',
      value: null
    }]

    expect(contextUpdater([], action, newState)).to.deep.equal(expectedUpdateObject)
  })

  it('Should handle edit context action', () => {
    const newContextProperties = {
      title: 'New title'
    }
    const action = actions.editContext('a2ps56y3sfo0', newContextProperties)
    const newState = contextReducer(testState, action)

    const expectedUpdateObject = [{
      updateURL: 'context/a2ps56y3sfo0/title',
      value: 'New title'
    }]

    expect(contextUpdater([], action, newState)).to.deep.equal(expectedUpdateObject)
  })

  it('Should handle edit context action with id changes', () => {
    const newContextProperties = {
      id: 'a2ps56y3sfo3',
      title: 'New title'
    }
    const action = actions.editContext('a2ps56y3sfo0', newContextProperties)
    const newState = contextReducer(testState, action)

    const expectedUpdateObject = [
      {
        updateURL: 'context/a2ps56y3sfo0',
        value: null
      },
      {
        updateURL: 'context/a2ps56y3sfo3',
        value: {
          id: 'a2ps56y3sfo3',
          title: 'New title'
        }
      }
    ]

    expect(contextUpdater([], action, newState)).to.deep.equal(expectedUpdateObject)
  })
})
