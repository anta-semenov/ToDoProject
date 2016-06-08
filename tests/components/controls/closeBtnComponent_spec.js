import { expect } from 'chai'
import React from 'react'
import { renderIntoDocument, findRenderedDOMComponentWithClass, Simulate } from 'react-addons-test-utils'
import CloseBtn from '../../../src/components/elements/closeBtn/CloseBtn'

describe('CloseBtn component', () => {
  it('Should render component with right class for empty appearance prop', () => {
    const closeComponent = renderIntoDocument(<CloseBtn />)
    const closeBtn = findRenderedDOMComponentWithClass(closeComponent, 'close')
    const closeBtnSign = findRenderedDOMComponentWithClass(closeComponent, 'close__sign')

    expect(closeBtn.className).to.include('close--default')
    expect(closeBtnSign.className).to.equal('close__sign')
  })
  it('Should render right class for particular appearance prop', () => {
    const closeComponent = renderIntoDocument(<CloseBtn appearance='task-info' />)
    const closeBtn = findRenderedDOMComponentWithClass(closeComponent, 'close')
    const closeBtnSign = findRenderedDOMComponentWithClass(closeComponent, 'close__sign')

    expect(closeBtn.className).to.include('close--task-info')
    expect(closeBtnSign.className).to.equal('close__sign')
  })
  it('Should handle click on CloseBtn', () => {
    let id = -1
    const clickHandler = () => id = 1
    const closeComponent = renderIntoDocument(<CloseBtn onClick={clickHandler} />)
    const closeBtn = findRenderedDOMComponentWithClass(closeComponent, 'close')

    expect(id).to.equal(-1)
    Simulate.click(closeBtn)
    expect(id).to.equal(1)
  })
})
