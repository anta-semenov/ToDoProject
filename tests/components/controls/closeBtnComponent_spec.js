import React from 'react'
import { createRenderer } from 'react-addons-test-utils'
import CloseBtn from '../../../src/components/elements/closeBtn/CloseBtn'

const shallowRenderer = createRenderer()
describe('CloseBtn component', () => {
  test(
    'Should render component with right class for empty appearance prop',
    () => {
      shallowRenderer.render(<CloseBtn />)
      const closeBtn = shallowRenderer.getRenderOutput()

      expect(closeBtn.props.className).toBe('close close--default')
      expect(closeBtn.props.children).toEqual(<div className='close__sign'/>)
    }
  )
  test('Should render right class for particular appearance prop', () => {
    shallowRenderer.render(<CloseBtn appearance='task-info' />)
    const closeBtn = shallowRenderer.getRenderOutput()

    expect(closeBtn.props.className).toBe('close close--task-info')
    expect(closeBtn.props.children).toEqual(<div className='close__sign'/>)
  })
})
