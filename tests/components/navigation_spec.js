import { expect } from 'chai'
import React, { Component } from 'react'
import { renderIntoDocument, findRenderedDOMComponentWithClass, scryRenderedDOMComponentsWithClass, Simulate } from 'react-addons-test-utils'
import { fromJS } from 'immutable'
import * as sectionTypes from '../../src/constants/sectionTypes'
import * as sectionNames from '../../src/constants/sectionNames'
import * as navGroupTypes from '../../src/constants/navGroupTypes'

import Navigation from '../../src/components/navigation/Navigation'

describe('Navigation', () => {
  const testClickOnItem = () => {}
  const testAddNew = () => {}
  const testStopEditing = () => {}

  const testProps = {
    groups: [
      {
        type: navGroupTypes.BASIC,
        items: fromJS([
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
        ])
      },
      {
        type: navGroupTypes.CONTEXTS,
        title: sectionNames.CONTEXTS,
        items: fromJS([
          {
            type: sectionTypes.CONTEXT,
            title: 'Context 1',
            id: 2,
            active: true,
            count: 4,
            editing: false
          },
          {
            type: sectionTypes.CONTEXT,
            title: 'Context 2',
            id: 5,
            active: false,
            count: 10,
            editing: false
          }
        ]),
        onItemClick: testClickOnItem,
        onStopEditing: testStopEditing,
        addNewTitle:'+ context',
        addNew: testAddNew
      }
    ],
    nextProjectID: 13,
    nextContextID: 13,
    onItemClick: () => {},
    addNew: () => {},
    onStopEditing: () => {}
  }
  it('Should render correct amount of groups', () => {
    const navigationComponent = renderIntoDocument(<Navigation {...testProps} />)
    const groupComponents = scryRenderedDOMComponentsWithClass(navigationComponent, 'nav-group')

    expect(groupComponents.length).to.equal(2)
  })

  it('Should pass correct props to groupComponents', () => {
    const navGroupsProps = []
    Navigation.__Rewire__('NavigationGroup', class extends Component {
      render() {
        navGroupsProps.push(this.props)
        return null
      }
    })

    renderIntoDocument(<Navigation {...testProps} />)

    expect(navGroupsProps.length).to.equal(2)
    expect(navGroupsProps[0].type).to.equal(navGroupTypes.BASIC)
    expect(navGroupsProps[0].items.size).to.equal(3)
  })
})
