import * as types from '../../src/constants/actionTypes'
import * as actions from '../../src/actions/contextActions'

describe('Context action creators', () => {
    // it('Should create an action to add a context', () => {
    //     const properties = {
    //         title: 'New task'
    //     }
    //     const expectedAction = {
    //         type: types.ADD_CONTEXT,
    //         properties
    //     }
    //     expect(actions.addContext(properties)).to.deep.equal(expectedAction);
    // })

    test('Should create an action to remove a context', () => {
        const id = 0
        const expectedAction = {
            type: types.REMOVE_CONTEXT,
            id
      }
      expect(actions.removeContext(id)).toEqual(expectedAction);
    })

    test('Should create an action to edit a context', () => {
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
