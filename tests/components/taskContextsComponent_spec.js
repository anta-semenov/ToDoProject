import React from 'react'
import { fromJS, Set } from 'immutable'
import { shallow } from 'enzyme'

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
  it('Should render component without contexts', () => {
    const contexts = fromJS({})
    const contextsComponent1 = shallow(<TaskContexts onContextClick={() => {}} />)
    const contextsComponent2 = shallow(
      <TaskContexts contexts={contexts} onContextClick={() => {}} />
    )
    expect(contextsComponent1).toMatchSnapshot()
    expect(contextsComponent2).toMatchSnapshot()
  })
  it('Should render component with no task contexts', () => {
    const contextsComponent = shallow(
      <TaskContexts contexts={contexts} onContextClick={() => {}} />
    )
    expect(contextsComponent).toMatchSnapshot()
  })
  it('Should render components with task context', () => {
    const contextsComponent = shallow(
      <TaskContexts contexts={contexts} taskContexts={taskContexts} onContextClick={() => {}} />
    )
    expect(contextsComponent).toMatchSnapshot()
  })
  it('Should handle context click', () => {
    let id
    const onContextClick = newId => (id = newId)
    const contextsComponent = shallow(
      <TaskContexts
        contexts={contexts}
        taskContexts={taskContexts}
        onContextClick={onContextClick}
      />
    )
    expect(id).toBeUndefined()
    contextsComponent
      .find('.context')
      .first()
      .simulate('click')
    expect(id).toBe('a21sogy3s0oq')
  })
})
