import { expect } from 'chai'
import { fromJS } from 'immutable'
import taskUpdater from '../../src/backend/firebase/taskUpdater'
import { PRIORITY_NONE } from '../../src/constants/priorityLevels'
import taskReducer from '../../src/reducer/task'
import * as actions from '../../src/actions/taskActions'

describe('Firebase task updater', () => {
  const testState = fromJS([
      {
        id: 1,
        title: 'test task',
        completed: false,
        today: false,
        priority: PRIORITY_NONE
      }
    ])
  it('Add task', () => {
    const newTaskProperties = {
      title: 'test task 2'
    }
    const action = actions.addTask(newTaskProperties)
    const newState = taskReducer(testState, action)

    const expectedUpdateObject = [{
      updateURL: 'task/1',
      value: {
        id: 2,
        title: 'test task 2',
        completed: false,
        today: false,
        priority: PRIORITY_NONE
      }
    }]

    expect(taskUpdater([], action, newState)).to.equal(expectedUpdateObject)
  })
})
