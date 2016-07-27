import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import './NavigationGroup.less'

import NavigationItem from '../navigationItem/NavigationItem'

const NavigationGroup = ({ items, title, type, addNew, onItemClick, onStopEditing, changePosition}) => (
  <li className='nav-group'>
    {title ?
      <div className='nav-group__title'>
        <div className='nav-group__title-text' >{title}</div>
        {addNew ? <div className='nav-group__add-button' onClick={() => addNew(type)} /> : null}
      </div>
      : null}
    <ul className='nav-group__list'>
      {items.map(item =>
        <NavigationItem
          key={`${item.get('type')}-${item.get('id')}`}
          id={item.get('id')}
          type={item.get('type')}
          title={item.get('title')}
          active={item.get('active')}
          editing={item.get('editing')}
          count={item.get('count')}
          onItemClick={onItemClick}
          onStopEditing={onStopEditing}
          changePosition={changePosition}/>
      )}
    </ul>
  </li>
)

NavigationGroup.propTypes = {
  items: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      type: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      active: React.PropTypes.bool.isRequired,
      id: React.PropTypes.string,
      count: React.PropTypes.number,
      editing: React.PropTypes.bool,
      nextId: React.PropTypes.string
    })
  ).isRequired,
  onItemClick: React.PropTypes.func.isRequired,
  onStopEditing: React.PropTypes.func,
  changePosition: React.PropTypes.func,

  title: React.PropTypes.string,

  type: React.PropTypes.string,
  addNewTitle : React.PropTypes.string,
  addNew: React.PropTypes.func
}

export default NavigationGroup
