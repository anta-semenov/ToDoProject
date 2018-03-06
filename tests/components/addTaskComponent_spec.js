import React from 'react'
import { mount } from 'enzyme'

import AddTask from '../../src/components/tasks/addTask/AddTask'

beforeEach(() => {
  jest.clearAllMocks()
})

describe('AddTask component tests', () => {
  it('Should render textfield and button', () => {
    const addTaskComponent = mount(<AddTask addTask={jest.fn()} setSearchQuery={jest.fn()} />)
    expect(addTaskComponent).toMatchSnapshot()
  })
  it('Should invoke addTask callback and clear the AddTextfield value when button click event occur', () => {
    const addTask = jest.fn()
    const addTaskComponent = mount(<AddTask addTask={addTask} setSearchQuery={jest.fn()} />)

    addTaskComponent.find('.add-task__button-text').simulate('click')
    expect(addTask).toHaveBeenCalled()
  })
  it('Should invoke setSearchQuery callback and clear the AddTextfield value when button click event occur', () => {
    const addTask = jest.fn()
    const setSearchQuery = jest.fn()
    const addTaskComponent = mount(<AddTask addTask={addTask} setSearchQuery={setSearchQuery} />)

    addTaskComponent.find('input').simulate('change', { target: { value: 'add' } })
    expect(addTaskComponent).toMatchSnapshot()
    expect(setSearchQuery).toHaveBeenCalledWith('add')

    addTaskComponent.find('.add-task__button-text').simulate('click')
    expect(addTask).toHaveBeenCalled()
    expect(setSearchQuery).toHaveBeenCalledWith('')
  })

  it('Should invoke addTask callback and clear the AddTextfield value when enter is hitted', () => {
    const addTask = jest.fn()
    const addTaskComponent = mount(<AddTask addTask={addTask} setSearchQuery={jest.fn()} />)

    addTaskComponent.find('input').simulate('keyDown', { key: 'Enter', keyCode: 13, which: 13 })
    expect(addTask).toHaveBeenCalled()
  })
})
