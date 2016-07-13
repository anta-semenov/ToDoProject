import { expect } from 'chai'
import React from 'react'
import { renderIntoDocument, findRenderedDOMComponentWithClass, Simulate, createRenderer } from 'react-addons-test-utils'

import Checkbox from '../../../src/components/elements/checkbox/Checkbox'

const shallowRenderer = createRenderer()

describe('Checkbox component', () => {
  it('Should render component with right default classes', () => {
    shallowRenderer.render(<Checkbox />)
    const checkbox = shallowRenderer.getRenderOutput()

    expect(checkbox.props.className).to.include('checkbox--default')
      .and.not.include('checkbox--task-info')
      .and.not.include('checkbox--tasks-list')
      .and.not.include('is-active')
      .and.not.include('is-dimmed')
  })
  it('Should render component with right classes for passed props', () => {
    shallowRenderer.render(<Checkbox appearance='task-info' dimmed={true} checked={true} />)
    const checkbox = shallowRenderer.getRenderOutput()

    expect(checkbox.props.className)
      .to.include('checkbox--task-info')
      .to.include('is-active')
      .to.include('is-dimmed')
      .and.not.include('checkbox--tasks-list')
      .and.not.include('checkbox--default')
  })
})
