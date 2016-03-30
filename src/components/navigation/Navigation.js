import React from 'react'
require('./Navigation.less')
import NavigationGroup from '../navigationGroup/NavigationGroup'

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.groups)
    return (
      <ul className='nav'>
        {this.props.groups.map((group, index) =>
          <NavigationGroup
            key={index} //We should pass unique identificator for array items
            items={group.items}
            title={group.title}
            onItemClick={this.props.onItemClick}
          />
        )}
      </ul>
    )
  }
}

Navigation.propTypes = {
  groups: React.PropTypes.array.isRequired,
  onItemClick: React.PropTypes.func.isRequired
}
