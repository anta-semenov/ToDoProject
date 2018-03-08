import React from 'react'
import { fromJS } from 'immutable'
import { shallow, mount } from 'enzyme'
import { TaskClass as Task } from '../../src/components/tasks/task/Task'
import * as priorityLevels from '../../src/constants/priorityLevels'

const testTasks = fromJS([
  {
    id: 'b41sogy3s0o0',
    title: 'Explore React',
    completed: true,
    today: true,
    description: 'Make Tutorial on oficial react website',
    priority: priorityLevels.PRIORITY_MEDIUM,
    date: new Date(2015, 4, 15),
    connectDragPreview: element => element,
    connectDragSource: element => element
  },
  {
    id: 'b41sogy3s0o1',
    title: 'Explore Redux',
    completed: false,
    today: false,
    connectDragPreview: element => element,
    connectDragSource: element => element
  }
])

const mockDragFunctions = {
  connectDragPreview: element => element,
  connectDragSource: element => element
}
const props = {
  id: '37897hjkdha',
  title: 'test title',
  someday: true,
  onTaskClick: () => {},
  onTaskCheckboxClick: () => {},
  onTaskTodayClick: () => {},
  onTaskPriorityClick: () => {},
  onTaskTrackingClick: () => {},
  addTaskToProject: () => {},
  addTaskContext: () => {}
}

