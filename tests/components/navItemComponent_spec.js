import { expect } from 'chai'
import React from 'react'
import { renderIntoDocument, findRenderedDOMComponentWithClass, scryRenderedDOMComponentsWithClass, Simulate, createRenderer } from 'react-addons-test-utils'
import * as sectionTypes from '../../src/constants/sectionTypes'
import * as sectionNames from '../../src/constants/sectionNames'

import { NavigationTitleClass } from '../../src/components/navigationItem/NavigationTitle'
import NavigationTextfield from '../../src/components/navigationItem/NavigationTextfield'

const connectDropTarget = element => element
const connectDragSource = element => element
const connectDragPreview = element => element

const testItem1 = {
  key: 0,
  type: sectionTypes.NEXT,
  title: sectionNames.NEXT,
  active: true,
  count: 4,
  editing: false,
  onItemClick: () => {},
  connectDropTarget,
  connectDragSource,
  connectDragPreview
}
const testItem2 = {
  key: 0,
  type: sectionTypes.NEXT,
  title: sectionNames.NEXT,
  active: false,
  editing: false,
  onItemClick: () => {},
  connectDropTarget,
  connectDragSource,
  connectDragPreview
}

const shallowRenderer = createRenderer()

describe('Navigation Item', () => {
  describe('Active item class', () => {
    it('Active element should has "is-active" class', () => {
      const itemComponent = renderIntoDocument(<NavigationTitleClass {...testItem1} />)
      const itemElement = findRenderedDOMComponentWithClass(itemComponent, 'nav-item')

      expect(itemElement.className).to.include('is-active')
    })
    it('Inactive element shouldn\'t has "is-active" class', () => {
      const itemComponent = renderIntoDocument(<NavigationTitleClass {...testItem2} />)
      const itemElement = findRenderedDOMComponentWithClass(itemComponent, 'nav-item')

      expect(itemElement.className).to.not.include('is-active')
    })
  })

  describe('Render not editing component', () => {
    it('Should render component', () => {
      const itemComponent = renderIntoDocument(<NavigationTitleClass {...testItem1}/>)
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
        onItemClick: (type) => callbackParametr1 = type,
        connectDropTarget,
        connectDragSource,
        connectDragPreview
      }

      const itemComponent = renderIntoDocument(<NavigationTitleClass {...testProps}/>)
      const itemElement = findRenderedDOMComponentWithClass(itemComponent, 'nav-item')

      expect(callbackParametr1).to.equal('')

      Simulate.click(itemElement)

      expect(callbackParametr1).to.equal(sectionTypes.NEXT)
    })
    it('Should invoke callback when clicked with type and id', () => {
      let callbackParametr1 = ''
      let callbackParametr2 = -12
      const testProps = {
        key: 'PROJECT-bh52ogy5s0fm',
        type: sectionTypes.PROJECT,
        title: 'Some project',
        id: 'bh52ogy5s0fm',
        active: true,
        count: 4,
        editing: false,
        onItemClick: (type, id) => {
          callbackParametr1 = type
          callbackParametr2 = id
        },
        connectDropTarget,
        connectDragSource,
        connectDragPreview
      }

      const itemComponent = renderIntoDocument(<NavigationTitleClass {...testProps}/>)
      const itemElement = findRenderedDOMComponentWithClass(itemComponent, 'nav-item')

      expect(callbackParametr1).to.equal('')
      expect(callbackParametr2).to.equal(-12)

      Simulate.click(itemElement)

      expect(callbackParametr1).to.equal(sectionTypes.PROJECT)
      expect(callbackParametr2).to.equal('bh52ogy5s0fm')
    })
  })

  describe('Render editing component', () => {
    it('Should render editing component', () => {
      const editingProps = {
        key: 'PROJECT-bh52ogy5s0fm',
        type: sectionTypes.PROJECT,
        title: 'Some project',
        id: 'bh52ogy5s0fm',
        active: false,
        count: 4,
        editing: true,
        onItemClick: () => {},
        connectDropTarget,
        connectDragSource,
        connectDragPreview
      }

      const itemComponent = renderIntoDocument(<NavigationTextfield {...editingProps}/>)
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
        key: 'PROJECT-bh52ogy5s0fm',
        type: sectionTypes.PROJECT,
        title: 'Some project',
        id: 'bh52ogy5s0fm',
        active: false,
        count: 4,
        editing: true,
        onStopEditing: (callback) => {item = callback},
        connectDropTarget,
        connectDragSource,
        connectDragPreview
      }

      const itemComponent = renderIntoDocument(<NavigationTextfield {...editingProps}/>)
      const editElement = findRenderedDOMComponentWithClass(itemComponent, 'nav-item__input')
      editElement.value = 'test'

      Simulate.keyDown(editElement, {keyCode:13})

      expect(item.type).to.equal(sectionTypes.PROJECT)
      expect(item.id).to.equal('bh52ogy5s0fm')
      expect(item.newTitle).to.equal('test')
    })

    it('Should invoke calback with type and id only when press esc', () => {
      let item = undefined
      const editingProps = {
        key: 'PROJECT-bh52ogy5s0fm',
        type: sectionTypes.PROJECT,
        title: 'Some project',
        id: 'bh52ogy5s0fm',
        active: false,
        count: 4,
        editing: true,
        onStopEditing: (callback) => {item = callback},
        connectDropTarget,
        connectDragSource,
        connectDragPreview
      }

      const itemComponent = renderIntoDocument(<NavigationTextfield {...editingProps}/>)
      const editElement = findRenderedDOMComponentWithClass(itemComponent, 'nav-item__input')
      editElement.value = 'test'

      Simulate.keyDown(editElement, {keyCode:27})

      expect(item.type).to.equal(sectionTypes.PROJECT)
      expect(item.id).to.equal('bh52ogy5s0fm')
      expect(item.newTitle).not.to.be.ok
    })

  })
})
