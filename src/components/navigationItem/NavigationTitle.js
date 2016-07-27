import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import { DropTarget, DragSource } from 'react-dnd'
import classNames from 'classnames'
import { TODAY, SOMEDAY, PROJECT, CONTEXT } from '../../constants/sectionTypes'
import { TASK, SECTION } from '../../constants/dndTypes'
import flow from 'lodash/flow'
import './NavigationItem.less'

// Drop Target
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

// Drag Source
const sectionSource = {
  beginDrag: props => ({
    type: props.type,
    id: props.id
  }),
  canDrag: props => props.type === PROJECT || props.type === CONTEXT && !props.editing && !props.isHovering && !props.isDragging,
  endDrag: (props, monitor) => {
    const drop = monitor.getDropResult()
    if (drop && monitor.getItemType() === SECTION && drop.type === props.type && (props.type === PROJECT || props.type === CONTEXT)) {
      props.changePosition(props.type, props.id, drop.id)
    }
  }
}

const collectSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

// React Class
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

export default flow(
  DropTarget(TASK, sectionTarget, collect),
  DragSource(SECTION, sectionSource, collectSource)
)(NavigationTitle)
