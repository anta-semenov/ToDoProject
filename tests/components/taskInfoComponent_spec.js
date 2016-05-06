import { expect } from 'chai'
import React from 'react'
import { renderIntoDocument, findRenderedDOMComponentWithClass, Simulate } from 'react-addons-test-utils'

import TaskInfo from '../../src/components/taskInfo/TaskInfo'

describe('TaskInfo component', () => {
  describe('Delete Task', () => {
    it('Should render delete task button', () => {
      const taskInfoComponent = renderIntoDocument(<TaskInfo id={2} />)
      const deleteBtn = findRenderedDOMComponentWithClass(taskInfoComponent, 'task-info__delete')
      expect(deleteBtn.className).to.equal('task-info__delete')
    })
    it('Should handle click on delete task button', () => {
      let id = -1
      const callback = () => {id = 1}
      const taskInfoComponent = renderIntoDocument(<TaskInfo id={2} onTaskDeleteClick={callback} />)
      const deleteBtn = findRenderedDOMComponentWithClass(taskInfoComponent, 'task-info__delete')

      expect(id).to.equal(-1)
      Simulate.click(deleteBtn)
      expect(id).to.equal(1)
    })
  })
})
