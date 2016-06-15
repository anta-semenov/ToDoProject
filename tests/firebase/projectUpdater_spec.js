import { expect } from 'chai'
import { fromJS } from 'immutable'
import projectUpdater from '../../src/backend/firebase/updaters/projectUpdater'
import * as actions from '../../src/actions/projectActions'
import projectReducer from '../../src/reducer/project'
import { NEW_PROJECT_TITLE } from '../../src/constants/defaults'

describe('Firebase project updater', () => {
  const testState = fromJS({
    a2ps56y3sfo0: {
      id: 'a2ps56y3sfo0',
      title: 'Test project',
      completed: false
    }
  })

  it('Should handle add project action', () => {
    const newProjectProperties = {
      id: 'a2ps56y3sfo1'
    }
    const action = actions.addProject(newProjectProperties)
    const newState = projectReducer(testState, action)

    const expectedUpdateObject = [{
      updateURL: 'project/a2ps56y3sfo1',
      value: {
        id: 'a2ps56y3sfo1',
        title: NEW_PROJECT_TITLE,
        completed: false
      }
    }]

    expect(projectUpdater([], action, newState)).to.deep.equal(expectedUpdateObject)
  })

  it('Should handle remove project action', () => {
    const action = actions.removeProject('a2ps56y3sfo0')
    const newState = projectReducer(testState, action)

    const expectedUpdateObject = [{
      updateURL: 'project/a2ps56y3sfo0',
      value: null
    }]

    expect(projectUpdater([], action, newState)).to.deep.equal(expectedUpdateObject)
  })

  it('Should handle complete project action', () => {
    const newCompleteStatus = true
    const action = actions.completeProject('a2ps56y3sfo0', newCompleteStatus)
    const newState = projectReducer(testState, action)

    const expectedUpdateObject = [{
      updateURL: 'project/a2ps56y3sfo0/completed',
      value: newCompleteStatus
    }]

    expect(projectUpdater([], action, newState)).to.deep.equal(expectedUpdateObject)
  })

  describe('Edit project', () => {
    it('Should handle edit project action with multiple changes', () => {
      const newProjectProperties = {
        title: 'New title',
        completed: false
      }
      const action = actions.editProject('a2ps56y3sfo0', newProjectProperties)
      const newState = projectReducer(testState, action)

      const expectedUpdateObject = [
        {
          updateURL: 'project/a2ps56y3sfo0/title',
          value: 'New title'
        },
        {
          updateURL: 'project/a2ps56y3sfo0/completed',
          value: false
        }
      ]

      expect(projectUpdater([], action, newState)).to.deep.equal(expectedUpdateObject)
    })

    it('Should handle edit project action with id changes', () => {
      const newProjectProperties = {
        id: 'a2ps56y3sfo1',
        title: 'New title'
      }
      const action = actions.editProject('a2ps56y3sfo0', newProjectProperties)
      const newState = projectReducer(testState, action)

      const expectedUpdateObject = [
        {
          updateURL: 'project/a2ps56y3sfo0',
          value: null
        },
        {
          updateURL: 'project/a2ps56y3sfo1',
          value: {
            id: 'a2ps56y3sfo1',
            title: 'New title',
            completed: false
          }
        }
      ]

      expect(projectUpdater([], action, newState)).to.deep.equal(expectedUpdateObject)
    })
  })
})
