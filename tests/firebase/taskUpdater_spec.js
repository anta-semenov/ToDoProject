import { expect } from 'chai'
import { fromJS, Set } from 'immutable'
import taskUpdater from '../../src/backend/firebase/updaters/taskUpdater'
import { PRIORITY_NONE, PRIORITY_MEDIUM } from '../../src/constants/priorityLevels'
import taskReducer from '../../src/reducer/task'
import * as actions from '../../src/actions/taskActions'

describe('Firebase task updater', () => {
  const testState = fromJS({
      b41sogy3s0o1: {
        id: 'b41sogy3s0o1',
        title: 'test task',
        completed: false,
        today: false,
        priority: PRIORITY_NONE,
        project: 'a2ps56y3sfo0',
        contexts: Set(['cb3sr7yd9fo0', 'cb3sr7yd9fo1'])
      }
    })
  it('Should handle Add task action', () => {
    const newTaskProperties = {
      id: 'b41sogy3s0o2',
      title: 'test task 2'
    }
    const action = actions.addTask(newTaskProperties)
    const newState = taskReducer(testState, action)

    const expectedUpdateObject = [{
      updateURL: 'task/b41sogy3s0o2',
      value: {
        id: 'b41sogy3s0o2',
        title: 'test task 2',
        completed: false,
        today: false,
        priority: PRIORITY_NONE
      }
    }]
    expect(taskUpdater([], action, newState)).to.deep.equal(expectedUpdateObject)
  })

  it('Should handle remove task action', () => {
    const action = actions.removeTask('b41sogy3s0o1')
    const newState = taskReducer(testState, action)

    const expectedUpdateObject = [{
      updateURL: 'task/b41sogy3s0o1',
      value: null
    }]

    expect(taskUpdater([], action, newState)).to.deep.equal(expectedUpdateObject)
  })

  it('Should handle complete task action', () => {
    const newCompletedStatus = true
    const action = actions.completeTask('b41sogy3s0o1', newCompletedStatus)
    const newState = taskReducer(testState, action)

    const expectedUpdateObject = [{
      updateURL: 'task/b41sogy3s0o1/completed',
      value: newCompletedStatus
    }]

    expect(taskUpdater([], action, newState)).to.deep.equal(expectedUpdateObject)
  })

  it('Should handle set today task action', () => {
    const newTodayStatus = true
    const action = actions.setTaskToday('b41sogy3s0o1', newTodayStatus)
    const newState = taskReducer(testState, action)

    const expectedUpdateObject = [{
      updateURL: 'task/b41sogy3s0o1/today',
      value: newTodayStatus
    }]

    expect(taskUpdater([], action, newState)).to.deep.equal(expectedUpdateObject)
  })

  describe('Edit task', () => {
    it('Should handle edit task action with multiple changes', () => {
      const newTaskProperties = {
        title: 'check task updater',
        priority: PRIORITY_MEDIUM
      }
      const action = actions.editTask('b41sogy3s0o1', newTaskProperties)
      const newState = taskReducer(testState, action)

      const expectedUpdateObject = [
        {
          updateURL: 'task/b41sogy3s0o1/title',
          value: 'check task updater'
        },
        {
          updateURL: 'task/b41sogy3s0o1/priority',
          value: PRIORITY_MEDIUM
        }
      ]

      expect(taskUpdater([], action, newState)).to.deep.equal(expectedUpdateObject)
    })

    it('Should handle edit task action with complicated properties', () => {
      const newTaskProperties = {
        description: fromJS({
          entityMap: {},
          blocks: [
            {t:1},
            {t:2}
          ]
        })
      }
      const action = actions.editTask('b41sogy3s0o1', newTaskProperties)
      const newState = taskReducer(testState, action)

      const expectedUpdateObject = [
        {
          updateURL: 'task/b41sogy3s0o1/description',
          value: {
            entityMap: {},
            blocks: [
              {t:1},
              {t:2}
            ]
          }
        }
      ]

      expect(taskUpdater([], action, newState)).to.deep.equal(expectedUpdateObject)
    })

    it('Should handle edit task action with id changes', () => {
      const newTaskProperties = {
        title: 'check task updater',
        id: 'b41sogy3s0o2'
      }
      const action = actions.editTask('b41sogy3s0o1', newTaskProperties)
      const newState = taskReducer(testState, action)

      const expectedUpdateObject = [
        {
          updateURL: 'task/b41sogy3s0o1',
          value: null
        },
        {
          updateURL: 'task/b41sogy3s0o2',
          value: {
            id: 'b41sogy3s0o2',
            title: 'check task updater',
            completed: false,
            today: false,
            priority: PRIORITY_NONE,
            project: 'a2ps56y3sfo0',
            contexts: ['cb3sr7yd9fo0','cb3sr7yd9fo1']
          }
        }
      ]

      expect(taskUpdater([], action, newState)).to.deep.equal(expectedUpdateObject)
    })
  })

  describe('Add task to project', () => {
    it('Should handle add task to project action', () => {
      const action = actions.addTaskToProject('b41sogy3s0o1', 'a2ps56y3sfo1')
      const newState = taskReducer(testState, action)

      const expectedUpdateObject = [{
        updateURL: 'task/b41sogy3s0o1/project',
        value: 'a2ps56y3sfo1'
      }]

      expect(taskUpdater([], action, newState)).to.deep.equal(expectedUpdateObject)
    })

    it('Should handle remove task from project action', () => {
      const action = actions.addTaskToProject('b41sogy3s0o1', undefined)
      const newState = taskReducer(testState, action)

      const expectedUpdateObject = [{
        updateURL: 'task/b41sogy3s0o1/project',
        value: null
      }]

      expect(taskUpdater([], action, newState)).to.deep.equal(expectedUpdateObject)
    })
  })

  describe('Context', () => {
    it('Should handle add task context action', () => {
      const action = actions.addTaskContext('b41sogy3s0o1', 'cb3sr7yd9fo3')
      const newState = taskReducer(testState, action)

      const expectedUpdateObject = [{
        updateURL: 'task/b41sogy3s0o1/contexts',
        value: ['cb3sr7yd9fo0', 'cb3sr7yd9fo1', 'cb3sr7yd9fo3']
      }]

      expect(taskUpdater([], action, newState)).to.deep.equal(expectedUpdateObject)
    })

    it('Should handle remove task context action', () => {
      const action = actions.removeTaskContext('b41sogy3s0o1', 'cb3sr7yd9fo0')
      const newState = taskReducer(testState, action)

      const expectedUpdateObject = [{
        updateURL: 'task/b41sogy3s0o1/contexts',
        value: ['cb3sr7yd9fo1']
      }]

      expect(taskUpdater([], action, newState)).to.deep.equal(expectedUpdateObject)
    })

    it('Should handle remove task context action when no contexts will be', () => {
      const state = fromJS({
          b41sogy3s0o1: {
            id: 'b41sogy3s0o1',
            title: 'test task',
            completed: false,
            today: false,
            priority: PRIORITY_NONE,
            project: 'a2ps56y3sfo0',
            contexts: Set(['cb3sr7yd9fo0'])
          }
        })
      const action = actions.removeTaskContext('b41sogy3s0o1', 'cb3sr7yd9fo0')
      const newState = taskReducer(state, action)

      const expectedUpdateObject = [{
        updateURL: 'task/b41sogy3s0o1/contexts',
        value: null
      }]

      expect(taskUpdater([], action, newState)).to.deep.equal(expectedUpdateObject)
    })
  })
})
