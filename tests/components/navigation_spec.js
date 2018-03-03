import React, { Component } from 'react'
import { renderIntoDocument, createRenderer } from 'react-addons-test-utils'
import { fromJS } from 'immutable'
import * as sectionTypes from '../../src/constants/sectionTypes'
import * as sectionNames from '../../src/constants/sectionNames'
import * as navGroupTypes from '../../src/constants/navGroupTypes'
import { DATA_RECIEVED } from '../../src/constants/dataStatuses'
import { AUTH_SUCESS } from '../../src/constants/authStatus'

import Navigation from '../../src/components/navigation/Navigation'

const shallowRenderer = createRenderer()

describe('Navigation', () => {
  Navigation.__Rewire__('NavigationGroup', class extends Component {
    render() {
      return <div className='nav-group' />
    }
  })
  Navigation.__Rewire__('DropScrollTarget', class extends Component {
    render() {
      return null
    }
  })
  const testClickOnItem = () => {}
  const testAddNew = () => {}
  const testStopEditing = () => {}

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
        addNewTitle:'+ context',
        addNew: testAddNew
      }
    ]),
    onItemClick: () => {},
    addNew: () => {},
    onStopEditing: () => {}
  }
  test('Should render correct amount of groups', () => {
    shallowRenderer.render(<Navigation {...testProps} />)
    const navigation = shallowRenderer.getRenderOutput()

    expect(navigation.props.children.length).toBe(3)
    expect(navigation.props.children[1].props.children.length).toBe(2)
  })

  test('Should pass correct props to groupComponents', () => {
    const navGroupsProps = []

    const onItemClickCallback = () => {return 1}
    const addNewCallback = () => {return 2}
    const onStopEditingCallback = () => {return 3}

    testProps.onItemClick = onItemClickCallback
    testProps.addNew = addNewCallback
    testProps.onStopEditing = onStopEditingCallback

    Navigation.__Rewire__('NavigationGroup', class extends Component {
      render() {
        navGroupsProps.push(this.props)
        return null
      }
    })

    renderIntoDocument(<Navigation {...testProps} />)

    expect(navGroupsProps.length).toBe(2)
    expect(navGroupsProps[0].type).toBe(navGroupTypes.BASIC)
    expect(navGroupsProps[0].items.size).toBe(3)
    expect(navGroupsProps[1].type).toBe(navGroupTypes.CONTEXTS)
    expect(navGroupsProps[1].title).toBe(sectionNames.CONTEXTS)
    expect(navGroupsProps[1].items.size).toBe(2)
    expect(navGroupsProps[0].nextContextID).toBe(undefined)
    expect(navGroupsProps[0].nextProjectID).toBe(undefined)
    expect(navGroupsProps[0].onItemClick).toBe(onItemClickCallback)
    expect(navGroupsProps[0].addNew).toBe(addNewCallback)
    expect(navGroupsProps[0].onStopEditing).toBe(onStopEditingCallback)
    expect(navGroupsProps[1].nextContextID).toBe(undefined)
    expect(navGroupsProps[1].nextProjectID).toBe(undefined)
    expect(navGroupsProps[1].onItemClick).toBe(onItemClickCallback)
    expect(navGroupsProps[1].addNew).toBe(addNewCallback)
    expect(navGroupsProps[1].onStopEditing).toBe(onStopEditingCallback)
  })
})
