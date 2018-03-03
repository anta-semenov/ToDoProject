import PropTypes from 'prop-types';
import React from 'react'
import NavigationTextfield from './NavigationTextfield'
import NavigationTitle from './NavigationTitle'

const NavigationItem = ({ editing, ...rest }) => editing ? <NavigationTextfield {...rest} /> : <NavigationTitle {...rest} />

NavigationItem.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string,

  onItemClick: PropTypes.func.isRequired,
  onStopEditing: PropTypes.func,
  changeOrder: PropTypes.func,
  endDrag: PropTypes.func,

  active: PropTypes.bool.isRequired,
  editing: PropTypes.bool,
  count: PropTypes.number
}

export default NavigationItem
