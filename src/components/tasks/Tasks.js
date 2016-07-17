import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { PROJECT, CONTEXT, INBOX, TODAY, NEXT } from '../../constants/sectionTypes.js'
import TaskGroup from './taskGroup/TaskGroup'
import AddTask from './addTask/AddTask'
import SectionHeader from './sectionHeader/SectionHeader'

import './Tasks.less'

const Tasks = props => (
  <div className={`tasks ${props.activeItem != '' ? 'has-active-item' : ''}`}>
    <SectionHeader
      sectionName={props.sectionName}
      sectionType={props.sectionType}
      isSectionComplete={props.isSectionComplete}
      onSectionNameChange={props.onSectionNameChange}
      onSectionDelete={props.onSectionDelete}
      onSectionComplete={props.onSectionComplete}
    />
    <AddTask addTask={props.addTask} />
    {props.groups ?
      <ul className='tasks__list'>
        {props.groups.map((group, index) =>
          <TaskGroup
            key={index}
            groupTitle={group.get('title')}
            tasks={group.get('items')}
            activeItem={props.activeItem}
            latentTasks={props.latentTasks}
            trackingTask={props.trackingTask}
            onTaskClick={props.onTaskClick}
            onTaskCheckboxClick={props.onTaskCheckboxClick}
            onTaskTodayClick={props.onTaskTodayClick}
            onPriorityClick={props.onTaskPriorityClick}
            onTrackingClick={props.onTrackingClick}
            onTaskSomedayClick={props.onTaskSomedayClick}
            addTaskToProject={props.addTaskToProject}
            addTaskContext={props.addTaskContext}
          />
        )}
      </ul>
      :
      <div className='tasks__empty-state'>This section doesn't have any tasks. This text should be replaced with a component for empty space.</div>
    }
  </div>
)

Tasks.propTypes = {
  groups: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      items: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
          id: React.PropTypes.string.isRequired,
          title: React.PropTypes.string.isRequired,
          completed: React.PropTypes.bool.isRequired,
          today: React.PropTypes.bool.isRequired,
          priority: React.PropTypes.string.isRequired,
          description: React.PropTypes.oneOfType([
            React.PropTypes.string,
            ImmutablePropTypes.map
          ]),
          date: React.PropTypes.number
        })
      ).isRequired,
      title: React.PropTypes.string
    })
  ),
  activeItem: React.PropTypes.string,
  latentTasks: ImmutablePropTypes.mapOf(React.PropTypes.number),
  trackingTask: React.PropTypes.string,

  sectionName: React.PropTypes.string.isRequired,
  sectionType: React.PropTypes.oneOf([PROJECT, CONTEXT, INBOX, TODAY, NEXT]).isRequired,
  isSectionComplete: React.PropTypes.bool,

  onSectionNameChange: React.PropTypes.func.isRequired,
  onSectionDelete: React.PropTypes.func.isRequired,
  onSectionComplete: React.PropTypes.func.isRequired,

  onTaskClick: React.PropTypes.func.isRequired,
  onTaskCheckboxClick: React.PropTypes.func.isRequired,
  onTaskTodayClick: React.PropTypes.func.isRequired,
  onTaskPriorityClick: React.PropTypes.func.isRequired,
  onTrackingClick: React.PropTypes.func.isRequired,
  onTaskSomedayClick: React.PropTypes.func.isRequired,
  addTaskToProject: React.PropTypes.func.isRequired,
  addTaskContext: React.PropTypes.func.isRequired,

  addTask: React.PropTypes.func.isRequired
}

export default Tasks
