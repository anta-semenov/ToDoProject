import React from 'react'
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, findRenderedDOMComponentWithClass, Simulate } from 'react-addons-test-utils'

import AddTask from '../../src/components/tasks/addTask/AddTask'

describe('AddTask component tests', () => {
  test('Should render textfield', () => {
    const addTaskTextfieldClassName = 'add-task__textfield'
    const addTaskComponent = renderIntoDocument(<AddTask />)
    const addTaskTextfield = scryRenderedDOMComponentsWithTag(addTaskComponent, 'input')

    expect(addTaskTextfield.length).toBe(1)
    expect(addTaskTextfield[0].className).toBe(addTaskTextfieldClassName)
  })
  test('Should render "Add Task" button', () => {
    const addTaskButtonClassName = 'add-task__button'
    const addTaskButtonText = 'Add Task'
    const addTaskComponent = renderIntoDocument(<AddTask />)
    const addTaskButton = scryRenderedDOMComponentsWithTag(addTaskComponent, 'button')

    expect(addTaskButton.length).toBe(1)
    expect(addTaskButton[0].className).toBe(addTaskButtonClassName)
    expect(addTaskButton[0].textContent).toBe(addTaskButtonText)
  })
  test(
    'Should invoke addTask callback and clear the AddTextfield value when button click event occur',
    () => {
      let newTaskTitle = ''
      const callback = newTitle => newTaskTitle = newTitle

      const taskTitle = 'New Task'
      const addTaskButtonClassName = 'add-task__button'
      const addTaskTextfieldClassName = 'add-task__textfield'
      const addTaskComponent = renderIntoDocument(<AddTask addTask={callback} setSearchQuery={() => {}}/>)
      const addTaskTextfield = findRenderedDOMComponentWithClass(addTaskComponent, addTaskTextfieldClassName)
      const addTaskButton = findRenderedDOMComponentWithClass(addTaskComponent, addTaskButtonClassName)

      expect(addTaskTextfield.value).toBe('')
      addTaskTextfield.value = taskTitle
      Simulate.change(addTaskTextfield)
      expect(addTaskTextfield.value).toBe('New Task')
      expect(newTaskTitle).toBe('')
      Simulate.click(addTaskButton)
      expect(addTaskTextfield.value).toBe('')
      expect(newTaskTitle).toBe(taskTitle)
    }
  )

  test(
    'Should invoke addTask callback and clear the AddTextfield value when enter is hitted',
    () => {
      let newTaskTitle = ''
      const callback = newTitle => newTaskTitle = newTitle

      const taskTitle = 'New Task'
      const addTaskTextfieldClassName = 'add-task__textfield'
      const addTaskComponent = renderIntoDocument(<AddTask addTask={callback} setSearchQuery={() => {}}/>)
      const addTaskTextfield = findRenderedDOMComponentWithClass(addTaskComponent, addTaskTextfieldClassName)

      expect(addTaskTextfield.value).toBe('')
      addTaskTextfield.value = taskTitle
      Simulate.change(addTaskTextfield)
      expect(addTaskTextfield.value).toBe('New Task')
      expect(newTaskTitle).toBe('')
      Simulate.keyDown(addTaskTextfield, {key: 'Enter', keyCode: 13, which: 13})
      expect(addTaskTextfield.value).toBe('')
      expect(newTaskTitle).toBe(taskTitle)
    }
  )
})
