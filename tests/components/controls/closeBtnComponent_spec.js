import { expect } from 'chai'
import React from 'react'
import { createRenderer } from 'react-addons-test-utils'
import CloseBtn from '../../../src/components/elements/closeBtn/CloseBtn'

const shallowRenderer = createRenderer()
describe('CloseBtn component', () => {
  it('Should render component with right class for empty appearance prop', () => {
    shallowRenderer.render(<CloseBtn />)
    const closeBtn = shallowRenderer.getRenderOutput()

    expect(closeBtn.props.className).to.equal('close close--default')
    expect(closeBtn.props.children).to.deep.equal(<div className='close__sign'/>)
  })
  it('Should render right class for particular appearance prop', () => {
    shallowRenderer.render(<CloseBtn appearance='task-info' />)
    const closeBtn = shallowRenderer.getRenderOutput()

    expect(closeBtn.props.className).to.equal('close close--task-info')
    expect(closeBtn.props.children).to.deep.equal(<div className='close__sign'/>)
  })
})
