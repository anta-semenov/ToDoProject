import { expect } from 'chai'
import React from 'react'
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, findRenderedDOMComponentWithClass, Simulate } from 'react-addons-test-utils'

import AddTask from '../../src/components/tasks/addTask/AddTask'

describe('AddTask component tests', () => {
  it('Should render textfield', () => {
    const addTaskTextfieldClassName = 'add-task__textfield'
    const addTaskComponent = renderIntoDocument(<AddTask />)
    const addTaskTextfield = scryRenderedDOMComponentsWithTag(addTaskComponent, 'input')

    expect(addTaskTextfield.length).to.equal(1)
    expect(addTaskTextfield[0].className).to.equal(addTaskTextfieldClassName)
  })
  it('Should render "Add Task" button', () => {
    const addTaskButtonClassName = 'add-task__button'
    const addTaskButtonText = 'Add Task'
    const addTaskComponent = renderIntoDocument(<AddTask />)
    const addTaskButton = scryRenderedDOMComponentsWithTag(addTaskComponent, 'button')

    expect(addTaskButton.length).to.equal(1)
    expect(addTaskButton[0].className).to.equal(addTaskButtonClassName)
    expect(addTaskButton[0].textContent).to.equal(addTaskButtonText)
  })
  it('Should invoke addTask callback and clear the AddTextfield value when button click event occur', () => {
    let newTaskTitle = ''
    const callback = newTitle => newTaskTitle = newTitle

    const taskTitle = 'New Task'
    const addTaskButtonClassName = 'add-task__button'
    const addTaskTextfieldClassName = 'add-task__textfield'
    const addTaskComponent = renderIntoDocument(<AddTask addTask={callback}/>)
    const addTaskTextfield = findRenderedDOMComponentWithClass(addTaskComponent, addTaskTextfieldClassName)
    const addTaskButton = findRenderedDOMComponentWithClass(addTaskComponent, addTaskButtonClassName)

    expect(addTaskTextfield.value).to.equal('')
    addTaskTextfield.value = taskTitle
    Simulate.change(addTaskTextfield)
    expect(addTaskTextfield.value).to.equal('New Task')
    expect(newTaskTitle).to.equal('')
    Simulate.click(addTaskButton)
    expect(addTaskTextfield.value).to.equal('')
    expect(newTaskTitle).to.equal(taskTitle)
  })

  it('Should invoke addTask callback and clear the AddTextfield value when enter is hitted', () => {
    let newTaskTitle = ''
    const callback = newTitle => newTaskTitle = newTitle

    const taskTitle = 'New Task'
    const addTaskTextfieldClassName = 'add-task__textfield'
    const addTaskComponent = renderIntoDocument(<AddTask addTask={callback}/>)
    const addTaskTextfield = findRenderedDOMComponentWithClass(addTaskComponent, addTaskTextfieldClassName)

    expect(addTaskTextfield.value).to.equal('')
    addTaskTextfield.value = taskTitle
    Simulate.change(addTaskTextfield)
    expect(addTaskTextfield.value).to.equal('New Task')
    expect(newTaskTitle).to.equal('')
    Simulate.keyDown(addTaskTextfield, {key: 'Enter', keyCode: 13, which: 13})
    expect(addTaskTextfield.value).to.equal('')
    expect(newTaskTitle).to.equal(taskTitle)
  })
})
