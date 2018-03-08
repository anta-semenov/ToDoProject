import React from 'react'
import { mount } from 'enzyme'
import { fromJS } from 'immutable'
import TaskProject from '../../src/components/taskInfo/taskProject/TaskProject.js'

describe('TaskProject Component', () => {
  it('Should render component without projects', () => {
    const taskProject1 = mount(<TaskProject onProjectChange={() => {}} />)
    expect(taskProject1).toMatchSnapshot()
    const taskProject2 = mount(<TaskProject projects={fromJS({})} onProjectChange={() => {}} />)
    expect(taskProject2).toMatchSnapshot()
  })
  it('Should render component with projects, but without selected project', () => {
    const projects = fromJS({
      bh52ogy5s0fm: {
        id: 'bh52ogy5s0fm',
        title: 'Test project 0',
        completed: false
      },
      bh52ogy5s0f1: {
        id: 'bh52ogy5s0f1',
        title: 'Test project 1',
        completed: false
      }
    })
    const taskProject = mount(<TaskProject projects={projects} onProjectChange={() => {}} />)
    expect(taskProject).toMatchSnapshot()
  })
  it('Should render component with selected project', () => {
    const projects = fromJS({
      bh52ogy5s0fm: {
        id: 'bh52ogy5s0fm',
        title: 'Test project 0',
        completed: false
      },
      bh52ogy5s0f1: {
        id: 'bh52ogy5s0f1',
        title: 'Test project 1',
        completed: false
      }
    })
    const taskProject = mount(
      <TaskProject taskProject="bh52ogy5s0fm" projects={projects} onProjectChange={() => {}} />
    )
    expect(taskProject).toMatchSnapshot()
  })
})
