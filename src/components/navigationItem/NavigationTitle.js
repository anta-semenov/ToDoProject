import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import { DropTarget } from 'react-dnd'
import classNames from 'classnames'
import { TODAY, SOMEDAY, PROJECT, CONTEXT } from '../../constants/sectionTypes'
import { TASK } from '../../constants/dndTypes'
import './NavigationItem.less'

const sectionTarget = {
  canDrop: props => props.type === TODAY || props.type === SOMEDAY || props.type === PROJECT || props.type === CONTEXT && !props.editing,
  drop: props => ({
    type: props.type,
    id: props.id
  })
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isHovering: monitor.isOver(),
  canDrop: monitor.canDrop()
})

class NavigationTitle extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render() {
    const navItemClasses = classNames({
      'nav-item': true,
      'is-active': this.props.active,
      'nav-item-drop-over': this.props.isHovering && this.props.canDrop
    })
    
    return this.props.connectDropTarget(
      <li className={navItemClasses} onClick={() => this.props.onItemClick(this.props.type, this.props.id)}>
        <span className='nav-item__title'>{this.props.title}</span>
        {this.props.count ? <span className='nav-item__count'>{this.props.count}</span> : null}
      </li>
    )
  }
}

NavigationTitle.propTypes = {
  type: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  id: React.PropTypes.string,

  onItemClick: React.PropTypes.func.isRequired,

  active: React.PropTypes.bool.isRequired,
  count: React.PropTypes.number
}

export default DropTarget(TASK, sectionTarget, collect)(NavigationTitle)
