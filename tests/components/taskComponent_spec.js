import { expect } from 'chai'
import React from 'react'
import ReactDOM from 'react-dom'
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, findRenderedDOMComponentWithClass} from 'react-addons-test-utils'
import { fromJS } from 'immutable'
import * as priorityLevels from '../../src/constants/priorityLevels'

import Task from '../../src/components/task/Task'

const testTasks = fromJS([
  {
    id: 0,
    title: 'Explore React',
    completed: true,
    today: true,
    description: 'Make Tutorial on oficial react website',
    priority: priorityLevels.PRIORITY_MEDIUM,
    date: 'Monday 15, 2016'
  },
  {
    id: 1,
    title: 'Explore Redux',
    completed: false,
    today: false
  }
])

describe('Task component tests', () => {
  it('Should render task title', () => {
    const titleTask = 'task__title'
    const taskComponent = renderIntoDocument(<Task title={testTasks.get(0).get('title')} />)
    const titleComponent = findRenderedDOMComponentWithClass(taskComponent, titleTask)

    expect(titleComponent.textContent).to.equal(testTasks.get(0).get('title'))
  })

  it('Should render complete checkbox', () => {
    const checkboxClass = 'task__checkbox'
    const taskComponent = renderIntoDocument(<Task completed={testTasks.get(0).get('completed')} />)
    const checkboxComponent = findRenderedDOMComponentWithClass(taskComponent, checkboxClass)

    expect(checkboxComponent.checked).to.equal(testTasks.get(0).get('completed'))
  })
  it('Should render uncomplete checkbox', () => {
    const checkboxClass = 'task__checkbox'
    const taskComponent = renderIntoDocument(<Task completed={testTasks.get(1).get('completed')} />)
    const checkboxComponent = findRenderedDOMComponentWithClass(taskComponent, checkboxClass)

    expect(checkboxComponent.checked).to.equal(testTasks.get(1).get('completed'))
  })
})