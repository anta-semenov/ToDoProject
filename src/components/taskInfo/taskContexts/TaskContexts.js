import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import './TaskContexts.less'

export default class TaskContexts extends React.Component {
  render() {
    return (
      <div className='contexts'>
        <div className='contexts__title'>Contexts</div>
        {
          this.props.contexts ?
          <div className='contexts__list'>
            {this.props.contexts.map(context => {
              const active = this.props.taskContexts ? this.props.taskContexts.includes(context.get('id')) : false
              return <div className={`context ${this.props.taskContexts ? active ? 'is-active' : '' : ''}`} onClick={() => this.props.onContextClick(context.get('id'), !active)} >{context.get('title')}</div>
            }
            )}
          </div> :
          <div className={'contexts__empty-list'}>You haven't create any context yet.</div>
        }
      </div>
    )
  }
}

TaskContexts.propTypes = {
  contexts: ImmutablePropTypes.mapOf(
    ImmutablePropTypes.contains({
      id: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired
    })
  ).isRequired,
  taskContexts: ImmutablePropTypes.iterableOf(React.PropTypes.string),
  onContextClick: React.PropTypes.func.isRequired
}
