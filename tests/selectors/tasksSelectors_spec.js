import { fromJS, Map, List } from 'immutable'
import { PRIORITY_NONE } from '../../src/constants/defaults'
import * as sectionTypes from '../../src/constants/sectionTypes'
import { getTasksGroups, getFilteredTasks } from '../../src/reducer'

const testTasks1 = fromJS({
  b41sogy3s0oc: {
    id: 'b41sogy3s0oc',
    title: 'Test task 0',
    completed: false,
    today: false,
    priority: PRIORITY_NONE
  },
  b41sogy3s0od: {
    id: 'b41sogy3s0od',
    title: 'Test task 1',
    completed: false,
    today: true,
    priority: PRIORITY_NONE
  },
  b41sogy3s0oe: {
    id: 'b41sogy3s0oe',
    title: 'Test task 2',
    completed: true,
    today: true,
    priority: PRIORITY_NONE
  },
  b41sogy3s0of: {
    id: 'b41sogy3s0of',
    title: 'Test task 3',
    completed: true,
    today: false,
    priority: PRIORITY_NONE
  },
  b41sogy3s0og: {
    id: 'b41sogy3s0og',
    title: 'Test task 4',
    completed: true,
    today: false,
    priority: PRIORITY_NONE,
    project: 'bh52ogy5s0fm'
  },
  b41sogy3s0oj: {
    id: 'b41sogy3s0oj',
    title: 'Test task 5',
    completed: false,
    today: true,
    priority: PRIORITY_NONE,
    project: 'bh52ogy5s0fm',
    contexts: List(['cf1sobz3s0oc'])
  },
  b41sogy3s0ok: {
    id: 'b41sogy3s0ok',
    title: 'Test task 6',
    completed: false,
    today: false,
    priority: PRIORITY_NONE,
    contexts: List(['cf1sobz3s0oc'])
  },
  b41sogy3s0ol: {
    id: 'b41sogy3s0ol',
    title: 'Test task 7',
    completed: false,
    today: true,
    priority: PRIORITY_NONE,
    contexts: List(['cf1sobz3s0oc'])
  },
  b41sogy3s0om: {
    id: 'b41sogy3s0om',
    title: 'Test task 8',
    completed: false,
    today: false,
    priority: PRIORITY_NONE,
    repeat: {
      type: 'DAYS',
      value: 4,
      amount: -1
    }
  },
  r51sogy3s02d: {
    id: 'r51sogy3s02d',
    title: 'Test task 11',
    completed: false,
    today: true,
    priority: PRIORITY_NONE
  }
})
const testTasks2 = fromJS({
  b41sogy3s0om: {
    id: 'b41sogy3s0om',
    title: 'Test task 0',
    completed: false,
    today: false,
    priority: PRIORITY_NONE,
    contexts: List(['b07x7v4pu3e'])
  },
  b41sogy3s0on: {
    id: 'b41sogy3s0on',
    title: 'Test task 1',
    completed: true,
    today: true,
    priority: PRIORITY_NONE
  },
  b41sogy3s0oo: {
    id: 'b41sogy3s0oo',
    title: 'Test task 2',
    completed: true,
    today: true,
    priority: PRIORITY_NONE
  },
  b41sogy3s0op: {
    id: 'b41sogy3s0op',
    title: 'Test task 3',
    completed: true,
    today: false,
    priority: PRIORITY_NONE
  },
  b41sogy3s0oq: {
    id: 'b41sogy3s0oq',
    title: 'Test task 4',
    completed: true,
    today: false,
    priority: PRIORITY_NONE,
    project: 'bh52ogy5s0fm'
  },
  b41sogy3s0or: {
    id: 'b41sogy3s0or',
    title: 'Test task 5',
    completed: true,
    today: false,
    priority: PRIORITY_NONE,
    project: 'bh52ogy5s0fm',
    contexts: List(['cf1sobz3s0oc'])
  },
  b41sogy3s0os: {
    id: 'b41sogy3s0os',
    title: 'Test task 6',
    completed: true,
    today: false,
    priority: PRIORITY_NONE,
    contexts: List(['cf1sobz3s0oc'])
  }
})
const testProjects = fromJS({
  bh52ogy5s0fm: {
    id: 'bh52ogy5s0fm',
    title: 'Test project 0',
    completed: false
  },
  bh52ogy5s0f1: {
    id: 'bh52ogy5s0f1',
    title: 'Test project 1',
    completed: false
  }
})
const testContexts = fromJS({
  cf1sobz3s0oc: {
    id: 'cf1sobz3s0oc',
    title: 'Test context 0'
  },
  cf1sobz3s0o1: {
    id: 'cf1sobz3s0o1',
    title: 'Test context 1'
  }
})

