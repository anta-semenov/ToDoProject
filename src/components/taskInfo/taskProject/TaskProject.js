import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import './TaskProject.less'

export default class TaskProject extends React.Component {
  render() {
    return (
      <div className='projects'>
        <div className='projects__title'>Project</div>
        {
          this.props.projects && this.props.projects.size > 0 ?
          <select className={`projects__selector ${this.props.taskProject ? 'is-selected' : ''}`} value={this.props.taskProject} onChange={(e) => this.props.onProjectChange(e.target.options.item(e.target.selectedIndex).value)} >
            <option value='' >No Project</option>
            {this.props.projects.map(project => {
              return <option value={project.get('id')} >{project.get('title')}</option>
            })}
          </select> :
          <div className={'projects__empty-list'}>You haven't create any projects yet.</div>
        }
      </div>
    )
  }
}

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
