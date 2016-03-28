import React from 'react'
require('./Navigation.less')
import NavigationGroup from '../navigationGroup/NavigationGroup'

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul className='nav'>
        {this.props.groups.map(group => {
          <NavigationGroup
            items={group.items}
            title={group.title}
            onItemClick={this.props.onItemClick}
          />
        })}
      </ul>
    )
  }
}

Navigation.propTypes = {
  groups: React.PropTypes.array.isRequired,
  onItemClick: React.PropTypes.func.isRequired
}
