import { fromJS } from 'immutable'
import { getTrackingTaskTitle, getTrackingTaskStartTime } from '../../src/reducer'

describe('Tracking task selectors', () => {
  describe('getTrackingTaskTitle', () => {
    test('Should return right title for tracking tasks', () => {
      const initialState = fromJS({
        task: {
          b41sogy3s0oc: {
            id: 'b41sogy3s0oc',
            title: 'Existing Task',
            completed: false,
            today: false,
            tracking: [
              {
                startTime: 1466957388121
              }
            ]
          },
          b41sogy3s0ok: {
            id: 'b41sogy3s0ok',
            title: 'New Task',
            completed: false,
            today: false
          }
        },
        tracking: {
          task: 'b41sogy3s0oc'
        }
      })
      expect(getTrackingTaskTitle(initialState)).toBe('Existing Task')
      expect(getTrackingTaskTitle()).toBe(undefined)
    })
  })
  describe('getTrackingTaskStartTime', () => {
    test('Should return right start time for tracking task', () => {
      const initialState = fromJS({
        task: {
          b41sogy3s0oc: {
            id: 'b41sogy3s0oc',
            title: 'Existing Task',
            completed: false,
            today: false,
            tracking: [
              {
                startTime: 1466957388121
              }
            ]
          },
          b41sogy3s0ok: {
            id: 'b41sogy3s0ok',
            title: 'New Task',
            completed: false,
            today: false
          }
        },
        tracking: {
          task: 'b41sogy3s0oc'
        }
      })
      expect(getTrackingTaskStartTime(initialState)).toBe(1466957388121)
      expect(getTrackingTaskStartTime()).toBe(undefined)
    })
  })
})
