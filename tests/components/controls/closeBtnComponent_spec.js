import React from 'react'
import { shallow } from 'enzyme'
import CloseBtn from '../../../src/components/elements/closeBtn/CloseBtn'

describe('CloseBtn component', () => {
  test('Should render component with right class for empty appearance prop', () => {
    const closeBtn = shallow(<CloseBtn onClick={jest.fn()} />)
    expect(closeBtn).toMatchSnapshot()
  })
  test('Should render right class for particular appearance prop', () => {
    const closeBtn = shallow(<CloseBtn appearance="task-info" onClick={jest.fn()} />)
    expect(closeBtn).toMatchSnapshot()
  })
})