describe('Task component', () => {
  it('Should render Task component with active and completed classes', () => {
    const taskComponent = shallow(
      <Task {...props} active={true} completed={true} {...mockDragFunctions} />
    )
    expect(taskComponent).toMatchSnapshot()
  })
  it('Should render Task component without active and completed classes', () => {
    const taskComponent = shallow(
      <Task {...props} active={false} completed={false} {...mockDragFunctions} />
    )
    expect(taskComponent).toMatchSnapshot()
  })
  describe('Checkbox', () => {
    const checkboxClass = '.checkbox'
    it('Should render complete checkbox', () => {
      const taskComponent = mount(
        <Task {...props} completed={testTasks.get(0).get('completed')} {...mockDragFunctions} />
      )
      const checkboxComponent = taskComponent.find(checkboxClass)
      expect(checkboxComponent).toMatchSnapshot()
    })
    it('Should render uncomplete checkbox', () => {
      const taskComponent = mount(
        <Task {...props} completed={testTasks.get(1).get('completed')} {...mockDragFunctions} />
      )
      const checkboxComponent = taskComponent.find(checkboxClass)
      expect(checkboxComponent).toMatchSnapshot()
    })
    it('Should invoke complete callback when change event occurs', () => {
      // const checkboxClass = 'checkbox'
      let checkedId = -12
      let checkStatus = true
      const callback = (id, status) => {
        checkedId = id
        checkStatus = status
      }
      const taskComponent = mount(
        <Task
          {...props}
          completed={testTasks.getIn([0, 'completed'])}
          id={testTasks.getIn([0, 'id'])}
          onTaskCheckboxClick={callback}
          {...mockDragFunctions}
        />
      )
      const checkboxComponent = taskComponent.find(checkboxClass).first()
      expect(checkedId).toBe(-12)
      expect(checkStatus).toBe(true)

      checkboxComponent.simulate('click')
      expect(checkedId).toBe('b41sogy3s0o0')
      expect(checkStatus).toBe(false)
    })
  })
  describe('Today', () => {
    const todayClass = '.today'
    it('Should render checked today toggle', () => {
      const taskComponent = mount(
        <Task {...props} today={testTasks.get(0).get('today')} {...mockDragFunctions} />
      )
      const checkboxComponent = taskComponent.find(todayClass)
      expect(checkboxComponent).toMatchSnapshot()
    })
    it('Should render unchecked today toggle', () => {
      const taskComponent = mount(
        <Task {...props} today={testTasks.get(1).get('today')} {...mockDragFunctions} />
      )
      const checkboxComponent = taskComponent.find(todayClass)
      expect(checkboxComponent).toMatchSnapshot()
    })
    it('Should invoke today callback when click occurs', () => {
      let callbackId = -12
      let callbackStatus = true
      const callback = (id, status) => {
        callbackId = id
        callbackStatus = status
      }
      const taskComponent = mount(
        <Task
          {...props}
          today={testTasks.get(0).get('today')}
          id={testTasks.get(0).get('id')}
          onTaskTodayClick={callback}
          {...mockDragFunctions}
        />
      )

      expect(callbackId).toBe(-12)
      expect(callbackStatus).toBe(true)

      taskComponent.find(todayClass).simulate('click')
      expect(callbackId).toBe(testTasks.get(0).get('id'))
      expect(callbackStatus).toBe(!testTasks.get(0).get('today'))
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
      const priorityLevelNoneClass = '.priority-level--none'
      const priorityLevelLowClass = '.priority-level--low'
      const priorityLevelMediumClass = '.priority-level--medium'
      const priorityLevelHighClass = '.priority-level--high'
      const priorityLevelMaxClass = '.priority-level--max'

      const taskComponentNone = mount(
        <Task
          {...props}
          id={'b41sogy3s0o0'}
          onTaskPriorityClick={callback}
          {...mockDragFunctions}
        />
      )
      const taskComponentLow = mount(
        <Task
          {...props}
          id={'b41sogy3s0o1'}
          onTaskPriorityClick={callback}
          {...mockDragFunctions}
        />
      )
      const taskComponentMedium = mount(
        <Task
          {...props}
          id={'b41sogy3s0o2'}
          onTaskPriorityClick={callback}
          {...mockDragFunctions}
        />
      )
      const taskComponentHigh = mount(
        <Task
          {...props}
          id={'b41sogy3s0o3'}
          onTaskPriorityClick={callback}
          {...mockDragFunctions}
        />
      )
      const taskComponentMax = mount(
        <Task
          {...props}
          id={'b41sogy3s0o4'}
          onTaskPriorityClick={callback}
          {...mockDragFunctions}
        />
      )

      const priorityLevelComponentNone = taskComponentNone.find(priorityLevelNoneClass)
      const priorityLevelComponentLow = taskComponentLow.find(priorityLevelLowClass)
      const priorityLevelComponentMedium = taskComponentMedium.find(priorityLevelMediumClass)
      const priorityLevelComponentHigh = taskComponentHigh.find(priorityLevelHighClass)
      const priorityLevelComponentMax = taskComponentMax.find(priorityLevelMaxClass)

      expect(priority).toBe('')
      expect(callbackId).toBe(-12)

      priorityLevelComponentNone.simulate('click')
      expect(priority).toBe(priorityLevels.PRIORITY_NONE)
      expect(callbackId).toBe('b41sogy3s0o0')

      priorityLevelComponentLow.simulate('click')
      expect(priority).toBe(priorityLevels.PRIORITY_LOW)
      expect(callbackId).toBe('b41sogy3s0o1')

      priorityLevelComponentMedium.simulate('click')
      expect(priority).toBe(priorityLevels.PRIORITY_MEDIUM)
      expect(callbackId).toBe('b41sogy3s0o2')

      priorityLevelComponentHigh.simulate('click')
      expect(priority).toBe(priorityLevels.PRIORITY_HIGH)
      expect(callbackId).toBe('b41sogy3s0o3')

      priorityLevelComponentMax.simulate('click')
      expect(priority).toBe(priorityLevels.PRIORITY_MAX)
      expect(callbackId).toBe('b41sogy3s0o4')
    })
  })
  describe('Task Body', () => {
    const titleClass = '.task__title'
    it('Should render task title', () => {
      const taskComponent = mount(
        <Task {...props} title={testTasks.get(0).get('title')} {...mockDragFunctions} />
      )
      const titleComponent = taskComponent.find(titleClass)
      expect(titleComponent).toMatchSnapshot()
    })
    it('Should render task description', () => {
      const taskComponent = shallow(
        <Task {...props} description={testTasks.get(0).get('description')} {...mockDragFunctions} />
      )
      expect(taskComponent.find('.task__description')).toMatchSnapshot()
    })
    it('Should render task date', () => {
      const taskComponent = shallow(
        <Task {...props} date={testTasks.get(0).get('date')} {...mockDragFunctions} />
      )
      expect(taskComponent.find('.task__date')).toMatchSnapshot()
    })
    it('Should invoke callback when click on task body, title, description or date occurs', () => {
      let callbackId = -12
      const callback = id => (callbackId = id)

      const taskComponent = mount(
        <Task
          {...props}
          id={'b41sogy3s0o0'}
          title={testTasks.get(0).get('title')}
          description={testTasks.get(0).get('description')}
          date={testTasks.get(0).get('date')}
          onTaskClick={callback}
          {...mockDragFunctions}
        />
      )
      const bodyComponent = taskComponent.find('.task__body')
      const titleComponent = taskComponent.find('.task__title')
      const descriptionComponent = taskComponent.find('.task__description')

      expect(callbackId).toBe(-12)
      bodyComponent.simulate('click')
      expect(callbackId).toBe('b41sogy3s0o0')

      callbackId = -12
      expect(callbackId).toBe(-12)
      titleComponent.simulate('click')
      expect(callbackId).toBe('b41sogy3s0o0')

      callbackId = -12
      expect(callbackId).toBe(-12)
      descriptionComponent.simulate('click')
      expect(callbackId).toBe('b41sogy3s0o0')
    })
  })
})
