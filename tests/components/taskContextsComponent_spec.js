import { expect } from 'chai'
import React from 'react'
import { fromJS, Set } from 'immutable'
import { renderIntoDocument, findRenderedDOMComponentWithClass, scryRenderedDOMComponentsWithClass, Simulate } from 'react-addons-test-utils'

import TaskContexts from '../../src/components/taskInfo/taskContexts/TaskContexts'

const contexts = fromJS({
  a21sogy3s0oq: {
    id: 'a21sogy3s0oq',
    title: 'test context 1'
  },
  a23sogy3s0oq: {
    id: 'a23sogy3s0oq',
    title: 'test context 2'
  }
})
const taskContexts = Set(['a23sogy3s0oq'])

describe('TaskContexts component', () => {
  it('Should render component with no task contexts', () => {
    const contextsComponent = renderIntoDocument(<TaskContexts contexts={contexts} />)
    const contextsElement = findRenderedDOMComponentWithClass(contextsComponent, 'contexts')
    const contextElements = scryRenderedDOMComponentsWithClass(contextsComponent, 'context')

    expect(contextsElement.className).to.equal('contexts')
    expect(contextElements.length).to.equal(2)
    expect(contextElements[0].className).to.include('context')
    expect(contextElements[0].textContent).to.equal('test context 1')
    expect(contextElements[1].className).to.include('context')
    expect(contextElements[1].textContent).to.equal('test context 2')
  })
  it('Should render components with task context', () => {
    const contextsComponent = renderIntoDocument(<TaskContexts contexts={contexts} taskContexts={taskContexts} />)
    const contextsElement = findRenderedDOMComponentWithClass(contextsComponent, 'contexts')
    const contextElements = scryRenderedDOMComponentsWithClass(contextsComponent, 'context')

    expect(contextsElement.className).to.equal('contexts')
    expect(contextElements.length).to.equal(2)
    expect(contextElements[0].className).to.include('context')
    expect(contextElements[0].textContent).to.equal('test context 1')
    expect(contextElements[1].className).to.include('context').and.include('is-active')
    expect(contextElements[1].textContent).to.equal('test context 2')
  })
  it('Should handle context click', () => {
    let id = ''
    const callback = (contextId) => id = contextId
    const contextsComponent = renderIntoDocument(<TaskContexts contexts={contexts} taskContexts={taskContexts} onContextClick={callback}/>)
    const contextElements = scryRenderedDOMComponentsWithClass(contextsComponent, 'context')

    expect(id).to.equal('')
    Simulate.click(contextElements[0])
    expect(id).to.equal('a21sogy3s0oq')
  })
})
