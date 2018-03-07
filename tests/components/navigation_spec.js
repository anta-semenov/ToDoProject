import React, { Component } from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'
import * as sectionTypes from '../../src/constants/sectionTypes'
import * as sectionNames from '../../src/constants/sectionNames'
import * as navGroupTypes from '../../src/constants/navGroupTypes'
import { DATA_RECIEVED } from '../../src/constants/dataStatuses'
import { AUTH_SUCESS } from '../../src/constants/authStatus'

import Navigation from '../../src/components/navigation/Navigation'

describe('Navigation', () => {
  Navigation.__Rewire__(
    'NavigationGroup',
    class extends Component {
      render() {
        return <div className="nav-group" />
      }
    }
  )
  Navigation.__Rewire__(
    'DropScrollTarget',
    class extends Component {
      render() {
        return null
      }
    }
  )
  const testClickOnItem = jest.fn()
  const testAddNew = jest.fn()
  const testStopEditing = jest.fn()

  const testProps = {
    dataStatus: DATA_RECIEVED,
    authStatus: AUTH_SUCESS,
    groups: fromJS([
      {
        type: navGroupTypes.BASIC,
        items: [
          {
            type: sectionTypes.INBOX,
            title: sectionNames.INBOX,
            active: true,
            count: 3
          },
          {
            type: sectionTypes.TODAY,
            title: sectionNames.TODAY,
            active: false,
            count: 1
          },
          {
            type: sectionTypes.NEXT,
            title: sectionNames.NEXT,
            active: false
          }
        ]
      },
      {
        type: navGroupTypes.CONTEXTS,
        title: sectionNames.CONTEXTS,
        items: [
          {
            type: sectionTypes.CONTEXT,
            title: 'Context 1',
            id: 'cf1sobz3s0oc',
            active: true,
            count: 4,
            editing: false
          },
          {
            type: sectionTypes.CONTEXT,
            title: 'Context 2',
            id: 'cf1sobz3s0ol',
            active: false,
            count: 10,
            editing: false
          }
        ],
        onItemClick: testClickOnItem,
        onStopEditing: testStopEditing,
        addNewTitle: '+ context',
        addNew: testAddNew
      }
    ]),
    onItemClick: () => {},
    addNew: () => {},
    onStopEditing: () => {}
  }
  test('Should render correct component tree', () => {
    const navigation = mount(<Navigation {...testProps} />)
    expect(navigation).toMatchSnapshot()
  })
})
