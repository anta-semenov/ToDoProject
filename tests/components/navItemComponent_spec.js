import { expect } from 'chai'
import React from 'react'
import ReactDOM from 'react-dom'
import { renderIntoDocument, findRenderedDOMComponentWithClass, scryRenderedDOMComponentsWithClass, Simulate } from 'react-addons-test-utils'
import { fromJS } from 'immutable'
import * as sectionTypes from '../../src/constants/sectionTypes'
import * as sectionNames from '../../src/constants/sectionNames'

import NavigationItem from '../../src/components/navigationItem/NavigationItem'

const testItem1 = {
  key: 0,
  type: sectionTypes.NEXT,
  title: sectionNames.NEXT,
  active: true,
  count: 4,
  editing: false,
  onItemClick: () => {}
}
const testItem2 = {
  key: 0,
  type: sectionTypes.NEXT,
  title: sectionNames.NEXT,
  active: false,
  editing: false,
  onItemClick: () => {}
}

describe('Navigation Item', () => {
  describe('Active item class', () => {
    it('Active element should has "is-active" class', () => {
      const itemComponent = renderIntoDocument(<NavigationItem {...testItem1} />)
      const itemElement = findRenderedDOMComponentWithClass(itemComponent, 'nav-item')

      expect(itemElement.className).to.include('is-active')
    })
    it('Inactive element shouldn\'t has "is-active" class', () => {
      const itemComponent = renderIntoDocument(<NavigationItem {...testItem2} />)
      const itemElement = findRenderedDOMComponentWithClass(itemComponent, 'nav-item')

      expect(itemElement.className).to.not.include('is-active')
    })
  })

  describe('Render not editing component', () => {
    it('Should render component', () => {
      const itemComponent = renderIntoDocument(<NavigationItem {...testItem1}/>)
      const titleElement = findRenderedDOMComponentWithClass(itemComponent, 'nav-item__title')
      const countElement = findRenderedDOMComponentWithClass(itemComponent, 'nav-item__count')
      const editElements = scryRenderedDOMComponentsWithClass(itemComponent, 'nav-item__input')

      expect(titleElement.textContent).to.equal(sectionNames.NEXT)
      expect(countElement.textContent).to.equal('4')
      expect(editElements.length).to.equal(0)
    })
    it('Should invoke callback when clicked with type', () => {
      let callbackParametr1 = ''
      const testProps = {
        key: 0,
        type: sectionTypes.NEXT,
        title: sectionNames.NEXT,
        active: true,
        count: 4,
        editing: false,
        onItemClick: (type) => callbackParametr1 = type
      }

      const itemComponent = renderIntoDocument(<NavigationItem {...testProps}/>)
      const itemElement = findRenderedDOMComponentWithClass(itemComponent, 'nav-item')

      expect(callbackParametr1).to.equal('')

      Simulate.click(itemElement)

      expect(callbackParametr1).to.equal(sectionTypes.NEXT)
    })
    it('Should invoke callback when clicked with type and id', () => {
      let callbackParametr1 = ''
      let callbackParametr2 = -12
      const testProps = {
        key: 0,
        type: sectionTypes.PROJECT,
        title: 'Some project',
        id: 2,
        active: true,
        count: 4,
        editing: false,
        onItemClick: (type, id) => {
          callbackParametr1 = type
          callbackParametr2 = id
        }
      }

      const itemComponent = renderIntoDocument(<NavigationItem {...testProps}/>)
      const itemElement = findRenderedDOMComponentWithClass(itemComponent, 'nav-item')

      expect(callbackParametr1).to.equal('')
      expect(callbackParametr2).to.equal(-12)

      Simulate.click(itemElement)

      expect(callbackParametr1).to.equal(sectionTypes.PROJECT)
      expect(callbackParametr2).to.equal(2)
    })
  })

  describe('Render editing component', () => {
    it('Should render editing component', () => {
      const editingProps = {
        key: 3,
        type: sectionTypes.PROJECT,
        title: 'Some project',
        id: 2,
        active: false,
        count: 4,
        editing: true,
        onItemClick: () => {}
      }

      const itemComponent = renderIntoDocument(<NavigationItem {...editingProps}/>)
      const titleElement = scryRenderedDOMComponentsWithClass(itemComponent, 'nav-item__title')
      const countElement = scryRenderedDOMComponentsWithClass(itemComponent, 'nav-item__count')
      const editElement = findRenderedDOMComponentWithClass(itemComponent, 'nav-item__input')

      expect(titleElement.length).to.equal(0)
      expect(countElement.length).to.equal(0)
      expect(editElement.textContent).to.equal('')
      expect(editElement._attributes.placeholder._valueForAttrModified).to.equal('Some project')
    })
    it('Should invoke calback with type, id and new title when press enter', () => {
      let item = undefined
      const editingProps = {
        key: 3,
        type: sectionTypes.PROJECT,
        title: 'Some project',
        id: 2,
        active: false,
        count: 4,
        editing: true,
        onStopEditing: (callback) => {item = callback}
      }

      const itemComponent = renderIntoDocument(<NavigationItem {...editingProps}/>)
      const editElement = findRenderedDOMComponentWithClass(itemComponent, 'nav-item__input')
      editElement.value = 'test'

      Simulate.keyDown(editElement, {keyCode:13})

      expect(item.type).to.equal(sectionTypes.PROJECT)
      expect(item.id).to.equal(2)
      expect(item.newTitle).to.equal('test')
    })

    it('Should invoke calback with type and id only when press esc', () => {
      let item = undefined
      const editingProps = {
        key: 3,
        type: sectionTypes.PROJECT,
        title: 'Some project',
        id: 2,
        active: false,
        count: 4,
        editing: true,
        onStopEditing: (callback) => {item = callback}
      }

      const itemComponent = renderIntoDocument(<NavigationItem {...editingProps}/>)
      const editElement = findRenderedDOMComponentWithClass(itemComponent, 'nav-item__input')
      editElement.value = 'test'

      Simulate.keyDown(editElement, {keyCode:27})

      expect(item.type).to.equal(sectionTypes.PROJECT)
      expect(item.id).to.equal(2)
      expect(item.newTitle).not.to.be.ok
    })

  })
})
