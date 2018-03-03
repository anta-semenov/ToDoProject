import React from 'react'
import { renderIntoDocument, findRenderedDOMComponentWithClass, scryRenderedDOMComponentsWithClass, Simulate } from 'react-addons-test-utils'
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

describe('Navigation Item', () => {
  describe('Active item class', () => {
    test('Active element should has "is-active" class', () => {
      const itemComponent = renderIntoDocument(<NavigationTitleClass {...testItem1} />)
      const itemElement = findRenderedDOMComponentWithClass(itemComponent, 'nav-item')

      expect(itemElement.className).toContain('is-active')
    })
    test('Inactive element shouldn\'t has "is-active" class', () => {
      const itemComponent = renderIntoDocument(<NavigationTitleClass {...testItem2} />)
      const itemElement = findRenderedDOMComponentWithClass(itemComponent, 'nav-item')

      expect(itemElement.className).not.toContain('is-active')
    })
  })

  describe('Render not editing component', () => {
    test('Should render component', () => {
      const itemComponent = renderIntoDocument(<NavigationTitleClass {...testItem1}/>)
      const titleElement = findRenderedDOMComponentWithClass(itemComponent, 'nav-item__title')
      const countElement = findRenderedDOMComponentWithClass(itemComponent, 'nav-item__count')
      const editElements = scryRenderedDOMComponentsWithClass(itemComponent, 'nav-item__input')

      expect(titleElement.textContent).toBe(sectionNames.NEXT)
      expect(countElement.textContent).toBe('4')
      expect(editElements.length).toBe(0)
    })
    test('Should invoke callback when clicked with type', () => {
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

      expect(callbackParametr1).toBe('')

      Simulate.click(itemElement)

      expect(callbackParametr1).toBe(sectionTypes.NEXT)
    })
    test('Should invoke callback when clicked with type and id', () => {
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

      expect(callbackParametr1).toBe('')
      expect(callbackParametr2).toBe(-12)

      Simulate.click(itemElement)

      expect(callbackParametr1).toBe(sectionTypes.PROJECT)
      expect(callbackParametr2).toBe('bh52ogy5s0fm')
    })
  })

  describe('Render editing component', () => {
    test('Should render editing component', () => {
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

      expect(titleElement.length).toBe(0)
      expect(countElement.length).toBe(0)
      expect(editElement.textContent).toBe('')
      expect(editElement._attributes.placeholder._valueForAttrModified).toBe('Some project')
    })
    test(
      'Should invoke calback with type, id and new title when press enter',
      () => {
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

        expect(item.type).toBe(sectionTypes.PROJECT)
        expect(item.id).toBe('bh52ogy5s0fm')
        expect(item.newTitle).toBe('test')
      }
    )

    test('Should invoke calback with type and id only when press esc', () => {
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

      expect(item.type).toBe(sectionTypes.PROJECT)
      expect(item.id).toBe('bh52ogy5s0fm')
      expect(item.newTitle).not.toBeTruthy()
    })

  })
})
