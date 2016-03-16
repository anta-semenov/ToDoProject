import expect from 'expect'
import * as types from '../src/constants/ActionTypes'
import * as actions from '../src/actions/ContextActions'

describe('Context action creators', () => {
    it('Should create an action to add a context', () => {
        const properties = {
            title: 'New task'
        }
        const expectedAction = {
            type: types.ADD_CONTEXT,
            properties
        }
        expect(actions.addContext(properties)).toEqual(expectedAction);
    })

    it('Should create an action to remove a context', () => {
        const id = 0
        const expectedAction = {
            type: types.REMOVE_CONTEXT,
            id
      }
      expect(actions.removeContext(id)).toEqual(expectedAction);
    })

    it('Should create an action to edit a context', () => {
        const id = 0
        const properties = {
            title: 'New task'
        }
        const expectedAction = {
            type: types.EDIT_CONTEXT,
            id,
            properties
        }
        expect(actions.editContext(id, properties)).toEqual(expectedAction);
    })
})
