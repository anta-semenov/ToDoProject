import React from 'react'
import { createRenderer } from 'react-addons-test-utils'
import Today from '../../../src/components/elements/today/Today'

const shallowRenderer = createRenderer()

describe('Today component', () => {
  test('Should render component with right default classes', () => {
    shallowRenderer.render(<Today />)
    const today = shallowRenderer.getRenderOutput()

    expect(today.props.className).toBe('today today--default')
  })
  test('Should render component with right classes for passed props', () => {
    shallowRenderer.render(<Today checked={true} appearance={'task-info'} dimmed={true} />)
    const today1 = shallowRenderer.getRenderOutput()
    expect(today1.props.className).toBe('today today--task-info is-checked is-dimmed')

    shallowRenderer.render(<Today appearance={'tasks-list'} disabled={true}  />)
    const today2 = shallowRenderer.getRenderOutput()
    expect(today2.props.className).toBe('today today--tasks-list is-disabled')
  })
})
