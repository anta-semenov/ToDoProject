import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ImmutablePropTypes from 'react-immutable-proptypes'
import './NavigationGroup.less'

import { NavigationItemConnectedDropTarget as NavigationItem } from '../navigationItem/NavigationItem'

export default class NavigationGroup extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <li className='nav-group'>
        {this.props.title ?
          <div className='nav-group__title'>
            <div className='nav-group__title-text' >{this.props.title}</div>
            {this.props.addNew ?
              <div className='nav-group__add-button' onClick={() => this.props.addNew(this.props.type)} /> :
              null
            }
          </div>
        : null}
        <ul className='nav-group__list'>
          {this.props.items.map(item =>
            <NavigationItem
              key={`${item.get('type')}-${item.get('id')}`}
              id={item.get('id')}
              type={item.get('type')}
              title={item.get('title')}
              active={item.get('active')}
              editing={item.get('editing')}
              count={item.get('count')}
              onItemClick={this.props.onItemClick}
              onStopEditing={this.props.onStopEditing}/>
          )}
        </ul>
      </li>
    )
  }
}

NavigationGroup.propTypes = {
  items: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      type: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      active: React.PropTypes.bool.isRequired,
      id: React.PropTypes.string,
      count: React.PropTypes.number,
      editing: React.PropTypes.bool
    })
  ).isRequired,
  onItemClick: React.PropTypes.func.isRequired,
  onStopEditing: React.PropTypes.func,

  title: React.PropTypes.string,

  type: React.PropTypes.string,
  addNewTitle : React.PropTypes.string,
  addNew: React.PropTypes.func
}
