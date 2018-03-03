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
  test('Should render component without contexts', () => {
    const contexts = fromJS({})
    const contextsComponent1 = renderIntoDocument(<TaskContexts />)
    const emptyContexts1 = findRenderedDOMComponentWithClass(contextsComponent1, 'contexts__empty-list')
    const contextsComponent2 = renderIntoDocument(<TaskContexts contexts={contexts} />)
    const emptyContexts2 = findRenderedDOMComponentWithClass(contextsComponent2, 'contexts__empty-list')
    expect(emptyContexts1.className).toBe('contexts__empty-list')
    expect(emptyContexts2.className).toBe('contexts__empty-list')
  })
  test('Should render component with no task contexts', () => {
    const contextsComponent = renderIntoDocument(<TaskContexts contexts={contexts} />)
    const contextsElement = findRenderedDOMComponentWithClass(contextsComponent, 'contexts')
    const contextElements = scryRenderedDOMComponentsWithClass(contextsComponent, 'context')

    expect(contextsElement.className).toBe('contexts')
    expect(contextElements.length).toBe(2)
    expect(contextElements[0].className).toContain('context')
    expect(contextElements[0].textContent).toBe('test context 1')
    expect(contextElements[1].className).toContain('context')
    expect(contextElements[1].textContent).toBe('test context 2')
  })
  test('Should render components with task context', () => {
    const contextsComponent = renderIntoDocument(<TaskContexts contexts={contexts} taskContexts={taskContexts} />)
    const contextsElement = findRenderedDOMComponentWithClass(contextsComponent, 'contexts')
    const contextElements = scryRenderedDOMComponentsWithClass(contextsComponent, 'context')

    expect(contextsElement.className).toBe('contexts')
    expect(contextElements.length).toBe(2)
    expect(contextElements[0].className).toContain('context')
    expect(contextElements[0].textContent).toBe('test context 1')
    expect(contextElements[1].className).to.include('context').toContain('is-active')
    expect(contextElements[1].textContent).toBe('test context 2')
  })
  test('Should handle context click', () => {
    let id = ''
    const callback = (contextId) => id = contextId
    const contextsComponent = renderIntoDocument(<TaskContexts contexts={contexts} taskContexts={taskContexts} onContextClick={callback}/>)
    const contextElements = scryRenderedDOMComponentsWithClass(contextsComponent, 'context')

    expect(id).toBe('')
    Simulate.click(contextElements[0])
    expect(id).toBe('a21sogy3s0oq')
  })
})
