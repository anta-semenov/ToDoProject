import PropTypes from 'prop-types';
import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import './TaskContexts.less'

export default class TaskContexts extends React.Component {
  render() {
    return (
      <div className='contexts'>
        <div className='contexts__title'>Contexts</div>
        {
          this.props.contexts && this.props.contexts.size > 0 ?
          <div className='contexts__list'>
            {this.props.contexts.valueSeq().map(context => {
              const active = this.props.taskContexts ? this.props.taskContexts.includes(context.get('id')) : false
              return (
                <div
                  key={context.get('id')}
                  className={`context ${active ? 'is-active' : ''}`}
                  onClick={() => this.props.onContextClick(context.get('id'), !active)}
                >{context.get('title')}</div>
              )
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
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ),
  taskContexts: ImmutablePropTypes.iterableOf(PropTypes.string),
  onContextClick: PropTypes.func.isRequired
}
