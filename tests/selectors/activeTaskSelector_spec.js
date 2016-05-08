import { expect } from 'chai'
import { fromJS } from 'immutable'
import * as activeTask from '../../src/selectors/activeTaskSelector'
import { PRIORITY_MEDIUM } from '../../src/constants/priorityLevels'

const state = fromJS({
  task: {
    b41sogy3s0oc: {
      id: 'b41sogy3s0oc',
      title: 'Test task 1',
      completed: true,
      today: false,
      priority: PRIORITY_MEDIUM,
      description: 'Description for test task',
      project: 'bh52ogy5s0fm',
      contexts: ['cf1sobz3s0o0', 'cf1sobz3s0o4', 'cf1sobz3s0o5'],
      date: new Date(2016, 5, 17)
    }
  },
  uiState: {
    activeItem: 'b41sogy3s0oc'
  }
})

describe('ActiveTask selector', () => {
  it('Should return active task title', () => {
    expect(activeTask.getTitle(state)).to.equal('Test task 1')
  })
  it('Should return active task completed state', () => {
    expect(activeTask.getCompleted(state)).to.equal(true)
  })
  it('Should return active task today state', () => {
    expect(activeTask.getToday(state)).to.equal(false)
  })
  it('Should return active task priority', () => {
    expect(activeTask.getPriority(state)).to.equal(PRIORITY_MEDIUM)
  })
  it('Should return active task description', () => {
    expect(activeTask.getDescription(state)).to.equal('Description for test task')
  })
  it('Should return active task project', () => {
    expect(activeTask.getProject(state)).to.equal('bh52ogy5s0fm')
  })
  it('Should return active task contexts', () => {
    expect(activeTask.getContexts(state)).to.equal(fromJS(['cf1sobz3s0o0', 'cf1sobz3s0o4', 'cf1sobz3s0o5']))
  })
  it('Should return active task date', () => {
    expect(activeTask.getDate(state)).to.deep.equal(new Date(2016, 5, 17))
  })
})
