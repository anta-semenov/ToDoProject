import { expect } from 'chai'
import { fromJS } from 'immutable'
import React from 'react'
import { renderIntoDocument, findRenderedDOMComponentWithClass, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils'

import Tasks from '../../src/components/tasks/Tasks'

describe('Tasks component tests',  () => {
  it('Should render group list if it has one', () => {
    const groups = fromJS([{
      title: 'Group_1',
      items: []
    }])
    const groupListClassName = 'tasks__list'
    const tasksComponent = renderIntoDocument(<Tasks groups={groups} />)
    const groupComponent = findRenderedDOMComponentWithClass(tasksComponent, groupListClassName)

    expect(groupComponent).to.not.be.an('error')
  })
  it('Should render empty element if there is no tasks', () => {
    const groupListClassName = 'tasks__list'
    const emptyClassName = 'tasks__empty-state'
    const tasksComponent = renderIntoDocument(<Tasks />)
    const groupComponent = scryRenderedDOMComponentsWithClass(tasksComponent, groupListClassName)
    const emptyElement = findRenderedDOMComponentWithClass(tasksComponent, emptyClassName)

    expect(emptyElement).to.not.be.an('error')
    expect(groupComponent.length).to.equal(0)
  })
})
