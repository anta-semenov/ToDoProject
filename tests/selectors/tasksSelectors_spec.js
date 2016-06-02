import { expect } from 'chai'
import { fromJS, Map, Set } from 'immutable'
import { PRIORITY_NONE } from '../../src/constants/defaults'
import * as sectionTypes from '../../src/constants/sectionTypes'
import * as sectionNames from '../../src/constants/sectionNames'
import { getTasksGroups, getSectionName, getActiveItemID } from '../../src/selectors/tasksSelector'

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
    contexts: Set(['cf1sobz3s0oc'])
  },
  b41sogy3s0ok: {
    id: 'b41sogy3s0ok',
    title: 'Test task 6',
    completed: false,
    today: false,
    priority: PRIORITY_NONE,
    contexts: Set(['cf1sobz3s0oc'])
  },
  b41sogy3s0ol: {
    id: 'b41sogy3s0ol',
    title: 'Test task 7',
    completed: false,
    today: true,
    priority: PRIORITY_NONE,
    contexts: Set(['cf1sobz3s0oc'])
  }
})
const testTasks2 = fromJS({
  b41sogy3s0om: {
    id: 'b41sogy3s0om',
    title: 'Test task 0',
    completed: false,
    today: false,
    priority: PRIORITY_NONE,
    contexts: Set(['b07x7v4pu3e'])
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
    contexts: Set(['cf1sobz3s0oc'])
  },
  b41sogy3s0os: {
    id: 'b41sogy3s0os',
    title: 'Test task 6',
    completed: true,
    today: false,
    priority: PRIORITY_NONE,
    contexts: Set(['cf1sobz3s0oc'])
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

describe('Tasks Selectors', () => {
  describe('getTasksGroup selector', () => {
    describe('INBOX', () => {
      it('Should return tasks for INBOX', () => {
        const state = fromJS({
          task: testTasks1,
          project: testProjects,
          context: testContexts,
          uiState: {
            selectedSection: {
              type: sectionTypes.INBOX
            }
          }
        })
        const groups = fromJS([{
          items: [
            {
              id: 'b41sogy3s0oc',
              title: 'Test task 0',
              completed: false,
              today: false,
              priority: PRIORITY_NONE
            }
          ]
        }])

        expect(getTasksGroups(state)).to.deep.equal(groups)
      })
      it('Should return latent tasks for INBOX section', () => {
        const state = fromJS({
          task: testTasks2,
          project: testProjects,
          context: testContexts,
          uiState: {
            selectedSection: {
              type: sectionTypes.INBOX
            },
            sectionLatentTasks: {
              b41sogy3s0om: 2,
              b41sogy3s0on: 1
            }
          }
        })
        const groups = fromJS([{
          items: [
            {
              id: 'b41sogy3s0om',
              title: 'Test task 0',
              completed: false,
              today: false,
              priority: PRIORITY_NONE,
              contexts: Set(['b07x7v4pu3e'])
            },
            {
              id: 'b41sogy3s0on',
              title: 'Test task 1',
              completed: true,
              today: true,
              priority: PRIORITY_NONE
            }
          ]
        }])
        expect(getTasksGroups(state)).to.deep.equal(groups)
      })
      it('Should return undefined for no tasks for INBOX', () => {
        const state = fromJS({
          task: testTasks2,
          project: testProjects,
          context: testContexts,
          uiState: {
            selectedSection: {
              type: sectionTypes.INBOX
            }
          }
        })
        expect(getTasksGroups(state)).to.equal(undefined)
      })
    })
    describe('TODAY', () => {
      it('Should return tasks for TODAY', () => {
        const state = fromJS({
          task: testTasks1,
          project: testProjects,
          context: testContexts,
          uiState: {
            selectedSection: {
              type: sectionTypes.TODAY
            }
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
                id: 'b41sogy3s0ol',
                title: 'Test task 7',
                completed: false,
                today: true,
                priority: PRIORITY_NONE,
                contexts: Set(['cf1sobz3s0oc'])
              }
            ]
          },
          {
            title: 'Test project 0',
            items: [
              {
                id: 'b41sogy3s0oj',
                title: 'Test task 5',
                completed: false,
                today: true,
                priority: PRIORITY_NONE,
                project: 'bh52ogy5s0fm',
                contexts: Set(['cf1sobz3s0oc'])
              }
            ]
          }
        ])
        expect(getTasksGroups(state)).to.equal(groups)
      })
      it('Should return latent tasks for TODAY', () => {
        const state = fromJS({
          task: testTasks2,
          project: testProjects,
          context: testContexts,
          uiState: {
            selectedSection: {
              type: sectionTypes.TODAY
            },
            sectionLatentTasks: {
              b41sogy3s0om: 2,
              b41sogy3s0oo: 1
            }
          }
        })
        const groups = fromJS([{
          items: [
            {
              id: 'b41sogy3s0om',
              title: 'Test task 0',
              completed: false,
              today: false,
              priority: PRIORITY_NONE,
              contexts: Set(['b07x7v4pu3e'])
            },
            {
              id: 'b41sogy3s0oo',
              title: 'Test task 2',
              completed: true,
              today: true,
              priority: PRIORITY_NONE
            }
          ]
        }])
        expect(getTasksGroups(state)).to.equal(groups)
      })
      it('Should return undefined for no tasks for TODAY', () => {
        const state = fromJS({
          task: testTasks2,
          project: testProjects,
          context: testContexts,
          uiState: {
            selectedSection: {
              type: sectionTypes.TODAY
            }
          }
        })
        expect(getTasksGroups(state)).to.equal(undefined)
      })
    })
    describe('NEXT', () => {
      it('Should return tasks for NEXT', () => {
        const state = fromJS({
          task: testTasks1,
          project: testProjects,
          context: testContexts,
          uiState: {
            selectedSection: {
              type: sectionTypes.NEXT
            }
          }
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
                contexts: Set(['cf1sobz3s0oc'])
              },
              {
                id: 'b41sogy3s0ol',
                title: 'Test task 7',
                completed: false,
                today: true,
                priority: PRIORITY_NONE,
                contexts: Set(['cf1sobz3s0oc'])
              }
            ]
          },
          {
            title: 'Test project 0',
            items: [
              {
                id: 'b41sogy3s0oj',
                title: 'Test task 5',
                completed: false,
                today: true,
                priority: PRIORITY_NONE,
                project: 'bh52ogy5s0fm',
                contexts: Set(['cf1sobz3s0oc'])
              }
            ]
          }
        ])
        expect(getTasksGroups(state)).to.equal(groups)
      })
      it('Should return latent tasks for NEXT', () => {
        const state = fromJS({
          task: testTasks2,
          project: testProjects,
          context: testContexts,
          uiState: {
            selectedSection: {
              type: sectionTypes.NEXT
            },
            sectionLatentTasks: {
              b41sogy3s0on: 1,
              b41sogy3s0op: 2
            }
          }
        })
        const groups = fromJS([{
          items: [
            {
              id: 'b41sogy3s0om',
              title: 'Test task 0',
              completed: false,
              today: false,
              priority: PRIORITY_NONE,
              contexts: Set(['b07x7v4pu3e'])
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
        }])
        expect(getTasksGroups(state)).to.equal(groups)
      })
      it('Should return undefined for no tasks for NEXT', () => {
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
          uiState: {
            selectedSection: {
              type: sectionTypes.NEXT
            }
          }
        })
        expect(getTasksGroups(state)).to.equal(undefined)
      })
    })
    describe('PROJECT', () => {
      it('Should return tasks for PROJECT', () => {
        const state = fromJS({
          task: testTasks1,
          project: testProjects,
          context: testContexts,
          uiState: {
            selectedSection: {
              type: sectionTypes.PROJECT,
              id: 'bh52ogy5s0fm'
            }
          }
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
                contexts: Set(['cf1sobz3s0oc'])
              }
            ]
          }
        ])
        expect(getTasksGroups(state)).to.equal(groups)
      })
      it('Should return latent tasks for PROJECT', () => {
        const state = fromJS({
          task: testTasks2,
          project: testProjects,
          context: testContexts,
          uiState: {
            selectedSection: {
              type: sectionTypes.PROJECT,
              id: 'bh52ogy5s0fm'
            },
            sectionLatentTasks: {
              b41sogy3s0on: 1,
              b41sogy3s0op: 2,
              b41sogy3s0oq: 1
            }
          }
        })
        const groups = fromJS([{
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
        }])
        expect(getTasksGroups(state)).to.equal(groups)
      })
      it('Should return undefined for no tasks for PROJECT', () => {
        const state = fromJS({
          task: testTasks2,
          project: testProjects,
          context: testContexts,
          uiState: {
            selectedSection: {
              type: sectionTypes.PROJECT,
              id: 'bh52ogy5s0fm'
            }
          }
        })
        expect(getTasksGroups(state)).to.equal(undefined)
      })
      it('Should return undefined for empty PROJECT', () => {
        const state = fromJS({
          task: testTasks1,
          project: testProjects,
          context: testContexts,
          uiState: {
            selectedSection: {
              type: sectionTypes.PROJECT,
              id: 'bh52ogy5s0f1'
            }
          }
        })
        expect(getTasksGroups(state)).to.equal(undefined)
      })
    })
    describe('CONTEXT', () => {
      it('Should return tasks for CONTEXT', () => {
        const state = fromJS({
          task: testTasks1,
          project: testProjects,
          context: testContexts,
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
                contexts: Set(['cf1sobz3s0oc'])
              },
              {
                id: 'b41sogy3s0ol',
                title: 'Test task 7',
                completed: false,
                today: true,
                priority: PRIORITY_NONE,
                contexts: Set(['cf1sobz3s0oc'])
              }
            ]
          },
          {
            title: 'Test project 0',
            items: [
              {
                id: 'b41sogy3s0oj',
                title: 'Test task 5',
                completed: false,
                today: true,
                priority: PRIORITY_NONE,
                project: 'bh52ogy5s0fm',
                contexts: Set(['cf1sobz3s0oc'])
              }
            ]
          }
        ])
        expect(getTasksGroups(state)).to.equal(groups)
      })
      it('Should return latent tasks for CONTEXT', () => {
        const state = fromJS({
          task: testTasks1,
          project: testProjects,
          context: testContexts,
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
                contexts: Set(['cf1sobz3s0oc'])
              },
              {
                id: 'b41sogy3s0ol',
                title: 'Test task 7',
                completed: false,
                today: true,
                priority: PRIORITY_NONE,
                contexts: Set(['cf1sobz3s0oc'])
              }
            ]
          },
          {
            title: 'Test project 0',
            items: [
              {
                id: 'b41sogy3s0oj',
                title: 'Test task 5',
                completed: false,
                today: true,
                priority: PRIORITY_NONE,
                project: 'bh52ogy5s0fm',
                contexts: Set(['cf1sobz3s0oc'])
              }
            ]
          }
        ])
        expect(getTasksGroups(state)).to.equal(groups)
      })
      it('Should return undefined for no tasks for CONTEXT', () => {
        const state = fromJS({
          task: testTasks2,
          project: testProjects,
          context: testContexts,
          uiState: {
            selectedSection: {
              type: sectionTypes.CONTEXT,
              id: 'cf1sobz3s0oc'
            }
          }
        })
        expect(getTasksGroups(state)).to.equal(undefined)
      })
      it('Should return undefined for empty CONTEXT', () => {
        const state = fromJS({
          task: testTasks1,
          project: testProjects,
          context: testContexts,
          uiState: {
            selectedSection: {
              type: sectionTypes.CONTEXT,
              id: 'cf1sobz3s0o1'
            }
          }
        })
        expect(getTasksGroups(state)).to.equal(undefined)
      })
    })

    it('Should return completed latent tasks even if they are completed', () => {
      const state = fromJS({
        task: [
          {
            id: 'b41sogy3s0om',
            title: 'Test task 0',
            completed: true,
            today: false,
            priority: PRIORITY_NONE,
            contexts: Set(['b07x7v4pu3e'])
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
        uiState: {
          selectedSection: {
            type: sectionTypes.INBOX
          },
          sectionLatentTasks: {
            b41sogy3s0om: 1
          }
        }
      })
      const groups = fromJS([{
        items: [
          {
            id: 'b41sogy3s0om',
            title: 'Test task 0',
            completed: true,
            today: false,
            priority: PRIORITY_NONE,
            contexts: Set(['b07x7v4pu3e'])
          }
        ]
      }])

      expect(getTasksGroups(state)).to.equal(groups)
    })
  })
  describe('getSectionName selector', () => {
    it('Should return name for INBOX', () => {
      const state = fromJS({
        uiState: {
          selectedSection: {
            type: sectionTypes.INBOX
          }
        }
      })
      expect(getSectionName(state)).to.equal(sectionNames.INBOX)
    })
    it('Should return name for TODAY', () => {
      const state = fromJS({
        uiState: {
          selectedSection: {
            type: sectionTypes.TODAY
          }
        }
      })
      expect(getSectionName(state)).to.equal(sectionNames.TODAY)
    })
    it('Should return name for NEXT', () => {
      const state = fromJS({
        uiState: {
          selectedSection: {
            type: sectionTypes.NEXT
          }
        }
      })
      expect(getSectionName(state)).to.equal(sectionNames.NEXT)
    })
    it('Should return name for PROJECT', () => {
      const state = fromJS({
        project: testProjects,
        uiState: {
          selectedSection: {
            type: sectionTypes.PROJECT,
            id: 'bh52ogy5s0fm'
          }
        }
      })
      expect(getSectionName(state)).to.equal('Test project 0')
    })
    it('Should return name for CONTEXT', () => {
      const state = fromJS({
        context: testContexts,
        uiState: {
          selectedSection: {
            type: sectionTypes.CONTEXT,
            id: 'cf1sobz3s0oc'
          }
        }
      })
      expect(getSectionName(state)).to.equal('Test context 0')
    })
  })
  describe('getActiveItemID selector', () => {
    it('Should return active item id', () => {
      const state = fromJS({
        uiState: {
          activeItem: 'b41sogy3s0oe'
        }
      })
      expect(getActiveItemID(state)).to.equal('b41sogy3s0oe')
    })
    it('Should return -1 for empty active item', () => {
      const state = fromJS({
        uiState: {}
      })
      expect(getActiveItemID(state)).to.equal('')
    })
  })
})
