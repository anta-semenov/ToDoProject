import React from 'react'
import { fromJS } from 'immutable'
import { renderIntoDocument, findRenderedDOMComponentWithTag, findRenderedDOMComponentWithClass, Simulate } from 'react-addons-test-utils'
import { TaskClass as Task } from '../../src/components/tasks/task/Task'
import * as priorityLevels from '../../src/constants/priorityLevels'
import { DATE_FORMAT } from '../../src/constants/defaults'

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
  test('Should render Task component with active and completed classes', () => {
    const taskComponent = renderIntoDocument(<Task active={true} completed={true} {...mockDragFunctions}/>)
    const taskElement = findRenderedDOMComponentWithTag(taskComponent, 'li')

    expect(taskElement.className).toContain('task')
      .and.toContain('is-active')
      .and.toContain('is-completed')
  })
  test(
    'Should render Task component without active and completed classes',
    () => {
      const taskClass = 'task'
      const activeClass = 'is-active'
      const completedClass = 'is-completed'
      const taskComponent = renderIntoDocument(<Task active={false} completed={false} {...mockDragFunctions}/>)
      const taskElement = findRenderedDOMComponentWithTag(taskComponent, 'li')

      expect(taskElement.className).toContain(taskClass)
      expect(taskElement.className).not.toContain(activeClass)
      expect(taskElement.className).not.toContain(completedClass)
    }
  )
  describe('Checkbox', () => {
    test('Should render complete checkbox', () => {
      const checkboxClass = 'checkbox'
      const taskComponent = renderIntoDocument(<Task completed={testTasks.get(0).get('completed')} {...mockDragFunctions} />)
      const checkboxComponent = findRenderedDOMComponentWithClass(taskComponent, checkboxClass)

      expect(checkboxComponent.className).toContain('is-checked')
    })
    test('Should render uncomplete checkbox', () => {
      const checkboxClass = 'checkbox'
      const taskComponent = renderIntoDocument(<Task completed={testTasks.get(1).get('completed')} {...mockDragFunctions} />)
      const checkboxComponent = findRenderedDOMComponentWithClass(taskComponent, checkboxClass)

      expect(checkboxComponent.className).not.toContain('is-checked')
    })
    test('Should invoke complete callback when change event occurs', () => {
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

      expect(checkedId).toBe(-12)
      expect(checkStatus).toBe(true)

      Simulate.click(checkboxComponent)
      expect(checkedId).toBe('b41sogy3s0o0')
      expect(checkStatus).toBe(false)
    })
  })
  describe('Today', () => {
    test('Should render checked today toggle', () => {
      const todayClass = 'today'
      const taskComponent = renderIntoDocument(<Task today={testTasks.get(0).get('today')} {...mockDragFunctions} />)
      const todayToggle = findRenderedDOMComponentWithClass(taskComponent, todayClass)

      expect(todayToggle.className).toContain('is-checked')
    })
    test('Should render unchecked today toggle', () => {
      const todayClass = 'today'
      const taskComponent = renderIntoDocument(<Task today={testTasks.get(1).get('today')} {...mockDragFunctions} />)
      const todayToggle = findRenderedDOMComponentWithClass(taskComponent, todayClass)

      expect(todayToggle.className).not.toContain('is-checked')
    })
    test('Should invoke today callback when click occurs', () => {
      let callbackId = -12
      let callbackStatus = true
      const callback = (id, status) => {callbackId = id, callbackStatus = status}
      const todayClass = 'today'
      const taskComponent = renderIntoDocument(<Task today={testTasks.get(0).get('today')} id={testTasks.get(0).get('id')} onTaskTodayClick={callback} {...mockDragFunctions} />)
      const todayToggle = findRenderedDOMComponentWithClass(taskComponent, todayClass)

      expect(callbackId).toBe(-12)
      expect(callbackStatus).toBe(true)
      Simulate.click(todayToggle)
      expect(callbackId).toBe(testTasks.get(0).get('id'))
      expect(callbackStatus).toBe(!testTasks.get(0).get('today'))
    })
  })
  describe('Priority', () => {
    test('Should invoke callback when click on priority level', () => {
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

      const taskComponentNone = renderIntoDocument(<Task id={'b41sogy3s0o0'} onTaskPriorityClick={callback} {...mockDragFunctions} />)
      const taskComponentLow = renderIntoDocument(<Task id={'b41sogy3s0o1'}  onTaskPriorityClick={callback} {...mockDragFunctions} />)
      const taskComponentMedium = renderIntoDocument(<Task id={'b41sogy3s0o2'} onTaskPriorityClick={callback} {...mockDragFunctions} />)
      const taskComponentHigh = renderIntoDocument(<Task id={'b41sogy3s0o3'} onTaskPriorityClick={callback} {...mockDragFunctions} />)
      const taskComponentMax = renderIntoDocument(<Task id={'b41sogy3s0o4'} onTaskPriorityClick={callback} {...mockDragFunctions} />)

      const priorityLevelComponentNone = findRenderedDOMComponentWithClass(taskComponentNone, priorityLevelNoneClass)
      const priorityLevelComponentLow = findRenderedDOMComponentWithClass(taskComponentLow, priorityLevelLowClass)
      const priorityLevelComponentMedium = findRenderedDOMComponentWithClass(taskComponentMedium, priorityLevelMediumClass)
      const priorityLevelComponentHigh= findRenderedDOMComponentWithClass(taskComponentHigh, priorityLevelHighClass)
      const priorityLevelComponentMax = findRenderedDOMComponentWithClass(taskComponentMax, priorityLevelMaxClass)

      expect(priority).toBe('')
      expect(callbackId).toBe(-12)

      Simulate.click(priorityLevelComponentNone)
      expect(priority).toBe(priorityLevels.PRIORITY_NONE)
      expect(callbackId).toBe('b41sogy3s0o0')

      Simulate.click(priorityLevelComponentLow)
      expect(priority).toBe(priorityLevels.PRIORITY_LOW)
      expect(callbackId).toBe('b41sogy3s0o1')

      Simulate.click(priorityLevelComponentMedium)
      expect(priority).toBe(priorityLevels.PRIORITY_MEDIUM)
      expect(callbackId).toBe('b41sogy3s0o2')

      Simulate.click(priorityLevelComponentHigh)
      expect(priority).toBe(priorityLevels.PRIORITY_HIGH)
      expect(callbackId).toBe('b41sogy3s0o3')

      Simulate.click(priorityLevelComponentMax)
      expect(priority).toBe(priorityLevels.PRIORITY_MAX)
      expect(callbackId).toBe('b41sogy3s0o4')
    })
  })
  describe('Task Body', () => {
    test('Should render task title', () => {
      const titleClass = 'task__title'
      const taskComponent = renderIntoDocument(<Task title={testTasks.get(0).get('title')} {...mockDragFunctions} />)
      const titleComponent = findRenderedDOMComponentWithClass(taskComponent, titleClass)

      expect(titleComponent.textContent).toBe(testTasks.get(0).get('title'))
    })
    test('Should render task description', () => {
      const descriptionClass = 'task__description'
      const taskComponent = renderIntoDocument(<Task description={testTasks.get(0).get('description')} {...mockDragFunctions} />)
      const descriptionComponent = findRenderedDOMComponentWithClass(taskComponent, descriptionClass)

      expect(descriptionComponent.textContent).toBe(testTasks.get(0).get('description'))
    })
    test('Should render task date', () => {
      const dateClass = 'task__date'
      const taskComponent = renderIntoDocument(<Task date={testTasks.get(0).get('date')} {...mockDragFunctions} />)
      const dateComponent = findRenderedDOMComponentWithClass(taskComponent, dateClass)

      expect(dateComponent.textContent).toBe(testTasks.get(0).get('date').toLocaleDateString('en-US', DATE_FORMAT))
    })
    test(
      'Should invoke callback when click on task body, title, description or date occurs',
      () => {
        let callbackId = -12
        const callback = id => callbackId = id
        const bodyClass = 'task__body'
        const titleClass = 'task__title'
        const descriptionClass = 'task__description'

        const taskComponent = renderIntoDocument(<Task id={'b41sogy3s0o0'} title={testTasks.get(0).get('title')} description={testTasks.get(0).get('description')} date={testTasks.get(0).get('date')} onTaskClick={callback} {...mockDragFunctions} />)
        const bodyComponent = findRenderedDOMComponentWithClass(taskComponent, bodyClass)
        const titleComponent = findRenderedDOMComponentWithClass(taskComponent, titleClass)
        const descriptionComponent = findRenderedDOMComponentWithClass(taskComponent, descriptionClass)

        expect(callbackId).toBe(-12)
        Simulate.click(bodyComponent)
        expect(callbackId).toBe('b41sogy3s0o0')

        callbackId = -12
        expect(callbackId).toBe(-12)
        Simulate.click(titleComponent)
        expect(callbackId).toBe('b41sogy3s0o0')

        callbackId = -12
        expect(callbackId).toBe(-12)
        Simulate.click(descriptionComponent)
        expect(callbackId).toBe('b41sogy3s0o0')
      }
    )
  })
})
