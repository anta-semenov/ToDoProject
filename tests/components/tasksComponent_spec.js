import { fromJS } from 'immutable'
import React from 'react'
import { mount } from 'enzyme'

import Tasks from '../../src/components/tasks/Tasks'
import { NEXT } from '../../src/constants/sectionTypes'
import { AUTH_SUCESS } from '../../src/constants/authStatus'
import { DATA_RECIEVED } from '../../src/constants/dataStatuses'

const props = {
  dataStatus: DATA_RECIEVED,
  authStatus: AUTH_SUCESS,
  sectionName: 'Next',
  sectionType: NEXT,
  onSectionNameChange: jest.fn(),
  onSectionDelete: jest.fn(),
  onSectionComplete: jest.fn(),
  onTaskClick: jest.fn(),
  onTaskCheckboxClick: jest.fn(),
  onTaskTodayClick: jest.fn(),
  onTaskPriorityClick: jest.fn(),
  onTaskTrackingClick: jest.fn(),
  addTaskToProject: jest.fn(),
  addTaskContext: jest.fn(),
  addTask: jest.fn(),
  setSearchQuery: jest.fn()
}

describe('Tasks component tests', () => {
  it('Should render group list if it has one', () => {
    const groups = fromJS([
      {
        title: 'Group_1',
        items: []
      }
    ])
    const tasksComponent = mount(<Tasks groups={groups} {...props} />)
    expect(tasksComponent).toMatchSnapshot()
  })
  it('Should render empty element if there is no tasks', () => {
    const tasksComponent = mount(<Tasks {...props} />)
    expect(tasksComponent).toMatchSnapshot()
  })
})
