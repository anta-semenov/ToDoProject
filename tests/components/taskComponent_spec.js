import { expect } from 'chai'
import React from 'react'
import { renderIntoDocument, findRenderedDOMComponentWithClass, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, Simulate} from 'react-addons-test-utils'
import { fromJS } from 'immutable'
import * as priorityLevels from '../../src/constants/priorityLevels'
import { DATE_FORMAT } from '../../src/constants/defaults'

import Task from '../../src/components/tasks/task/Task'

const testTasks = fromJS([
  {
    id: 'b41sogy3s0o0',
    title: 'Explore React',
    completed: true,
    today: true,
    description: 'Make Tutorial on oficial react website',
    priority: priorityLevels.PRIORITY_MEDIUM,
    date: new Date(2015, 4, 15),
    connectDragPreview: (element) => element,
    connectDragSource:  (element) => element
  },
  {
    id: 'b41sogy3s0o1',
    title: 'Explore Redux',
    completed: false,
    today: false,
    connectDragPreview: (element) => element,
    connectDragSource:  (element) => element
  }
])

const mockDragFunctions = {
  connectDragPreview: (element) => element,
  connectDragSource:  (element) => element
}

describe('Task component', () => {
  it('Should render Task component with active and completed classes', () => {
    const taskClass = 'task'
    const activeClass = 'is-active'
    const completedClass = 'is-completed'
    const taskComponent = renderIntoDocument(<Task active={true} completed={true} {...mockDragFunctions}/>)
    const taskElement = findRenderedDOMComponentWithTag(taskComponent, 'li')

    expect(taskElement.className).to.include(taskClass)
    expect(taskElement.className).to.include(activeClass)
    expect(taskElement.className).to.include(completedClass)
  })
  it('Should render Task component without active and completed classes', () => {
    const taskClass = 'task'
    const activeClass = 'is-active'
    const completedClass = 'is-completed'
    const taskComponent = renderIntoDocument(<Task active={false} completed={false} {...mockDragFunctions}/>)
    const taskElement = findRenderedDOMComponentWithTag(taskComponent, 'li')

    expect(taskElement.className).to.include(taskClass)
    expect(taskElement.className).to.not.include(activeClass)
    expect(taskElement.className).to.not.include(completedClass)
  })
  describe('Checkbox', () => {
    it('Should render complete checkbox', () => {
      const checkboxClass = 'checkbox'
      const taskComponent = renderIntoDocument(<Task completed={testTasks.get(0).get('completed')} {...mockDragFunctions} />)
      const checkboxComponent = findRenderedDOMComponentWithClass(taskComponent, checkboxClass)

      expect(checkboxComponent.className).to.include('is-checked')
    })
    it('Should render uncomplete checkbox', () => {
      const checkboxClass = 'checkbox'
      const taskComponent = renderIntoDocument(<Task completed={testTasks.get(1).get('completed')} {...mockDragFunctions} />)
      const checkboxComponent = findRenderedDOMComponentWithClass(taskComponent, checkboxClass)

      expect(checkboxComponent.className).to.not.include('is-checked')
    })
    it('Should invoke complete callback when change event occurs', () => {
      const checkboxClass = 'checkbox'
      let checkedId = -12
      let checkStatus = true
      const callback = (id, status) => {checkedId = id, checkStatus = status}

      const taskComponent = renderIntoDocument(
        <Task
        completed={testTasks.getIn([0, 'completed'])}
        id={testTasks.getIn([0, 'id'])}
        onTaskCheckboxClick = {callback}
        {...mockDragFunctions}
        />
      )
      const checkboxComponent = findRenderedDOMComponentWithClass(taskComponent, checkboxClass)

      expect(checkedId).to.equal(-12)
      expect(checkStatus).to.equal(true)

      Simulate.click(checkboxComponent)
      expect(checkedId).to.equal('b41sogy3s0o0')
      expect(checkStatus).to.equal(false)
    })
  })
  describe('Today', () => {
    it('Should render checked today toggle', () => {
      const todayClass = 'today'
      const taskComponent = renderIntoDocument(<Task today={testTasks.get(0).get('today')} {...mockDragFunctions} />)
      const todayToggle = findRenderedDOMComponentWithClass(taskComponent, todayClass)

      expect(todayToggle.className).to.include('is-checked')
    })
    it('Should render unchecked today toggle', () => {
      const todayClass = 'today'
      const taskComponent = renderIntoDocument(<Task today={testTasks.get(1).get('today')} {...mockDragFunctions} />)
      const todayToggle = findRenderedDOMComponentWithClass(taskComponent, todayClass)

      expect(todayToggle.className).to.not.include('is-checked')
    })
    it('Should invoke today callback when click occurs', () => {
      let callbackId = -12
      let callbackStatus = true
      const callback = (id, status) => {callbackId = id, callbackStatus = status}
      const todayClass = 'today'
      const taskComponent = renderIntoDocument(<Task today={testTasks.get(0).get('today')} id={testTasks.get(0).get('id')} onTaskTodayClick={callback} {...mockDragFunctions} />)
      const todayToggle = findRenderedDOMComponentWithClass(taskComponent, todayClass)

      expect(callbackId).to.equal(-12)
      expect(callbackStatus).to.equal(true)
      Simulate.click(todayToggle)
      expect(callbackId).to.equal(testTasks.get(0).get('id'))
      expect(callbackStatus).to.equal(!testTasks.get(0).get('today'))
    })
  })
  describe('Priority', () => {
    it('Should invoke callback when click on priority level', () => {
      let priority = ''
      let callbackId = -12
      const callback = (id, priorityLevel) => {
        callbackId = id
        priority = priorityLevel
      }
      const priorityLevelNoneClass = 'priority-level--none'
      const priorityLevelLowClass = 'priority-level--low'
      const priorityLevelMediumClass = 'priority-level--medium'
      const priorityLevelHighClass = 'priority-level--high'
      const priorityLevelMaxClass = 'priority-level--max'

      const taskComponentNone = renderIntoDocument(<Task id={'b41sogy3s0o0'} onPriorityClick={callback} {...mockDragFunctions} />)
      const taskComponentLow = renderIntoDocument(<Task id={'b41sogy3s0o1'}  onPriorityClick={callback} {...mockDragFunctions} />)
      const taskComponentMedium = renderIntoDocument(<Task id={'b41sogy3s0o2'} onPriorityClick={callback} {...mockDragFunctions} />)
      const taskComponentHigh = renderIntoDocument(<Task id={'b41sogy3s0o3'} onPriorityClick={callback} {...mockDragFunctions} />)
      const taskComponentMax = renderIntoDocument(<Task id={'b41sogy3s0o4'} onPriorityClick={callback} {...mockDragFunctions} />)

      const priorityLevelComponentNone = findRenderedDOMComponentWithClass(taskComponentNone, priorityLevelNoneClass)
      const priorityLevelComponentLow = findRenderedDOMComponentWithClass(taskComponentLow, priorityLevelLowClass)
      const priorityLevelComponentMedium = findRenderedDOMComponentWithClass(taskComponentMedium, priorityLevelMediumClass)
      const priorityLevelComponentHigh= findRenderedDOMComponentWithClass(taskComponentHigh, priorityLevelHighClass)
      const priorityLevelComponentMax = findRenderedDOMComponentWithClass(taskComponentMax, priorityLevelMaxClass)

      expect(priority).to.equal('')
      expect(callbackId).to.equal(-12)

      Simulate.click(priorityLevelComponentNone)
      expect(priority).to.equal(priorityLevels.PRIORITY_NONE)
      expect(callbackId).to.equal('b41sogy3s0o0')

      Simulate.click(priorityLevelComponentLow)
      expect(priority).to.equal(priorityLevels.PRIORITY_LOW)
      expect(callbackId).to.equal('b41sogy3s0o1')

      Simulate.click(priorityLevelComponentMedium)
      expect(priority).to.equal(priorityLevels.PRIORITY_MEDIUM)
      expect(callbackId).to.equal('b41sogy3s0o2')

      Simulate.click(priorityLevelComponentHigh)
      expect(priority).to.equal(priorityLevels.PRIORITY_HIGH)
      expect(callbackId).to.equal('b41sogy3s0o3')

      Simulate.click(priorityLevelComponentMax)
      expect(priority).to.equal(priorityLevels.PRIORITY_MAX)
      expect(callbackId).to.equal('b41sogy3s0o4')
    })
  })
  describe('Task Body', () => {
    it('Should render task title', () => {
      const titleClass = 'task__title'
      const taskComponent = renderIntoDocument(<Task title={testTasks.get(0).get('title')} {...mockDragFunctions} />)
      const titleComponent = findRenderedDOMComponentWithClass(taskComponent, titleClass)

      expect(titleComponent.textContent).to.equal(testTasks.get(0).get('title'))
    })
    it('Should render task description', () => {
      const descriptionClass = 'task__description'
      const taskComponent = renderIntoDocument(<Task description={testTasks.get(0).get('description')} {...mockDragFunctions} />)
      const descriptionComponent = findRenderedDOMComponentWithClass(taskComponent, descriptionClass)

      expect(descriptionComponent.textContent).to.equal(testTasks.get(0).get('description'))
    })
    it('Should render task date', () => {
      const dateClass = 'task__date'
      const taskComponent = renderIntoDocument(<Task date={testTasks.get(0).get('date')} {...mockDragFunctions} />)
      const dateComponent = findRenderedDOMComponentWithClass(taskComponent, dateClass)

      expect(dateComponent.textContent).to.equal(testTasks.get(0).get('date').toLocaleDateString('en-US', DATE_FORMAT))
    })
    it('Should invoke callback when click on task body, title, description or date occurs', () => {
      let callbackId = -12
      const callback = id => callbackId = id
      const bodyClass = 'task__body'
      const titleClass = 'task__title'
      const descriptionClass = 'task__description'
      const dateClass = 'task__date'

      const taskComponent = renderIntoDocument(<Task id={'b41sogy3s0o0'} title={testTasks.get(0).get('title')} description={testTasks.get(0).get('description')} date={testTasks.get(0).get('date')} onTaskClick={callback} {...mockDragFunctions} />)
      const bodyComponent = findRenderedDOMComponentWithClass(taskComponent, bodyClass)
      const titleComponent = findRenderedDOMComponentWithClass(taskComponent, titleClass)
      const descriptionComponent = findRenderedDOMComponentWithClass(taskComponent, descriptionClass)
      const dateComponent = findRenderedDOMComponentWithClass(taskComponent, dateClass)

      expect(callbackId).to.equal(-12)
      Simulate.click(bodyComponent)
      expect(callbackId).to.equal('b41sogy3s0o0')

      callbackId = -12
      expect(callbackId).to.equal(-12)
      Simulate.click(titleComponent)
      expect(callbackId).to.equal('b41sogy3s0o0')

      callbackId = -12
      expect(callbackId).to.equal(-12)
      Simulate.click(descriptionComponent)
      expect(callbackId).to.equal('b41sogy3s0o0')

      callbackId = -12
      expect(callbackId).to.equal(-12)
      Simulate.click(dateComponent)
      expect(callbackId).to.equal('b41sogy3s0o0')
    })
  })
})
