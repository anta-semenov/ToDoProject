import { expect } from 'chai'
import * as types from '../../src/constants/actionTypes'
import * as actions from '../../src/actions/uiStateActions'
import * as sections from '../../src/constants/sectionTypes'
import * as items from '../../src/constants/itemTypes'

describe('UI state action creators', () => {
  it('Should create an action to set selected section', () => {
    const section = {
      type: sections.PROJECT,
      id: 0
    }
    const expectedAction = {
      type: types.SET_SELECTED_SECTION,
      section
    }
    expect(actions.setSelectedSection(section)).to.deep.equal(expectedAction)
  })

  it('Should create an action to set sidebar size', () => {
    const size = '250px'
    const expectedAction = {
      type: types.SET_SIDEBAR_SIZE,
      size
    }
    expect(actions.setSidebarSize(size)).to.deep.equal(expectedAction)
  })

  it('Should create an action to set active item', () => {
    const id = 2
    const expectedAction = {
      type: types.SET_ACTIVE_ITEM,
      id
    }
    expect(actions.setActiveItem(id)).to.deep.equal(expectedAction)
  })

  it('Should create an action to set editing item', () => {
    const section = {
      type: sections.PROJECT,
      id: 1
    }

    const expectedAction = {
      type: types.SET_EDITING_SECTION,
      section
    }

    expect(actions.setEditingSection(section)).to.deep.equal(expectedAction)
  })
  it('Should create an action to toggle task latency', () => {
    const expectedAction = {
      type: types.TOGGLE_TASK_LATENCY,
      id: 0
    }
    expect(actions.toggleTaskLatency(0)).to.deep.equal(expectedAction)
  })
  it('Should create an action to clear latent tasks', () => {
    const expectedAction = {
      type: types.CLEAR_LATENT_TASKS
    }
    expect(actions.clearLatentTasks()).to.deep.equal(expectedAction)
  })
})
