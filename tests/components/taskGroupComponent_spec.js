import React from 'react'
import { shallow } from 'enzyme'
import { fromJS } from 'immutable'

import TaskGroup from '../../src/components/tasks/taskGroup/TaskGroup'

describe('TaskGroup component tests', () => {
  TaskGroup.__Rewire__(
    'Task',
    class extends React.Component {
      render() {
        return (
          <div className="task">
            <div className="task__title">{this.props.title}</div>
          </div>
        )
      }
    }
  )
  const props = {
    onTaskClick: () => {},
    onTaskCheckboxClick: () => {},
    onTaskTodayClick: () => {},
    onTaskPriorityClick: () => {},
    onTaskTrackingClick: () => {},
    addTaskToProject: () => {},
    addTaskContext: () => {}
  }

  test('Should render group name if it has one', () => {
    const taskGroup = shallow(<TaskGroup groupTitle="Test group" tasks={fromJS([])} {...props} />)
    expect(taskGroup).toMatchSnapshot()
  })
})
