import React from 'react'
import './Navigation.less'
import NavigationGroup from '../navigationGroup/NavigationGroup'

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul className='nav'>
        {this.props.groups.map((group, index) =>
          <NavigationGroup
            key={index} //We should pass unique identificator for array items
            items={group.items}
            title={group.title}
            onItemClick={this.props.onItemClick}
            type={group.type}
            addNewTitle={group.addNewTitle}
            addNew={this.props.addNew}
            onStopEditing={this.props.onStopEditing}
          />
        )}
      </ul>
    )
  }
}

Navigation.propTypes = {
  groups: React.PropTypes.array.isRequired,
  onItemClick: React.PropTypes.func.isRequired,
  addNew: React.PropTypes.func,
  onStopEditing: React.PropTypes.func
}
