import { expect } from 'chai'
import React from 'react'
import ReactDOM from 'react-dom'
import { renderIntoDocument, scryRenderedDOMComponentsWithClass, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils'
import { fromJS } from 'immutable'

import TaskGroup from '../../src/components/taskGroup/TaskGroup'


describe('TaskGroup component tests', () => {
  it('Should render group name if it has one', () => {
    const groupName = 'Test group'
    const groupClassName='group__name'
    const groupComponent = renderIntoDocument(<TaskGroup groupName={groupName} tasks={[]} />)
    const groupTitles = scryRenderedDOMComponentsWithClass(groupComponent, groupClassName)
    expect(groupTitles.length).to.equal(1)
    expect(groupTitles[0].textContent).to.equal(groupName)
  })
  it('Should not render group name if it has not one', () => {
    const groupClassName='group__name'
    const groupComponent = renderIntoDocument(<TaskGroup tasks={[]} />)
    const groupTitles = scryRenderedDOMComponentsWithClass(groupComponent, groupClassName)
    expect(groupTitles.length).to.equal(0)
  })

  it('Should render correct amount of task', () => {
    const taskClass = 'task'
    const tasks = fromJS([
      {
        id: 0,
        title: 'Explore React'
      },
      {
        id: 1,
        title: 'Explore Redux'
      }
    ])
    const groupComponent = renderIntoDocument(<TaskGroup tasks={tasks} />)
    const tasksComponents = scryRenderedDOMComponentsWithTag(groupComponent, 'li')
    expect(tasksComponents.length).to.equal(2)
    expect(tasksComponents[0].className).to.equal(taskClass)
  })

  it('Should pass correct properties to task component', () => {
    const taskTitleClass = 'task__title'
    const tasks = fromJS([
      {
        id: 0,
        title: 'Explore React'
      },
      {
        id: 1,
        title: 'Explore Redux'
      }
    ])
    const groupComponent = renderIntoDocument(<TaskGroup tasks={tasks} />)
    const taskTitlesComponents = scryRenderedDOMComponentsWithClass(groupComponent, taskTitleClass)
    expect(taskTitlesComponents.length).to.equal(2)
    expect(taskTitlesComponents[0].textContent).to.equal(tasks.get(0).get('title'))
  })
})
