import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
require('./NavigationGroup.less')

import NavigationItem from '../navigationItem/NavigationItem'

export default class NavigationGroup extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <li className='nav-group'>
        {this.props.title ? <div className='nav-group__title'>{this.props.title}</div> : null}
        <ul className='nav-group__list'>
          {this.props.items.map(item =>
            <NavigationItem
              key={item.get('id')}
              id={item.get('id')}
              type={item.get('type')}
              title={item.get('title')}
              active={item.get('active')}
              count={item.get('count')}
              onItemClick={this.props.onItemClick}/>
          )}
        </ul>
      </li>
    )
  }
}

NavigationGroup.propTypes = {
  items: React.PropTypes.object.isRequired,
  onItemClick: React.PropTypes.func.isRequired,
  title: React.PropTypes.string
}
