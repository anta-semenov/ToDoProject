import React from 'react'
import { renderIntoDocument, findRenderedDOMComponentWithClass, Simulate } from 'react-addons-test-utils'

import TaskInfo from '../../src/components/taskInfo/TaskInfo'

describe('TaskInfo component', () => {
  describe('Delete Task', () => {
    test('Should render delete task button', () => {
      const taskInfoComponent = renderIntoDocument(<TaskInfo id={'b41sogy3s0o2'} />)
      const deleteBtn = findRenderedDOMComponentWithClass(taskInfoComponent, 'task-info__delete')
      expect(deleteBtn.className).toBe('task-info__delete')
    })
    test('Should handle click on delete task button', () => {
      let id = -1
      const callback = () => {id = 1}
      const taskInfoComponent = renderIntoDocument(<TaskInfo id={'b41sogy3s0o2'} onTaskDeleteClick={callback} />)
      const deleteBtn = findRenderedDOMComponentWithClass(taskInfoComponent, 'task-info__delete')

      expect(id).toBe(-1)
      Simulate.click(deleteBtn)
      expect(id).toBe(1)
    })
  })
})
