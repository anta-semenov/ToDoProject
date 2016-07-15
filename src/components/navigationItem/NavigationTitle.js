import React from 'react'
import './NavigationItem.less'

const NavigationTitle = ({ type, title, id, active = false,  count, onItemClick }) => (
  <li className={`nav-item ${active ? 'is-active' : ''}`} onClick={() => onItemClick(type, id)}>
    <span className='nav-item__title'>{title}</span>
    {count ? <span className='nav-item__count'>{count}</span> : null}
  </li>
)

NavigationTitle.propTypes = {
  type: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  id: React.PropTypes.string,

  onItemClick: React.PropTypes.func.isRequired,

  active: React.PropTypes.bool.isRequired,
  count: React.PropTypes.number
}

export default NavigationTitle
