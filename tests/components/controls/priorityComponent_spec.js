import { expect } from 'chai'
import React from 'react'
import { createRenderer } from 'react-addons-test-utils'

import * as priorityLevels from '../../../src/constants/priorityLevels'
import Priority from '../../../src/components/elements/priority/Priority'

const shallowRenderer = createRenderer()

describe('Priority', () => {
  it('Should render priority component with right classes for default props', () => {
    shallowRenderer.render(<Priority />)
    const priority = shallowRenderer.getRenderOutput()

    expect(priority.props.className).to.equal('priority priority--none priority--default')
    expect(priority.props.children.length).to.equal(5)
    expect(priority.props.children[0].props.className).to.equal('priority-level priority-level--none')
    expect(priority.props.children[1].props.className).to.equal('priority-level priority-level--max')
    expect(priority.props.children[2].props.className).to.equal('priority-level priority-level--high')
    expect(priority.props.children[3].props.className).to.equal('priority-level priority-level--medium')
    expect(priority.props.children[4].props.className).to.equal('priority-level priority-level--low')
  })
  it('Should render priority with right classes for custom props', () => {
    shallowRenderer.render(<Priority appearance='task-info' priority={priorityLevels.PRIORITY_MEDIUM} disabled={true}/>)
    const priority = shallowRenderer.getRenderOutput()

    expect(priority.props.className).to.equal('priority priority--medium priority--task-info is-disabled')
  })
})
