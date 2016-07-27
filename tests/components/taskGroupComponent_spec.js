import { expect } from 'chai'
import React from 'react'
import { createRenderer } from 'react-addons-test-utils'
import { fromJS } from 'immutable'

import TaskGroup from '../../src/components/tasks/taskGroup/TaskGroup'

const shallowRenderer = createRenderer()

describe('TaskGroup component tests', () => {
  TaskGroup.__Rewire__('Task', class extends React.Component {
    render() {
      return(
        <div className='task'>
          <div className='task__title'>{this.props.title}</div>
        </div>
      )
    }
  })

  it('Should render group name if it has one', () => {
    shallowRenderer.render(<TaskGroup groupTitle='Test group' tasks={fromJS([])} />)
    const taskGroup = shallowRenderer.getRenderOutput()

    expect(taskGroup.props.children).to.include(<div className='task-group__title'>Test group</div>)
  })
})
