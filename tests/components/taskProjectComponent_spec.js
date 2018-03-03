import React from 'react'
import { createRenderer } from 'react-addons-test-utils'
import { fromJS } from 'immutable'
import TaskProject from '../../src/components/taskInfo/taskProject/TaskProject.js'

const shallowRenderer = createRenderer()

describe('TaskProject Component', () => {
  test('Should render component without projects', () => {
    shallowRenderer.render(<TaskProject />)
    const taskProject1 = shallowRenderer.getRenderOutput()
    expect(taskProject1.props.children).toContain(
      <div className={'projects__empty-list'}>You haven't create any projects yet.</div>
    )

    shallowRenderer.render(<TaskProject projects={fromJS({})}/>)
    const taskProject2 = shallowRenderer.getRenderOutput()
    expect(taskProject2.props.children).toContain(
      <div className={'projects__empty-list'}>You haven't create any projects yet.</div>
    )
  })
  test(
    'Should render component with projects, but without selected project',
    () => {
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
      shallowRenderer.render(<TaskProject projects={projects} />)
      const taskProject = shallowRenderer.getRenderOutput()

      expect(taskProject.props.children[1].props.className).toBe('projects__selector')
      expect(taskProject.props.children[1].props.value).toBe('')
      expect(taskProject.props.children[1].props.children.length).toBe(2)
    }
  )
  test('Should render component with selected project', () => {
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
    shallowRenderer.render(<TaskProject taskProject='bh52ogy5s0fm' projects={projects} />)
    const taskProject = shallowRenderer.getRenderOutput()

    expect(taskProject.props.children[1].props.className).toBe('projects__selector is-selected')
    expect(taskProject.props.children[1].props.value).toBe('bh52ogy5s0fm')
    expect(taskProject.props.children[1].props.children.length).toBe(2)
  })
})
