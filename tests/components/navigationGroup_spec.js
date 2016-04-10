import { expect } from 'chai'
import React, { Component } from 'react'
import { renderIntoDocument, findRenderedDOMComponentWithClass, scryRenderedDOMComponentsWithClass, Simulate } from 'react-addons-test-utils'
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
    onItemClick: () => {},
    onStopEditing: () => {},
    addNewTitle:'+ context',
    addNew: () => {}
  }

  describe('Correct render', () => {
    it('Should render group title', () => {
      const groupComponent = renderIntoDocument(<NavigationGroup {...testGroup} />)
      const titleElement = findRenderedDOMComponentWithClass(groupComponent, 'nav-group__title')

      expect(titleElement.textContent).to.equal(sectionNames.CONTEXTS)
    })
    it('Should render correct count of items', () => {
      const groupComponent = renderIntoDocument(<NavigationGroup {...testGroup} />)
      const itemElements = scryRenderedDOMComponentsWithClass(groupComponent, 'nav-item')

      expect(itemElements.length).to.equal(2)
    })
    it('Should pass correct props to navigation items', () => {
      let itemElementProps
      NavigationGroup.__Rewire__('NavigationItem', class extends Component {
        render() {
          itemElementProps = this.props
          return(
            null
          )
        }
      })

      const itemClickCallback = () => {return 1}
      const itemStopEditCallback = () => {return 2}

      testGroup.onItemClick = itemClickCallback
      testGroup.onStopEditing = itemStopEditCallback

      renderIntoDocument(<NavigationGroup {...testGroup} />)

      NavigationGroup.__ResetDependency__('NavigationItem')

      expect(itemElementProps.type).to.equal(sectionTypes.CONTEXT)
      expect(itemElementProps.title).to.equal('Context 2')
      expect(itemElementProps.id).to.equal(5)
      expect(itemElementProps.active).to.equal(false)
      expect(itemElementProps.count).to.equal(10)
      expect(itemElementProps.editing).to.equal(false)
      expect(itemElementProps.onItemClick).to.equal(itemClickCallback)
      expect(itemElementProps.onStopEditing).to.equal(itemStopEditCallback)
    })
  })

  describe('Add button render', () => {
    it('Should render addButton titile', () => {
      const groupComponent = renderIntoDocument(<NavigationGroup {...testGroup} />)
      const addButtonComponent = findRenderedDOMComponentWithClass(groupComponent, 'nav-group__add-button')

      expect(addButtonComponent.textContent).to.equal('+ context')
    })

    it('Should invoke addButton callback when clicked', () => {
      let callback = -12
      testGroup.addNew = () => {callback = 12}

      const groupComponent = renderIntoDocument(<NavigationGroup {...testGroup} />)
      const addButton = findRenderedDOMComponentWithClass(groupComponent, 'nav-group__add-button')

      expect(callback).to.equal(-12)

      Simulate.click(addButton)

      expect(callback).to.equal(12)
    })
  })
})
