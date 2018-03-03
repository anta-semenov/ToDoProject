import React, { Component } from 'react'
import { renderIntoDocument, createRenderer } from 'react-addons-test-utils'
import { fromJS } from 'immutable'
import * as sectionTypes from '../../src/constants/sectionTypes'
import * as sectionNames from '../../src/constants/sectionNames'
import * as navGroupTypes from '../../src/constants/navGroupTypes'

import NavigationGroup from '../../src/components/navigationGroup/NavigationGroup'

const shallowRenderer = createRenderer()

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
    addNewTitle:'+ context',
    addNew: () => {}
  }

  describe('Correct render', () => {
    test('Should render group title', () => {
      shallowRenderer.render(<NavigationGroup {...testGroup} />)
      const group = shallowRenderer.getRenderOutput()

      expect(group.props.children[0].props.children[0]).toEqual(<div className='nav-group__title-text' >{sectionNames.CONTEXTS}</div>)
    })
    test('Should render correct count of items', () => {
      shallowRenderer.render(<NavigationGroup {...testGroup} />)
      const group = shallowRenderer.getRenderOutput()

      expect(group.props.children[1].props.children.size).toBe(2)
    })
    test('Should pass correct props to navigation items', () => {
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

      expect(itemElementProps.type).toBe(sectionTypes.CONTEXT)
      expect(itemElementProps.title).toBe('Context 2')
      expect(itemElementProps.id).toBe('cf1sobz3s0o5')
      expect(itemElementProps.active).toBe(false)
      expect(itemElementProps.count).toBe(10)
      expect(itemElementProps.editing).toBe(false)
      expect(itemElementProps.onItemClick).toBe(itemClickCallback)
      expect(itemElementProps.onStopEditing).toBe(itemStopEditCallback)
    })
  })
})
