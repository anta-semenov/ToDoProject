import { expect } from 'chai'
import React from 'react'
import { createRenderer } from 'react-addons-test-utils'

import Task from '../../src/components/tasks/task/Task'
const shallowRenderer = createRenderer()

describe('Task component', () => {
  it('Should render Task component with active and completed classes', () => {
<<<<<<< HEAD
    shallowRenderer(<Task active={true} completed={true} />)
=======
    shallowRenderer.render(<Task active={true} completed={true} />)
>>>>>>> perf
    const task = shallowRenderer.getRenderOutput()

    expect(task.props.className).to.include('task')
      .and.to.include('is-active')
      .and.to.include('is-completed')
  })
  it('Should render Task component without active and completed classes', () => {
<<<<<<< HEAD
    shallowRenderer(<Task active={false} completed={false} />)
=======
    shallowRenderer.render(<Task active={false} completed={false} />)
>>>>>>> perf
    const task = shallowRenderer.getRenderOutput()

    expect(task.props.className).to.include('task')
      .and.to.not.include('is-active')
      .and.to.not.include('is-completed')
  })
})
