import { expect } from 'chai'
import * as types from '../src/constants/actionTypes'
import * as actions from '../src/actions/projectActions'

describe('Project action creators', () => {
    it('Should create an action to add a project', () => {
        const properties = {
            title: 'New task',
            description: 'Description of the task'
        }
        const expectedAction = {
            type: types.ADD_PROJECT,
            properties
        }
        expect(actions.addProject(properties)).to.equal(expectedAction);
    })

    it('Should create an action to remove a project', () => {
        const id = 0
        const expectedAction = {
            type: types.REMOVE_PROJECT,
            id
        }
        expect(actions.removeProject(id)).to.equal(expectedAction);
    })

    it('Should create an action to complete a project', () => {
        const id = 0
        const expectedAction = {
            type: types.COMPLETE_PROJECT,
            id
        }
        expect(actions.completeProject(id)).to.equal(expectedAction)
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
        expect(actions.editProject(id, properties)).to.equal(expectedAction);
    })
})
