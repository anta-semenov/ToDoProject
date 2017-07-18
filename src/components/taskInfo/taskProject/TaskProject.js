import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import './TaskProject.less'

const TaskProject = ({ taskProject, projects, onProjectChange}) => (
  <div className='projects'>
    <div className='projects__title'>Project</div>
    {
      projects && projects.size > 0 ?
      <select
        className={`projects__selector${taskProject ? ' is-selected' : ''}`}
        value={taskProject || ''}
        onChange={(e) => onProjectChange(e.target.options.item(e.target.selectedIndex).value)}
      >
        <option value='' >No Project</option>
        {projects.map(project => <option key={project.get('id')} value={project.get('id')} >{project.get('title')}</option> )}
      </select> :
      <div className={'projects__empty-list'}>You haven't create any projects yet.</div>
    }
  </div>
)

TaskProject.propTypes = {
  taskProject: React.PropTypes.string,
  projects: ImmutablePropTypes.mapOf(
    ImmutablePropTypes.contains({
      id: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      completed: React.PropTypes.bool.isRequired
    })
  ),
  onProjectChange: React.PropTypes.func.isRequired
}

export default TaskProject
