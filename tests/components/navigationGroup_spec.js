import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'
import * as sectionTypes from '../../src/constants/sectionTypes'
import * as sectionNames from '../../src/constants/sectionNames'
import * as navGroupTypes from '../../src/constants/navGroupTypes'

import NavigationGroup from '../../src/components/navigationGroup/NavigationGroup'

describe('Navigation Group', () => {
  const testGroup = {
    type: navGroupTypes.CONTEXTS,
    title: sectionNames.CONTEXTS,
    items: fromJS([
      {
        type: sectionTypes.CONTEXT,
        title: 'Context 1',
        id: 'cf1sobz3s0o2',
        active: true,
        count: 4,
        editing: false
      },
      {
        type: sectionTypes.CONTEXT,
        title: 'Context 2',
        id: 'cf1sobz3s0o5',
        active: false,
        count: 10,
        editing: false
      }
    ]),
    onItemClick: () => {},
    onStopEditing: () => {},
    addNewTitle: '+ context',
    addNew: () => {}
  }

  it('renders correct component tree', () => {
    const group = shallow(<NavigationGroup {...testGroup} />)
    expect(group).toMatchSnapshot()
  })
})
