import PropTypes from 'prop-types'
import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import './TaskProject.less'

const TaskProject = ({ taskProject, projects, onProjectChange }) => (
  <div className="projects">
    <div className="projects__title">Project</div>
    {projects && projects.size > 0 ? (
      <select
        className={`projects__selector${taskProject ? ' is-selected' : ''}`}
        value={taskProject || ''}
        onChange={e => onProjectChange(e.target.options.item(e.target.selectedIndex).value)}
      >
        <option value="">No Project</option>
        {projects.toArray().map(project => (
          <option key={project.get('id')} value={project.get('id')}>
            {project.get('title')}
          </option>
        ))}
      </select>
    ) : (
      <div className={'projects__empty-list'}>You haven't create any projects yet.</div>
    )}
  </div>
)

TaskProject.propTypes = {
  taskProject: PropTypes.string,
  projects: ImmutablePropTypes.mapOf(
    ImmutablePropTypes.contains({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    })
  ),
  onProjectChange: PropTypes.func.isRequired
}

export default TaskProject
