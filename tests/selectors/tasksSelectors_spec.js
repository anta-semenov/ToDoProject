import { expect } from 'chai'
import { fromJS } from 'immutable'
import { PRIORITY_NONE } from '../../src/constants/defaults'
import * as sectionTypes from '../../src/constants/sectionTypes'
import * as sectionNames from '../../src/constants/sectionNames'
import { getTasksGroups, getSectionName, getActiveItemID } from '../../src/selectors/tasksSelector'


const testTasks1 = fromJS([
  {
    id: 0,
    title: 'Test task 0',
    completed: false,
    today: false,
    priority: PRIORITY_NONE
  },
  {
    id: 1,
    title: 'Test task 1',
    completed: false,
    today: true,
    priority: PRIORITY_NONE
  },
  {
    id: 2,
    title: 'Test task 2',
    completed: true,
    today: true,
    priority: PRIORITY_NONE
  },
  {
    id: 3,
    title: 'Test task 3',
    completed: true,
    today: false,
    priority: PRIORITY_NONE
  },
  {
    id: 4,
    title: 'Test task 4',
    completed: true,
    today: false,
    priority: PRIORITY_NONE,
    project: 0
  },
  {
    id: 5,
    title: 'Test task 5',
    completed: false,
    today: true,
    priority: PRIORITY_NONE,
    project: 0,
    contexts: [0]
  },
  {
    id: 6,
    title: 'Test task 6',
    completed: false,
    today: false,
    priority: PRIORITY_NONE,
    contexts: [0]
  },
  {
    id: 7,
    title: 'Test task 7',
    completed: false,
    today: true,
    priority: PRIORITY_NONE,
    contexts: [0]
  }
])
const testTasks2 = fromJS([
  {
    id: 0,
    title: 'Test task 0',
    completed: true,
    today: false,
    priority: PRIORITY_NONE
  },
  {
    id: 1,
    title: 'Test task 1',
    completed: true,
    today: true,
    priority: PRIORITY_NONE
  },
  {
    id: 2,
    title: 'Test task 2',
    completed: true,
    today: true,
    priority: PRIORITY_NONE
  },
  {
    id: 3,
    title: 'Test task 3',
    completed: true,
    today: false,
    priority: PRIORITY_NONE
  },
  {
    id: 4,
    title: 'Test task 4',
    completed: true,
    today: false,
    priority: PRIORITY_NONE,
    project: 0
  },
  {
    id: 5,
    title: 'Test task 5',
    completed: true,
    today: false,
    priority: PRIORITY_NONE,
    project: 0,
    contexts: [0]
  },
  {
    id: 6,
    title: 'Test task 6',
    completed: true,
    today: false,
    priority: PRIORITY_NONE,
    contexts: [0]
  }
])
const testProjects = fromJS([
  {
    id: 0,
    title: 'Test project 0',
    completed: false
  },
  {
    id: 1,
    title: 'Test project 1',
    completed: false
  }
])
const testContexts = fromJS([
  {
    id: 0,
    title: 'Test context 0'
  },
  {
    id: 1,
    title: 'Test context 1'
  }
])

describe('Tasks Selectors', () => {
  describe('getTasksGroup selector', () => {
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
            id: 0,
            title: 'Test task 0',
            completed: false,
            today: false,
            priority: PRIORITY_NONE
          }
        ]
      }])

      expect(getTasksGroups(state)).to.equal(groups)
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
              id: 1,
              title: 'Test task 1',
              completed: false,
              today: true,
              priority: PRIORITY_NONE
            },
            {
              id: 7,
              title: 'Test task 7',
              completed: false,
              today: true,
              priority: PRIORITY_NONE,
              contexts: [0]
            }
          ]
        },
        {
          title: 'Test project 0',
          items: [
            {
              id: 5,
              title: 'Test task 5',
              completed: false,
              today: true,
              priority: PRIORITY_NONE,
              project: 0,
              contexts: [0]
            }
          ]
        }
      ])
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
              id: 0,
              title: 'Test task 0',
              completed: false,
              today: false,
              priority: PRIORITY_NONE
            },
            {
              id: 1,
              title: 'Test task 1',
              completed: false,
              today: true,
              priority: PRIORITY_NONE
            },
            {
              id: 6,
              title: 'Test task 6',
              completed: false,
              today: false,
              priority: PRIORITY_NONE,
              contexts: [0]
            },
            {
              id: 7,
              title: 'Test task 7',
              completed: false,
              today: true,
              priority: PRIORITY_NONE,
              contexts: [0]
            }
          ]
        },
        {
          title: 'Test project 0',
          items: [
            {
              id: 5,
              title: 'Test task 5',
              completed: false,
              today: true,
              priority: PRIORITY_NONE,
              project: 0,
              contexts: [0]
            }
          ]
        }
      ])
      expect(getTasksGroups(state)).to.equal(groups)
    })
    it('Should return undefined for no tasks for NEXT', () => {
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

    it('Should return tasks for PROJECT', () => {
      const state = fromJS({
        task: testTasks1,
        project: testProjects,
        context: testContexts,
        uiState: {
          selectedSection: {
            type: sectionTypes.PROJECT,
            id: 0
          }
        }
      })
      const groups = fromJS([
        {
          items: [
            {
              id: 5,
              title: 'Test task 5',
              completed: false,
              today: true,
              priority: PRIORITY_NONE,
              project: 0,
              contexts: [0]
            }
          ]
        }
      ])
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
            id: 0
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
            id: 1
          }
        }
      })
      expect(getTasksGroups(state)).to.equal(undefined)
    })

    it('Should return tasks for CONTEXT', () => {
      const state = fromJS({
        task: testTasks1,
        project: testProjects,
        context: testContexts,
        uiState: {
          selectedSection: {
            type: sectionTypes.CONTEXT,
            id: 0
          }
        }
      })
      const groups = fromJS([
        {
          items: [
            {
              id: 6,
              title: 'Test task 6',
              completed: false,
              today: false,
              priority: PRIORITY_NONE,
              contexts: [0]
            },
            {
              id: 7,
              title: 'Test task 7',
              completed: false,
              today: true,
              priority: PRIORITY_NONE,
              contexts: [0]
            }
          ]
        },
        {
          title: 'Test project 0',
          items: [
            {
              id: 5,
              title: 'Test task 5',
              completed: false,
              today: true,
              priority: PRIORITY_NONE,
              project: 0,
              contexts: [0]
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
            id: 0
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
            id: 1
          }
        }
      })
      expect(getTasksGroups(state)).to.equal(undefined)
    })

    it('Should return completed latent tasks even if they are completed', () => {
      const state = fromJS({
        task: testTasks2,
        project: testProjects,
        context: testContexts,
        uiState: {
          selectedSection: {
            type: sectionTypes.INBOX
          },
          sectionCompletedLatentTasks: [0]
        }
      })
      const groups = fromJS([{
        items: [
          {
            id: 0,
            title: 'Test task 0',
            completed: true,
            today: false,
            priority: PRIORITY_NONE
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
            id: 0
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
            id: 0
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
          activeItem: 2
        }
      })
      expect(getActiveItemID(state)).to.equal(2)
    })
    it('Should return -1 for empty active item', () => {
      const state = fromJS({
        uiState: {}
      })
      expect(getActiveItemID(state)).to.equal(-1)
    })
  })
})
