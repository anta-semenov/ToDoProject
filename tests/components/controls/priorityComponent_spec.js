import React from 'react'
import { shallow } from 'enzyme'

import * as priorityLevels from '../../../src/constants/priorityLevels'
import Priority from '../../../src/components/elements/priority/Priority'

describe('Priority', () => {
  test('Should render priority component with right classes for default props', () => {
    const closeBtn = shallow(<Priority onClick={jest.fn()} />)
    expect(closeBtn).toMatchSnapshot()
  })
  test('Should render priority with right classes for custom props', () => {
    const closeBtn = shallow(
      <Priority
        appearance="task-info"
        priority={priorityLevels.PRIORITY_MEDIUM}
        disabled={true}
        onClick={jest.fn()}
      />
    )
    expect(closeBtn).toMatchSnapshot()
  })
})
