import expect from 'chai'
import React from 'react'
import ReactDOM from 'react-dom'
import { renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils'

import TaskGroup from '../../src/components/TaskGroup'


describe('TaskGroup component tests', () => {
  it('Should render group name if it has one', () => {
    const groupName = 'Test group'
    const groupClassName='group__name'
    const taskClickHandler = () => {}
    const taskCheckboxClickHandler = () => {}
    const taskComponent = renderIntoDocument(
      <TaskGroup groupName = {groupName} tasks = {[]} onTaskClick={taskClickHandler} onTaskCheckboxClick={taskCheckboxClickHandler} />
    )
    const groupTitles = scryRenderedDOMComponentsWithClass(taskComponent, groupClassName)

    expect(groupTitles.lenght).to.equal(1)
    expect(groupTitles[0].textContent).to.equal(groupName)
  })
})
