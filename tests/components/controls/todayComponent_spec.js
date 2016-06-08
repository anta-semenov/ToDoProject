import { expect } from 'chai'
import React from 'react'
import { renderIntoDocument, findRenderedDOMComponentWithClass, Simulate } from 'react-addons-test-utils'

import Today from '../../../src/components/elements/today/Today'

describe('Today component', () => {
  it('Should render component with right default classes', () => {
    const todayComponent = renderIntoDocument(<Today />)
    const todayElement = findRenderedDOMComponentWithClass(todayComponent, 'today')

    expect(todayElement.className).to.include('today--default')
      .and.not.include('today--task-info')
      .and.not.include('today--tasks-list')
      .and.not.include('is-checked')
      .and.not.include('is-dimmed')
      .and.not.include('is-disabled')
  })
  it('Should render component with right classes for passed props', () => {
    const todayComponent1 = renderIntoDocument(<Today checked={true} appearance={'task-info'} dimmed={true} />)
    const todayElement1 = findRenderedDOMComponentWithClass(todayComponent1, 'today')

    const todayComponent2 = renderIntoDocument(<Today appearance={'tasks-list'} disabled={true}  />)
    const todayElement2 = findRenderedDOMComponentWithClass(todayComponent2, 'today')

    expect(todayElement1.className)
      .to.include('today--task-info')
      .to.include('is-checked')
      .to.include('is-dimmed')
      .and.not.include('today--tasks-list')
      .and.not.include('today--default')
      .and.not.include('is-disabled')

    expect(todayElement2.className)
      .to.include('today--tasks-list')
      .to.include('is-disabled')
      .and.not.include('today--task-info')
      .and.not.include('today--default')
      .and.not.include('is-checked')
      .and.not.include('is-dimmed')
  })
  it('Should handle click on the element', () => {
    let id = -1
    const callback = () => id = 0
    const todayComponent = renderIntoDocument(<Today onClick={callback} />)
    const todayElement = findRenderedDOMComponentWithClass(todayComponent, 'today')

    expect(id).to.equal(-1)
    Simulate.click(todayElement)
    expect(id).to.equal(0)
  })
})
