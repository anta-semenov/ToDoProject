import React from 'react'
import { findDOMNode } from 'react-dom'
import shallowCompare from 'react-addons-shallow-compare'
import { DropTarget, DragSource } from 'react-dnd'
import classNames from 'classnames'
import { TODAY, SOMEDAY, PROJECT, CONTEXT } from '../../constants/sectionTypes'
import { TASK, SECTION } from '../../constants/dndTypes'
import flow from 'lodash/flow'
import './NavigationItem.less'

// Drop Target
const sectionTarget = {
  canDrop: props => props.type === TODAY || props.type === SOMEDAY || props.type === PROJECT || props.type === CONTEXT,
  drop: props => ({
    type: props.type,
    id: props.id
  }),
  hover: (props, monitor, component) => {
    if (monitor.getItemType() !== SECTION) {
      return
    }

    const item = monitor.getItem()
    if (props.type !== item.type || props.id === item.id) {
      return
    }

    // Get target coordinates
    const targetRect = findDOMNode(component).getBoundingClientRect()
    const hoverMiddleY = (targetRect.bottom - targetRect.top)/2
    const hoverClientY = monitor.getClientOffset().y - targetRect.top
    
    if (hoverClientY < hoverMiddleY && item.nextId === props.id) {
      return
    }

    if (hoverClientY > hoverMiddleY && props.nextId === item.id) {
      return
    }

    if (hoverClientY < hoverMiddleY && item.nextId !== props.id) {
      props.changePosition(item.type, item.id, props.id)
      item.nextId = props.id
      return
    }

    if (hoverClientY > hoverMiddleY && props.nextId !== item.id) {
      props.changePosition(item.type, item.id, props.nextId)
      item.nextId = props.nextId
      return
    }
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isTaskHovering: monitor.isOver() && monitor.getItemType() === TASK,
  canDrop: monitor.canDrop()
})

// Drag Source
const sectionSource = {
  beginDrag: props => ({
    type: props.type,
    id: props.id,
    nextId: props.nextId
  }),
  canDrag: props => props.type === PROJECT || props.type === CONTEXT && !props.isTaskHovering && !props.isDragging
  // endDrag: (props, monitor) => {
  //   const drop = monitor.getDropResult()
  //   if (drop && monitor.getItemType() === SECTION && drop.type === props.type && (props.type === PROJECT || props.type === CONTEXT)) {
  //     props.changePosition(props.type, props.id, drop.id)
  //   }
  // }
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
      'nav-item-drop-over': this.props.isTaskHovering && this.props.canDrop
    })

    return this.props.connectDragSource(
      this.props.connectDropTarget(
        <li className={navItemClasses} onClick={() => this.props.onItemClick(this.props.type, this.props.id)}>
          {this.props.connectDragPreview(<span className='nav-item__title'>{this.props.title}</span>)}
          {this.props.count ? <span className='nav-item__count'>{this.props.count}</span> : null}
        </li>
      )
    )
  }
}

NavigationTitle.propTypes = {
  type: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  id: React.PropTypes.string,

  onItemClick: React.PropTypes.func.isRequired,
  changePosition: React.PropTypes.func,

  active: React.PropTypes.bool.isRequired,
  count: React.PropTypes.number,
  nextId: React.PropTypes.string
}

export default flow(
  DropTarget([TASK, SECTION], sectionTarget, collect),
  DragSource(SECTION, sectionSource, collectSource)
)(NavigationTitle)

export const NavigationTitleClass = NavigationTitle
