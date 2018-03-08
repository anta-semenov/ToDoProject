import * as types from '../../src/constants/actionTypes'
import * as actions from '../../src/actions/projectActions'

describe('Project action creators', () => {
  test('Should create an action to add a project', () => {
    const properties = {
      title: 'New task',
      description: 'Description of the task'
    }
    const action = actions.addProject(properties)
    expect(action).toMatchObject({ type: types.ADD_PROJECT, properties })
    expect(action.properties.createdDate).toBeLessThanOrEqual(Date.now())
  })

  test('Should create an action to remove a project', () => {
    const id = 0
    const expectedAction = {
      type: types.REMOVE_PROJECT,
      id
    }
    expect(actions.removeProject(id)).toEqual(expectedAction)
  })

  test('Should create an action to complete a project', () => {
    const id = 0
    const status = true
    expect(actions.completeProject(id, status)).toEqual({
      type: types.COMPLETE_PROJECT,
      date: Date.now(),
      id,
      status
    })
  })

  test('Should create an action to edit a project', () => {
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
    expect(actions.editProject(id, properties)).toEqual(expectedAction)
  })
})
