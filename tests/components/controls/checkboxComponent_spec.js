import { expect } from 'chai'
import React from 'react'
import { renderIntoDocument, findRenderedDOMComponentWithClass, Simulate } from 'react-addons-test-utils'

import Checkbox from '../../../src/components/elements/checkbox/Checkbox'

describe('Checkbox component', () => {
  it('Should render component with right default classes', () => {
    const checkbox = renderIntoDocument(<Checkbox />)
    const checkboxElement = findRenderedDOMComponentWithClass(checkbox, 'checkbox')

    expect(checkboxElement.className).to.include('checkbox--default')
      .and.not.include('checkbox--task-info')
      .and.not.include('checkbox--tasks-list')
      .and.not.include('is-dimmed')
    expect(checkboxElement.checked).to.equal(false)
  })
  it('Should render component with right classes for passed props', () => {
    const checkbox = renderIntoDocument(<Checkbox checked={true} appearance={'task-info'} dimmed={true} />)
    const checkboxElement = findRenderedDOMComponentWithClass(checkbox, 'checkbox')

    expect(checkboxElement.className)
      .to.include('checkbox--task-info')
      .to.include('is-dimmed')
      .and.not.include('checkbox--tasks-list')
      .and.not.include('checkbox--default')
    expect(checkboxElement.checked).to.equal(true)
  })
  it('Should handle click on the element', () => {
    let id = -1
    const callback = () => id = 0
    const checkbox = renderIntoDocument(<Checkbox onClick={callback} />)
    const checkboxElement = findRenderedDOMComponentWithClass(checkbox, 'checkbox')

    expect(id).to.equal(-1)
    Simulate.click(checkboxElement)
    expect(id).to.equal(0)
  })
})
