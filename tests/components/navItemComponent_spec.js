import React from 'react'
import { mount } from 'enzyme'
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
    it('Active element should has "is-active" class', () => {
      const itemComponent = mount(<NavigationTitleClass {...testItem1} />)
      expect(itemComponent).toMatchSnapshot()
    })
    it('Inactive element shouldn\'t has "is-active" class', () => {
      const itemComponent = mount(<NavigationTitleClass {...testItem2} />)
      expect(itemComponent).toMatchSnapshot()
    })
  })

  describe('Render not editing component', () => {
    it('Should render component', () => {
      const itemComponent = mount(<NavigationTitleClass {...testItem1} />)
      expect(itemComponent).toMatchSnapshot()
    })
    it('Should invoke callback when clicked with type', () => {
      const onItemClick = jest.fn()
      const testProps = {
        key: 0,
        type: sectionTypes.NEXT,
        title: sectionNames.NEXT,
        active: true,
        count: 4,
        editing: false,
        onItemClick,
        connectDropTarget,
        connectDragSource,
        connectDragPreview
      }

      const itemComponent = mount(<NavigationTitleClass {...testProps} />)
      itemComponent.find('.nav-item').simulate('click')
      expect(onItemClick).toHaveBeenCalledWith(sectionTypes.NEXT, undefined)
    })
    it('Should invoke callback when clicked with type and id', () => {
      const onItemClick = jest.fn()
      const testProps = {
        key: 'PROJECT-bh52ogy5s0fm',
        type: sectionTypes.PROJECT,
        title: 'Some project',
        id: 'bh52ogy5s0fm',
        active: true,
        count: 4,
        editing: false,
        onItemClick,
        connectDropTarget,
        connectDragSource,
        connectDragPreview
      }

      const itemComponent = mount(<NavigationTitleClass {...testProps} />)
      itemComponent.find('.nav-item').simulate('click')
      expect(onItemClick).toHaveBeenCalledWith(sectionTypes.PROJECT, 'bh52ogy5s0fm')
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

      const itemComponent = mount(<NavigationTextfield {...editingProps} />)
      expect(itemComponent).toMatchSnapshot()
    })
    it('Should invoke calback with type, and id and new title when press enter', () => {
      const onStopEditing = jest.fn()
      const editingProps = {
        key: 'PROJECT-bh52ogy5s0fm',
        type: sectionTypes.PROJECT,
        title: 'Some project',
        id: 'bh52ogy5s0fm',
        active: false,
        count: 4,
        editing: true,
        onStopEditing,
        connectDropTarget,
        connectDragSource,
        connectDragPreview
      }

      const itemComponent = mount(<NavigationTextfield {...editingProps} />)
      const input = itemComponent.find('.nav-item__input').getDOMNode()
      input.value = 'test'

      itemComponent
        .find('.nav-item__input')
        .simulate('keyDown', { key: 'Enter', keyCode: 13, which: 13 })
      expect(onStopEditing).toHaveBeenCalledWith({
        type: sectionTypes.PROJECT,
        id: 'bh52ogy5s0fm',
        newTitle: 'test'
      })
    })
    it('Should invoke calback with type and id only when press esc', () => {
      const onStopEditing = jest.fn()
      const editingProps = {
        key: 'PROJECT-bh52ogy5s0fm',
        type: sectionTypes.PROJECT,
        title: 'Some project',
        id: 'bh52ogy5s0fm',
        active: false,
        count: 4,
        editing: true,
        onStopEditing,
        connectDropTarget,
        connectDragSource,
        connectDragPreview
      }

      const itemComponent = mount(<NavigationTextfield {...editingProps} />)
      const input = itemComponent.find('.nav-item__input').getDOMNode()
      input.value = 'test'

      itemComponent
        .find('.nav-item__input')
        .simulate('keyDown', { key: 'Esc', keyCode: 27, which: 27 })

      expect(onStopEditing).toHaveBeenCalledWith({
        type: sectionTypes.PROJECT,
        id: 'bh52ogy5s0fm'
      })
    })
  })
})