const testOrder = fromJS({
  project: ['bh52ogy5s0fm', 'bh52ogy5s0f1'],
  context: ['cf1sobz3s0oc', 'cf1sobz3s0o1']
})

describe('Tasks Selectors', () => {
  describe('getTasksGroup selector', () => {
    describe('INBOX', () => {
      test('Should return tasks for INBOX', () => {
        const state = fromJS({
          task: testTasks1,
          project: testProjects,
          context: testContexts,
          order: testOrder
        })
        const groups = fromJS([
          {
            items: [
              {
                id: 'b41sogy3s0oc',
                title: 'Test task 0',
                completed: false,
                today: false,
                priority: PRIORITY_NONE
              }
            ]
          }
        ])
        const props = { section: sectionTypes.INBOX }
        expect(getTasksGroups(state, props)).toEqual(groups)
      })
      test('Should return latent tasks for INBOX section', () => {
        const state = fromJS({
          task: testTasks2,
          project: testProjects,
          context: testContexts,
          order: testOrder,
          uiState: {
            sectionLatentTasks: {
              b41sogy3s0om: 2,
              b41sogy3s0on: 1
            }
          }
        })
        const groups = fromJS([
          {
            items: [
              {
                id: 'b41sogy3s0om',
                title: 'Test task 0',
                completed: false,
                today: false,
                priority: PRIORITY_NONE,
                contexts: List(['b07x7v4pu3e'])
              },
              {
                id: 'b41sogy3s0on',
                title: 'Test task 1',
                completed: true,
                today: true,
                priority: PRIORITY_NONE
              }
            ]
          }
        ])
        const props = { section: sectionTypes.INBOX }
        expect(getTasksGroups(state, props)).toEqual(groups)
      })
      test('Should return undefined for no tasks for INBOX', () => {
        const state = fromJS({
          task: testTasks2,
          project: testProjects,
          context: testContexts,
          order: testOrder
        })
        const props = { section: sectionTypes.INBOX }
        expect(getTasksGroups(state, props)).toBeUndefined()
      })
    })
    describe('TODAY', () => {
      test('Should return tasks for TODAY', () => {
        const state = fromJS({
          task: testTasks1,
          project: testProjects,
          context: testContexts,
          order: testOrder
        })
        const groups = fromJS([
          {
            items: [
              {
                id: 'b41sogy3s0od',
                title: 'Test task 1',
                completed: false,
                today: true,
                priority: PRIORITY_NONE
              },
              {
                id: 'b41sogy3s0ol',
                title: 'Test task 7',
                completed: false,
                today: true,
                priority: PRIORITY_NONE,
                contexts: List(['cf1sobz3s0oc'])
              },
              {
                id: 'r51sogy3s02d',
                title: 'Test task 11',
                completed: false,
                today: true,
                priority: PRIORITY_NONE
              }
            ]
          },
          {
            title: 'Test project 0',
            id: 'bh52ogy5s0fm',
            items: [
              {
                id: 'b41sogy3s0oj',
                title: 'Test task 5',
                completed: false,
                today: true,
                priority: PRIORITY_NONE,
                project: 'bh52ogy5s0fm',
                contexts: List(['cf1sobz3s0oc'])
              }
            ]
          }
        ])
        const props = { section: sectionTypes.TODAY }
        expect(getTasksGroups(state, props)).toEqual(groups)
      })
      test('Should return latent tasks for TODAY', () => {
        const state = fromJS({
          task: testTasks2,
          project: testProjects,
          context: testContexts,
          order: testOrder,
          uiState: {
            sectionLatentTasks: {
              b41sogy3s0om: 2,
              b41sogy3s0oo: 1
            }
          }
        })
        const groups = fromJS([
          {
            items: [
              {
                id: 'b41sogy3s0om',
                title: 'Test task 0',
                completed: false,
                today: false,
                priority: PRIORITY_NONE,
                contexts: List(['b07x7v4pu3e'])
              },
              {
                id: 'b41sogy3s0oo',
                title: 'Test task 2',
                completed: true,
                today: true,
                priority: PRIORITY_NONE
              }
            ]
          }
        ])
        const props = { section: sectionTypes.NEXT }
        expect(getTasksGroups(state, props)).toEqual(groups)
      })
      test('Should return undefined for no tasks for TODAY', () => {
        const state = fromJS({
          task: testTasks2,
          project: testProjects,
          context: testContexts,
          order: testOrder
        })
        const props = { section: sectionTypes.TODAY }
        expect(getTasksGroups(state, props)).toBeUndefined()
      })
    })
    describe('NEXT', () => {
      test('Should return tasks for NEXT', () => {
        const state = fromJS({
          task: testTasks1,
          project: testProjects,
          context: testContexts,
          order: testOrder
        })
        const groups = fromJS([
          {
            items: [
              {
                id: 'b41sogy3s0oc',
                title: 'Test task 0',
                completed: false,
                today: false,
                priority: PRIORITY_NONE
              },
              {
                id: 'b41sogy3s0od',
                title: 'Test task 1',
                completed: false,
                today: true,
                priority: PRIORITY_NONE
              },
              {
                id: 'b41sogy3s0ok',
                title: 'Test task 6',
                completed: false,
                today: false,
                priority: PRIORITY_NONE,
                contexts: List(['cf1sobz3s0oc'])
              },
              {
                id: 'b41sogy3s0ol',
                title: 'Test task 7',
                completed: false,
                today: true,
                priority: PRIORITY_NONE,
                contexts: List(['cf1sobz3s0oc'])
              },
              {
                id: 'b41sogy3s0om',
                title: 'Test task 8',
                completed: false,
                today: false,
                priority: PRIORITY_NONE,
                repeat: {
                  type: 'DAYS',
                  value: 4,
                  amount: -1
                }
              },
              {
                id: 'r51sogy3s02d',
                title: 'Test task 11',
                completed: false,
                today: true,
                priority: PRIORITY_NONE
              }
            ]
          },
          {
            title: 'Test project 0',
            id: 'bh52ogy5s0fm',
            items: [
              {
                id: 'b41sogy3s0oj',
                title: 'Test task 5',
                completed: false,
                today: true,
                priority: PRIORITY_NONE,
                project: 'bh52ogy5s0fm',
                contexts: List(['cf1sobz3s0oc'])
              }
            ]
          }
        ])
        const props = { section: sectionTypes.NEXT }
        expect(getTasksGroups(state, props)).toEqual(groups)
      })
      test('Should return latent tasks for NEXT', () => {
        const state = fromJS({
          task: testTasks2,
          project: testProjects,
          context: testContexts,
          order: testOrder,
          uiState: {
            sectionLatentTasks: {
              b41sogy3s0on: 1,
              b41sogy3s0op: 2
            }
          }
        })
        const groups = fromJS([
          {
            items: [
              {
                id: 'b41sogy3s0om',
                title: 'Test task 0',
                completed: false,
                today: false,
                priority: PRIORITY_NONE,
                contexts: List(['b07x7v4pu3e'])
              },
              {
                id: 'b41sogy3s0on',
                title: 'Test task 1',
                completed: true,
                today: true,
                priority: PRIORITY_NONE
              },
              {
                id: 'b41sogy3s0op',
                title: 'Test task 3',
                completed: true,
                today: false,
                priority: PRIORITY_NONE
              }
            ]
          }
        ])
        const props = { section: sectionTypes.NEXT }
        expect(getTasksGroups(state, props)).toEqual(groups)
      })
      test('Should return undefined for no tasks for NEXT', () => {
        const state = fromJS({
          task: {
            b41sogy3s0on: {
              id: 'b41sogy3s0on',
              title: 'Test task 1',
              completed: true,
              today: true,
              priority: PRIORITY_NONE
            },
            b41sogy3s0oo: {
              id: 'b41sogy3s0oo',
              title: 'Test task 2',
              completed: true,
              today: true,
              priority: PRIORITY_NONE
            }
          },
          project: testProjects,
          context: testContexts,
          order: testOrder
        })
        const props = { section: sectionTypes.NEXT }
        expect(getTasksGroups(state, props)).toBeUndefined()
      })
    })
    describe('PROJECT', () => {
      test('Should return tasks for PROJECT', () => {
        const state = fromJS({
          task: testTasks1,
          project: testProjects,
          context: testContexts,
          order: testOrder
        })
        const groups = fromJS([
          {
            items: [
              {
                id: 'b41sogy3s0oj',
                title: 'Test task 5',
                completed: false,
                today: true,
                priority: PRIORITY_NONE,
                project: 'bh52ogy5s0fm',
                contexts: List(['cf1sobz3s0oc'])
              }
            ]
          }
        ])
        const props = { section: 'bh52ogy5s0fm' }
        expect(getTasksGroups(state, props)).toEqual(groups)
      })
      test('Should return latent tasks for PROJECT', () => {
        const state = fromJS({
          task: testTasks2,
          project: testProjects,
          context: testContexts,
          order: testOrder,
          uiState: {
            sectionLatentTasks: {
              b41sogy3s0on: 1,
              b41sogy3s0op: 2,
              b41sogy3s0oq: 1
            }
          }
        })
        const groups = fromJS([
          {
            items: [
              {
                id: 'b41sogy3s0on',
                title: 'Test task 1',
                completed: true,
                today: true,
                priority: PRIORITY_NONE
              },
              {
                id: 'b41sogy3s0op',
                title: 'Test task 3',
                completed: true,
                today: false,
                priority: PRIORITY_NONE
              },
              {
                id: 'b41sogy3s0oq',
                title: 'Test task 4',
                completed: true,
                today: false,
                priority: PRIORITY_NONE,
                project: 'bh52ogy5s0fm'
              }
            ]
          }
        ])
        const props = { section: 'bh52ogy5s0fm' }
        expect(getTasksGroups(state, props)).toEqual(groups)
      })
      test('Should return undefined for no tasks for PROJECT', () => {
        const state = fromJS({
          task: testTasks2,
          project: testProjects,
          context: testContexts,
          order: testOrder
        })
        const props = { section: 'bh52ogy5s0fm' }
        expect(getTasksGroups(state, props)).toBeUndefined()
      })
      test('Should return undefined for empty PROJECT', () => {
        const state = fromJS({
          task: testTasks1,
          project: testProjects,
          context: testContexts,
          order: testOrder
        })
        const props = { section: 'bh52ogy5s0f1' }
        expect(getTasksGroups(state, props)).toBeUndefined()
      })
    })
    describe('CONTEXT', () => {
      test('Should return tasks for CONTEXT', () => {
        const state = fromJS({
          task: testTasks1,
          project: testProjects,
          context: testContexts,
          order: testOrder,
          uiState: {
            selectedSection: {
              type: sectionTypes.CONTEXT,
              id: 'cf1sobz3s0oc'
            }
          }
        })
        const groups = fromJS([
          {
            items: [
              {
                id: 'b41sogy3s0ok',
                title: 'Test task 6',
                completed: false,
                today: false,
                priority: PRIORITY_NONE,
                contexts: List(['cf1sobz3s0oc'])
              },
              {
                id: 'b41sogy3s0ol',
                title: 'Test task 7',
                completed: false,
                today: true,
                priority: PRIORITY_NONE,
                contexts: List(['cf1sobz3s0oc'])
              }
            ]
          },
          {
            title: 'Test project 0',
            id: 'bh52ogy5s0fm',
            items: [
              {
                id: 'b41sogy3s0oj',
                title: 'Test task 5',
                completed: false,
                today: true,
                priority: PRIORITY_NONE,
                project: 'bh52ogy5s0fm',
                contexts: List(['cf1sobz3s0oc'])
              }
            ]
          }
        ])
        const props = { section: 'cf1sobz3s0oc' }
        expect(getTasksGroups(state, props)).toEqual(groups)
      })
      test('Should return latent tasks for CONTEXT', () => {
        const state = fromJS({
          task: testTasks1,
          project: testProjects,
          context: testContexts,
          order: testOrder,
          uiState: {
            selectedSection: {
              type: sectionTypes.CONTEXT,
              id: 'cf1sobz3s0oc'
            },
            sectionLatentTasks: Map({
              b41sogy3s0od: 1
            })
          }
        })
        const groups = fromJS([
          {
            items: [
              {
                id: 'b41sogy3s0od',
                title: 'Test task 1',
                completed: false,
                today: true,
                priority: PRIORITY_NONE
              },
              {
                id: 'b41sogy3s0ok',
                title: 'Test task 6',
                completed: false,
                today: false,
                priority: PRIORITY_NONE,
                contexts: List(['cf1sobz3s0oc'])
              },
              {
                id: 'b41sogy3s0ol',
                title: 'Test task 7',
                completed: false,
                today: true,
                priority: PRIORITY_NONE,
                contexts: List(['cf1sobz3s0oc'])
              }
            ]
          },
          {
            title: 'Test project 0',
            id: 'bh52ogy5s0fm',
            items: [
              {
                id: 'b41sogy3s0oj',
                title: 'Test task 5',
                completed: false,
                today: true,
                priority: PRIORITY_NONE,
                project: 'bh52ogy5s0fm',
                contexts: List(['cf1sobz3s0oc'])
              }
            ]
          }
        ])
        const props = { section: 'cf1sobz3s0oc' }
        expect(getTasksGroups(state, props)).toEqual(groups)
      })
      test('Should return undefined for no tasks for CONTEXT', () => {
        const state = fromJS({
          task: testTasks2,
          project: testProjects,
          context: testContexts,
          order: testOrder
        })
        const props = { section: 'cf1sobz3s0o1' }
        expect(getTasksGroups(state, props)).toBeUndefined()
      })
    })

    test('Should return completed latent tasks even if they are completed', () => {
      const state = fromJS({
        task: [
          {
            id: 'b41sogy3s0om',
            title: 'Test task 0',
            completed: true,
            today: false,
            priority: PRIORITY_NONE,
            contexts: List(['b07x7v4pu3e'])
          },
          {
            id: 'b41sogy3s0on',
            title: 'Test task 1',
            completed: true,
            today: true,
            priority: PRIORITY_NONE
          }
        ],
        project: testProjects,
        context: testContexts,
        order: testOrder,
        uiState: {
          selectedSection: {
            type: sectionTypes.INBOX
          },
          sectionLatentTasks: {
            b41sogy3s0om: 1
          }
        }
      })
      const groups = fromJS([
        {
          items: [
            {
              id: 'b41sogy3s0om',
              title: 'Test task 0',
              completed: true,
              today: false,
              priority: PRIORITY_NONE,
              contexts: List(['b07x7v4pu3e'])
            }
          ]
        }
      ])

      expect(getTasksGroups(state)).toEqual(groups)
    })
  })
  test('Should return the same object is not related part of state had changed', () => {
    const state1 = fromJS({
      task: testTasks1,
      project: testProjects,
      context: testContexts,
      order: testOrder
    })
    const state2 = state1.setIn(['uiState', 'searchQuery'], 're')
    const props = { section: sectionTypes.TODAY }
    expect(getTasksGroups(state1, props)).toBe(getTasksGroups(state2, props))
  })
})

describe('getFilteredTasks selector', () => {
  it('should return filtered task groups', () => {
    const state = fromJS({
      task: testTasks1,
      project: testProjects,
      context: testContexts,
      order: testOrder,
      uiState: {
        searchQuery: 'task 1'
      }
    })
    const groups = fromJS([
      {
        items: [
          {
            id: 'b41sogy3s0od',
            title: 'Test task 1',
            completed: false,
            today: true,
            priority: PRIORITY_NONE
          },
          {
            id: 'r51sogy3s02d',
            title: 'Test task 11',
            completed: false,
            today: true,
            priority: PRIORITY_NONE
          }
        ]
      }
    ])
    expect(getFilteredTasks(state, { section: sectionTypes.NEXT })).toEqual(groups)
  })
  it('return undefined if there is no tasks', () => {
    const state = fromJS({
      task: {},
      project: testProjects,
      context: testContexts,
      order: testOrder,
      uiState: {
        searchQuery: 'task 1'
      }
    })
    expect(getFilteredTasks(state, { section: sectionTypes.NEXT })).toBeUndefined()
  })
})
