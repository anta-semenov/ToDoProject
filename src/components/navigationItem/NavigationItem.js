import React from 'react'
import NavigationTextfield from './NavigationTextfield'
import NavigationTitle from './NavigationTitle'

const NavigationItem = ({ editing, ...rest }) => editing ? <NavigationTextfield {...rest} /> : <NavigationTitle {...rest} />

NavigationItem.propTypes = {
  type: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  id: React.PropTypes.string,

  onItemClick: React.PropTypes.func.isRequired,
  onStopEditing: React.PropTypes.func,
  changePosition: React.PropTypes.func.isRequired,

  active: React.PropTypes.bool.isRequired,
  editing: React.PropTypes.bool,
  count: React.PropTypes.number,
  nextId: React.PropTypes.string
}

export default NavigationItem
