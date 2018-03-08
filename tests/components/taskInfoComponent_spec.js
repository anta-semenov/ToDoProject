import React from 'react'
import { shallow } from 'enzyme'
import TaskInfo from '../../src/components/taskInfo/TaskInfo'

describe('TaskInfo component', () => {
  const props = {
    onTaskCheckboxClick: () => {},
    onTaskTodayClick: () => {},
    onPriorityClick: () => {},
    onTitleChange: () => {},
    onDescriptionChange: () => {},
    onProjectChange: () => {},
    onContextClick: () => {},
    onDateChange: () => {},
    onCloseClick: () => {},
    onTaskSomedayClick: () => {},
    onTaskDeleteClick: () => {}
  }
  describe('Delete Task', () => {
    test('Should render delete task button', () => {
      const taskInfoComponent = shallow(<TaskInfo id={'b41sogy3s0o2'} {...props} />)
      expect(taskInfoComponent).toMatchSnapshot()
    })
    test('Should handle click on delete task button', () => {
      const onTaskDeleteClick = jest.fn()
      const taskInfoComponent = shallow(
        <TaskInfo id={'b41sogy3s0o2'} {...props} onTaskDeleteClick={onTaskDeleteClick} />
      )
      taskInfoComponent.find('.task-info__delete').simulate('click')

      expect(onTaskDeleteClick).toHaveBeenCalled()
    })
  })
})
