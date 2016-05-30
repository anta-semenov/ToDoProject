import  { expect } from 'chai'
import React from 'react'
import { renderIntoDocument, findRenderedDOMComponentWithClass, scryRenderedDOMComponentsWithTag, findRenderedDOMComponentWithTag, Simulate } from 'react-addons-test-utils'
import { fromJS } from 'immutable'

import TaskProject from '../../src/components/taskInfo/taskProject/TaskProject.js'

describe('TaskProject Component', () => {
  it('Should render component without projects', () => {
    const projects = fromJS({})
    const projectComponent1 = renderIntoDocument(<TaskProject />)
    const emptyState1 = findRenderedDOMComponentWithClass(projectComponent1, 'projects__empty-list')
    const projectComponent2 = renderIntoDocument(<TaskProject projects={projects}/>)
    const emptyState2 = findRenderedDOMComponentWithClass(projectComponent2, 'projects__empty-list')
    expect(emptyState1.className).to.equal('projects__empty-list')
    expect(emptyState2.className).to.equal('projects__empty-list')
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
    const projectComponent = renderIntoDocument(<TaskProject projects={projects} />)
    const projectsSelect = findRenderedDOMComponentWithTag(projectComponent, 'select')
    const options = scryRenderedDOMComponentsWithTag(projectComponent, 'option')

    expect(projectsSelect.className).to.equal('projects__selector')
    expect(projectsSelect.value).to.equal('')
    expect(options.length).to.equal(3)
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
    const projectComponent = renderIntoDocument(<TaskProject taskProject='bh52ogy5s0fm' projects={projects} />)
    const projectsSelect = findRenderedDOMComponentWithTag(projectComponent, 'select')
    const options = scryRenderedDOMComponentsWithTag(projectComponent, 'option')

    expect(projectsSelect.className).to.equal('projects__selector')
    expect(projectsSelect.value).to.equal('bh52ogy5s0fm')
    expect(options.length).to.equal(3)
  })
  it('Should handle onChange event', () => {
    let id = ''
    const callback = projectId => id = projectId
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
    const projectComponent1 = renderIntoDocument(<TaskProject taskProject='bh52ogy5s0fm' projects={projects} onProjectChange={callback}/>)
    const projectsSelect1 = findRenderedDOMComponentWithTag(projectComponent1, 'select')
    const projectComponent2 = renderIntoDocument(<TaskProject  projects={projects} onProjectChange={callback}/>)
    const projectsSelect2 = findRenderedDOMComponentWithTag(projectComponent2, 'select')

    expect(id).to.equal('')
    Simulate.change(projectsSelect1)
    expect(id).to.equal('bh52ogy5s0fm')
    Simulate.change(projectsSelect2)
    expect(id).to.equal('')
  })
})
