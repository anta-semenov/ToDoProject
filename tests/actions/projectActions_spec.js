import { expect } from 'chai'
import * as types from '../../src/constants/actionTypes'
import * as actions from '../../src/actions/projectActions'

describe('Project action creators', () => {
    it('Should create an action to add a project', () => {
      const properties = {
        title: 'New task',
        description: 'Description of the task'
      }
      expect(actions.addProject(properties)).to.deep.equal({type: types.ADD_PROJECT, properties: { ...properties, createdDate: Date.now() }});
    })

    it('Should create an action to remove a project', () => {
        const id = 0
        const expectedAction = {
            type: types.REMOVE_PROJECT,
            id
        }
        expect(actions.removeProject(id)).to.deep.equal(expectedAction);
    })

    it('Should create an action to complete a project', () => {
        const id = 0
        const status = true
        expect(actions.completeProject(id, status)).to.deep.equal({ type: types.COMPLETE_PROJECT, date: Date.now(), id, status })
    })

    it('Should create an action to edit a project', () => {
        const id = 0
        const properties = {
            title: 'New task',
            description: 'Description of the task'
        }
        const expectedAction = {
            type: types.EDIT_PROJECT,
            id,
            properties
        }
        expect(actions.editProject(id, properties)).to.deep.equal(expectedAction);
    })
})
