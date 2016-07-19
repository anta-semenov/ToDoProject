import { expect } from 'chai'
import React from 'react'
import { renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils'
import { fromJS } from 'immutable'

import TaskGroup from '../../src/components/tasks/taskGroup/TaskGroup'

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
    const groupName = 'Test group'
    const groupClassName='task-group__title'
    const groupComponent = renderIntoDocument(<TaskGroup groupTitle={groupName} tasks={fromJS([])} />)
    const groupTitles = scryRenderedDOMComponentsWithClass(groupComponent, groupClassName)
    expect(groupTitles.length).to.equal(1)
    expect(groupTitles[0].textContent).to.equal(groupName)
  })
  it('Should not render group name if it has not one', () => {
    const groupClassName='task-group__title'
    const groupComponent = renderIntoDocument(<TaskGroup tasks={[]} />)
    const groupTitles = scryRenderedDOMComponentsWithClass(groupComponent, groupClassName)
    expect(groupTitles.length).to.equal(0)
  })

  it('Should render correct amount of task', () => {
    const taskClass = 'task'
    const tasks = fromJS([
      {
        id: 'b41sogy3s0o0',
        title: 'Explore React'
      },
      {
        id: 'b41sogy3s0o1',
        title: 'Explore Redux'
      }
    ])
    const groupComponent = renderIntoDocument(<TaskGroup tasks={tasks} />)
    const tasksComponents = scryRenderedDOMComponentsWithClass(groupComponent, taskClass)
    expect(tasksComponents.length).to.equal(2)
  })

  it('Should pass correct properties to task component', () => {
    const taskTitleClass = 'task__title'
    const tasks = fromJS([
      {
        id: 'b41sogy3s0o0',
        title: 'Explore React'
      },
      {
        id: 'b41sogy3s0o1',
        title: 'Explore Redux'
      }
    ])
    const groupComponent = renderIntoDocument(<TaskGroup tasks={tasks} />)
    const taskTitlesComponents = scryRenderedDOMComponentsWithClass(groupComponent, taskTitleClass)
    expect(taskTitlesComponents.length).to.equal(2)
    expect(taskTitlesComponents[0].textContent).to.equal(tasks.get(0).get('title'))
  })
})
