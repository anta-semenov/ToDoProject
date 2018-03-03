import React from 'react'
import { renderIntoDocument, findRenderedDOMComponentWithClass, Simulate, createRenderer } from 'react-addons-test-utils'

import Checkbox from '../../../src/components/elements/checkbox/Checkbox'

const shallowRenderer = createRenderer()

describe('Checkbox component', () => {
  test('Should render component with right default classes', () => {
    shallowRenderer.render(<Checkbox />)
    const checkbox = shallowRenderer.getRenderOutput()

    expect(checkbox.props.className).toContain('checkbox--default')
      .and.not.include('checkbox--task-info').not.toContain('checkbox--tasks-list')
      .and.not.include('is-checked').not.toContain('is-dimmed')
  })
  test('Should render component with right classes for passed props', () => {
    shallowRenderer.render(<Checkbox appearance='task-info' dimmed={true} checked={true} />)
    const checkbox = shallowRenderer.getRenderOutput()

    expect(checkbox.props.className).toContain('checkbox--task-info')
      .to.include('is-checked').toContain('is-dimmed')
      .and.not.include('checkbox--tasks-list').not.toContain('checkbox--default')
  })
})
