import { expect } from 'chai'
import React from 'react'
import ReactDOM from 'react-dom'
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils'
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
  onItemClick: () => {}
}
const testItem2 = {
  key: 0,
  type: sectionTypes.NEXT,
  title: sectionNames.NEXT,
  active: false,
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
})
