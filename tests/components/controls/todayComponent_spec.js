import React from 'react'
import { shallow } from 'enzyme'
import Today from '../../../src/components/elements/today/Today'

describe('Today component', () => {
  test('Should render component with right default classes', () => {
    const closeBtn = shallow(<Today onClick={jest.fn()} />)
    expect(closeBtn).toMatchSnapshot()
  })
  test('Should render component with right classes for passed props', () => {
    const closeBtn1 = shallow(
      <Today checked={true} appearance={'task-info'} dimmed={true} onClick={jest.fn()} />
    )
    expect(closeBtn1).toMatchSnapshot()

    const closeBtn2 = shallow(
      <Today appearance={'tasks-list'} disabled={true} onClick={jest.fn()} />
    )
    expect(closeBtn2).toMatchSnapshot()
  })
})
