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
  changeOrder: React.PropTypes.func,
  endDrag: React.PropTypes.func,

  active: React.PropTypes.bool.isRequired,
  editing: React.PropTypes.bool,
  count: React.PropTypes.number
}

export default NavigationItem
