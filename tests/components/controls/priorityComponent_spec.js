import { expect } from 'chai'
import React from 'react'
import { renderIntoDocument, findRenderedDOMComponentWithClass, scryRenderedDOMComponentsWithClass, Simulate } from 'react-addons-test-utils'

import * as priorityLevels from '../../../src/constants/priorityLevels'
import Priority from '../../../src/components/elements/priority/Priority'

describe('Priority', () => {
  it('Should render priority component with right classes for default props', () => {
    const priority = renderIntoDocument(<Priority />)
    const priorityElement = findRenderedDOMComponentWithClass(priority, 'priority')
    const priorityLevelElements = scryRenderedDOMComponentsWithClass(priority, 'priority-level')

    expect(priorityElement.className)
      .to.include('priority--none')
      .and.include('priority--default')
      .and.not.include('is-disabled')
      .and.not.include('is-dimmed')
    expect(priorityLevelElements.length).to.equal(5)
    expect(priorityLevelElements[0].className).to.include('priority-level--none')
    expect(priorityLevelElements[1].className).to.include('priority-level--max')
    expect(priorityLevelElements[2].className).to.include('priority-level--high')
    expect(priorityLevelElements[3].className).to.include('priority-level--medium')
    expect(priorityLevelElements[4].className).to.include('priority-level--low')
  })
  it('Should render priority with right classes for custom props', () => {
    const priority = renderIntoDocument(<Priority appearance='task-info' priority={priorityLevels.PRIORITY_MEDIUM} disabled={true}/>)
    const priorityElement = findRenderedDOMComponentWithClass(priority, 'priority')

    expect(priorityElement.className)
      .to.include('priority--medium')
      .and.include('priority--task-info')
      .and.include('is-disabled')
      .and.not.include('is-dimmed')
      .and.not.include('priority--none')
      .and.not.include('priority--default')
  })
  it('Should invoke callback when click on priority level', () => {
    let priority = ''
    const callback = priorityLevel => priority = priorityLevel

    const priorityComponent = renderIntoDocument(<Priority onClick={callback} />)
    const priorityLevelComponentNone = findRenderedDOMComponentWithClass(priorityComponent, 'priority-level--none')
    const priorityLevelComponentLow = findRenderedDOMComponentWithClass(priorityComponent, 'priority-level--low')
    const priorityLevelComponentMedium = findRenderedDOMComponentWithClass(priorityComponent, 'priority-level--medium')
    const priorityLevelComponentHigh= findRenderedDOMComponentWithClass(priorityComponent, 'priority-level--high')
    const priorityLevelComponentMax = findRenderedDOMComponentWithClass(priorityComponent, 'priority-level--max')

    expect(priority).to.equal('')

    Simulate.click(priorityLevelComponentNone)
    expect(priority).to.equal(priorityLevels.PRIORITY_NONE)

    Simulate.click(priorityLevelComponentLow)
    expect(priority).to.equal(priorityLevels.PRIORITY_LOW)

    Simulate.click(priorityLevelComponentMedium)
    expect(priority).to.equal(priorityLevels.PRIORITY_MEDIUM)

    Simulate.click(priorityLevelComponentHigh)
    expect(priority).to.equal(priorityLevels.PRIORITY_HIGH)

    Simulate.click(priorityLevelComponentMax)
    expect(priority).to.equal(priorityLevels.PRIORITY_MAX)
  })
})
