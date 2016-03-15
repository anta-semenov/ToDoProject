import expect from 'expect'
import * as types from '../src/constants/ActionTypes'
import * as actions from '../src/actions/ProjectActions'

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
        expect(actions.addProject(properties)).toEqual(expectedAction);
    })

    it('Should create an action to remove a project', () => {
        const id = 0
        const expectedAction = {
            type: types.REMOVE_PROJECT,
            id
        }
        expect(actions.removeProject(id)).toEqual(expectedAction);
    })

    it('Should create an action to complete a project', () => {
        const id = 0
        const expectedAction = {
            type: types.COMPLETE_PROJECT,
            id
        }
        expect(actions.completeProject(id)).toEqual(expectedAction)
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
        expect(actions.editProject(id, properties)).toEqual(expectedAction);
    })
})
