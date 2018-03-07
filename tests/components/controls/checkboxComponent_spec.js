import React from 'react'
import { shallow } from 'enzyme'

import Checkbox from '../../../src/components/elements/checkbox/Checkbox'

describe('Checkbox component', () => {
  test('Should render component with right default classes', () => {
    const checkbox = shallow(<Checkbox onChange={jest.fn()} />)
    expect(checkbox).toMatchSnapshot()
  })
  test('Should render component with right classes for passed props', () => {
    const checkbox = shallow(
      <Checkbox appearance="task-info" dimmed={true} checked={true} onChange={jest.fn()} />
    )
    expect(checkbox).toMatchSnapshot()
  })
})
