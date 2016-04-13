import { expect } from 'chai'
import React from 'react'
import { renderIntoDocument, findRenderedDOMComponentWithClass, scryRenderedDOMComponentsWithClass, findRenderedDOMComponentWithTag, Simulate} from 'react-addons-test-utils'
import { fromJS } from 'immutable'
import * as priorityLevels from '../../src/constants/priorityLevels'
import { DATE_FORMAT } from '../../src/constants/defaults'

import Task from '../../src/components/task/Task'

const testTasks = fromJS([
  {
    id: 0,
    title: 'Explore React',
    completed: true,
    today: true,
    description: 'Make Tutorial on oficial react website',
    priority: priorityLevels.PRIORITY_MEDIUM,
    date: new Date(2015, 4, 15)
  },
  {
    id: 1,
    title: 'Explore Redux',
    completed: false,
    today: false
  }
])

describe('Task component', () => {
  it('Should render Task component with active and completed classes', () => {
    const taskClass = 'task'
    const activeClass = 'is-active'
    const completedClass = 'is-completed'
    const taskComponent = renderIntoDocument(<Task active={true} completed={true} />)
    const taskElement = findRenderedDOMComponentWithTag(taskComponent, 'li')

    expect(taskElement.className).to.include(taskClass)
    expect(taskElement.className).to.include(activeClass)
    expect(taskElement.className).to.include(completedClass)
  })
  it('Should render Task component without active and completed classes', () => {
    const taskClass = 'task'
    const activeClass = 'is-active'
    const completedClass = 'is-completed'
    const taskComponent = renderIntoDocument(<Task active={false} completed={false} />)
    const taskElement = findRenderedDOMComponentWithTag(taskComponent, 'li')

    expect(taskElement.className).to.include(taskClass)
    expect(taskElement.className).to.not.include(activeClass)
    expect(taskElement.className).to.not.include(completedClass)
  })
  describe('Checkbox', () => {
    it('Should render complete checkbox', () => {
      const checkboxClass = 'task__completed'
      const taskComponent = renderIntoDocument(<Task completed={testTasks.get(0).get('completed')} />)
      const checkboxComponent = findRenderedDOMComponentWithClass(taskComponent, checkboxClass)

      expect(checkboxComponent.checked).to.equal(testTasks.get(0).get('completed'))
    })
    it('Should render uncomplete checkbox', () => {
      const checkboxClass = 'task__completed'
      const taskComponent = renderIntoDocument(<Task completed={testTasks.get(1).get('completed')} />)
      const checkboxComponent = findRenderedDOMComponentWithClass(taskComponent, checkboxClass)

      expect(checkboxComponent.checked).to.equal(testTasks.get(1).get('completed'))
    })
    it('Should invoke complete callback when change event occurs', () => {
      const checkboxClass = 'task__completed'
      let checkedId = -12
      const callback = (id) => checkedId = id

      const taskComponent = renderIntoDocument(
        <Task
        completed={testTasks.getIn([0, 'completed'])}
        id={testTasks.getIn([0, 'id'])}
        onTaskCheckboxClick = {callback}
        />
      )
      const checkboxComponent = findRenderedDOMComponentWithClass(taskComponent, checkboxClass)

      expect(checkedId).to.equal(-12)

      Simulate.change(checkboxComponent)
      expect(checkedId).to.equal(0)
    })
  })
  describe('Today', () => {
    it('Should render checked today toggle', () => {
      const todayClass = 'task__today'
      const taskComponent = renderIntoDocument(<Task today={testTasks.get(0).get('today')} />)
      const todayToggle = findRenderedDOMComponentWithClass(taskComponent, todayClass)

      expect(todayToggle.className).to.include('is-checked')
    })
    it('Should render unchecked today toggle', () => {
      const todayClass = 'task__today'
      const taskComponent = renderIntoDocument(<Task today={testTasks.get(1).get('today')} />)
      const todayToggle = findRenderedDOMComponentWithClass(taskComponent, todayClass)

      expect(todayToggle.className).to.not.include('is-checked')
    })
    it('Should invoke today callback when click occurs', () => {
      let callbackId = -12
      const callback = id => callbackId = id
      const todayClass = 'task__today'
      const taskComponent = renderIntoDocument(<Task today={testTasks.get(0).get('today')} id={testTasks.get(0).get('id')} onTaskTodayClick={callback} />)
      const todayToggle = findRenderedDOMComponentWithClass(taskComponent, todayClass)

      expect(callbackId).to.equal(-12)
      Simulate.click(todayToggle)
      expect(callbackId).to.equal(testTasks.get(0).get('id'))
    })
  })
  describe('Priority', () => {
    it('Should render priority component', () => {
      const priorityClass = 'task__priority'
      const priorityNoneClass = 'task__priority--none'
      const priorityLevelClass = 'task__priority-level'
      const priorityLevelNoneClass = 'task__priority-level--none'
      const priorityLevelLowClass = 'task__priority-level--low'
      const priorityLevelMediumClass = 'task__priority-level--medium'
      const priorityLevelHighClass = 'task__priority-level--high'
      const priorityLevelMaxClass = 'task__priority-level--max'

      const taskComponent = renderIntoDocument(<Task />)
      const priorityComponent = findRenderedDOMComponentWithClass(taskComponent, priorityClass)
      const priorityLevelComponents = scryRenderedDOMComponentsWithClass(taskComponent, priorityLevelClass)

      expect(priorityComponent.className).to.include(priorityNoneClass)
      expect(priorityLevelComponents.length).to.equal(5)
      expect(priorityLevelComponents[0].className).to.include(priorityLevelNoneClass)
      expect(priorityLevelComponents[1].className).to.include(priorityLevelMaxClass)
      expect(priorityLevelComponents[2].className).to.include(priorityLevelHighClass)
      expect(priorityLevelComponents[3].className).to.include(priorityLevelMediumClass)
      expect(priorityLevelComponents[4].className).to.include(priorityLevelLowClass)
    })
    it('Should render right priority class', () => {
      const priorityClass = 'task__priority'
      const priorotyNoneClass = 'task__priority--none'
      const priorotyLowClass = 'task__priority--low'
      const priorotyMediumClass = 'task__priority--medium'
      const priorotyHighClass = 'task__priority--high'
      const priorotyMaxClass = 'task__priority--max'

      const taskComponentNone1 = renderIntoDocument(<Task />)
      const taskComponentNone2 = renderIntoDocument(<Task priority={priorityLevels.PRIORITY_NONE} />)
      const taskComponentLow = renderIntoDocument(<Task priority={priorityLevels.PRIORITY_LOW} />)
      const taskComponentMedium = renderIntoDocument(<Task priority={priorityLevels.PRIORITY_MEDIUM} />)
      const taskComponentHigh = renderIntoDocument(<Task priority={priorityLevels.PRIORITY_HIGH} />)
      const taskComponentMax = renderIntoDocument(<Task priority={priorityLevels.PRIORITY_MAX} />)

      const priorityComponentNone1 = findRenderedDOMComponentWithClass(taskComponentNone1, priorityClass)
      const priorityComponentNone2 = findRenderedDOMComponentWithClass(taskComponentNone2, priorityClass)
      const priorityComponentLow = findRenderedDOMComponentWithClass(taskComponentLow, priorityClass)
      const priorityComponentMedium = findRenderedDOMComponentWithClass(taskComponentMedium, priorityClass)
      const priorityComponentHigh= findRenderedDOMComponentWithClass(taskComponentHigh, priorityClass)
      const priorityComponentMax = findRenderedDOMComponentWithClass(taskComponentMax, priorityClass)

      expect(priorityComponentNone1.className).to.include(priorotyNoneClass)
      expect(priorityComponentNone2.className).to.include(priorotyNoneClass)
      expect(priorityComponentLow.className).to.include(priorotyLowClass)
      expect(priorityComponentMedium.className).to.include(priorotyMediumClass)
      expect(priorityComponentHigh.className).to.include(priorotyHighClass)
      expect(priorityComponentMax.className).to.include(priorotyMaxClass)
    })
    it('Should invoke callback when click on priority level', () => {
      let priority = ''
      let callbackId = -12
      const callback = (id, priorityLevel) => {
        callbackId = id
        priority = priorityLevel
      }
      const priorityLevelNoneClass = 'task__priority-level--none'
      const priorityLevelLowClass = 'task__priority-level--low'
      const priorityLevelMediumClass = 'task__priority-level--medium'
      const priorityLevelHighClass = 'task__priority-level--high'
      const priorityLevelMaxClass = 'task__priority-level--max'

      const taskComponentNone = renderIntoDocument(<Task id={0} onPriorityClick={callback} />)
      const taskComponentLow = renderIntoDocument(<Task id={1}  onPriorityClick={callback} />)
      const taskComponentMedium = renderIntoDocument(<Task id={2} onPriorityClick={callback} />)
      const taskComponentHigh = renderIntoDocument(<Task id={3} onPriorityClick={callback} />)
      const taskComponentMax = renderIntoDocument(<Task id={4} onPriorityClick={callback} />)

      const priorityLevelComponentNone = findRenderedDOMComponentWithClass(taskComponentNone, priorityLevelNoneClass)
      const priorityLevelComponentLow = findRenderedDOMComponentWithClass(taskComponentLow, priorityLevelLowClass)
      const priorityLevelComponentMedium = findRenderedDOMComponentWithClass(taskComponentMedium, priorityLevelMediumClass)
      const priorityLevelComponentHigh= findRenderedDOMComponentWithClass(taskComponentHigh, priorityLevelHighClass)
      const priorityLevelComponentMax = findRenderedDOMComponentWithClass(taskComponentMax, priorityLevelMaxClass)

      expect(priority).to.equal('')
      expect(callbackId).to.equal(-12)

      Simulate.click(priorityLevelComponentNone)
      expect(priority).to.equal(priorityLevels.PRIORITY_NONE)
      expect(callbackId).to.equal(0)

      Simulate.click(priorityLevelComponentLow)
      expect(priority).to.equal(priorityLevels.PRIORITY_LOW)
      expect(callbackId).to.equal(1)

      Simulate.click(priorityLevelComponentMedium)
      expect(priority).to.equal(priorityLevels.PRIORITY_MEDIUM)
      expect(callbackId).to.equal(2)

      Simulate.click(priorityLevelComponentHigh)
      expect(priority).to.equal(priorityLevels.PRIORITY_HIGH)
      expect(callbackId).to.equal(3)

      Simulate.click(priorityLevelComponentMax)
      expect(priority).to.equal(priorityLevels.PRIORITY_MAX)
      expect(callbackId).to.equal(4)
    })
  })
  describe('Task Body', () => {
    it('Should render task title', () => {
      const titleClass = 'task__title'
      const taskComponent = renderIntoDocument(<Task title={testTasks.get(0).get('title')} />)
      const titleComponent = findRenderedDOMComponentWithClass(taskComponent, titleClass)

      expect(titleComponent.textContent).to.equal(testTasks.get(0).get('title'))
    })
    it('Should render task description', () => {
      const descriptionClass = 'task__description'
      const taskComponent = renderIntoDocument(<Task description={testTasks.get(0).get('description')} />)
      const descriptionComponent = findRenderedDOMComponentWithClass(taskComponent, descriptionClass)

      expect(descriptionComponent.textContent).to.equal(testTasks.get(0).get('description'))
    })
    it('Should render task date', () => {
      const dateClass = 'task__date'
      const taskComponent = renderIntoDocument(<Task date={testTasks.get(0).get('date')} />)
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

      const taskComponent = renderIntoDocument(<Task id={0} title={testTasks.get(0).get('title')} description={testTasks.get(0).get('description')} date={testTasks.get(0).get('date')} onTaskClick={callback} />)
      const bodyComponent = findRenderedDOMComponentWithClass(taskComponent, bodyClass)
      const titleComponent = findRenderedDOMComponentWithClass(taskComponent, titleClass)
      const descriptionComponent = findRenderedDOMComponentWithClass(taskComponent, descriptionClass)
      const dateComponent = findRenderedDOMComponentWithClass(taskComponent, dateClass)

      expect(callbackId).to.equal(-12)
      Simulate.click(bodyComponent)
      expect(callbackId).to.equal(0)

      callbackId = -12
      expect(callbackId).to.equal(-12)
      Simulate.click(titleComponent)
      expect(callbackId).to.equal(0)

      callbackId = -12
      expect(callbackId).to.equal(-12)
      Simulate.click(descriptionComponent)
      expect(callbackId).to.equal(0)

      callbackId = -12
      expect(callbackId).to.equal(-12)
      Simulate.click(dateComponent)
      expect(callbackId).to.equal(0)
    })
  })
})
