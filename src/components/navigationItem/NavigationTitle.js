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

    if (hoverClientY < hoverMiddleY+2 && item.index < props.index) {
      return
    }

    if (hoverClientY > hoverMiddleY-2 && item.index > props.index) {
      return
    }
    props.changeOrder(item.index, props.index)
    item.index = props.index
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
    index: props.index
  }),
  canDrag: props => props.type === PROJECT || props.type === CONTEXT && !props.isTaskHovering && !props.isDragging,
  endDrag: (props, monitor) => {
    const item = monitor.getItem()
    if (monitor.getItemType() === SECTION && (props.type === PROJECT || props.type === CONTEXT)) {
      props.endDrag(item.index)
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
  constructor(props) {
    super(props)
    this.state = {}
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  componentWillReceiveProps() {
    this.setState({prevY: this._ref.getBoundingClientRect().top})
  }

  componentDidUpdate() {
    const domNode = this._ref
    const currentY = this._ref.getBoundingClientRect().top
    const deltaY = this.state.prevY - currentY

    domNode.style.transform = `translateY(${deltaY}px)`
    domNode.style.transition = 'transform 0ms'
    requestAnimationFrame( () => {
      domNode.style.transform  = '';
      domNode.style.transition = 'transform 500ms'
    })
  }

  render() {
    const navItemClasses = classNames({
      'nav-item': true,
      'is-active': this.props.active,
      'nav-item-drop-over': this.props.isTaskHovering && this.props.canDrop,
      'nav-item__dragging': this.props.isDragging
    })

    return this.props.connectDragSource(
      this.props.connectDropTarget(
        <li className={navItemClasses} onClick={() => this.props.onItemClick(this.props.type, this.props.id)} ref={(ref) => {this._ref = ref}}>
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
  changeOrder: React.PropTypes.func,
  endDrag: React.PropTypes.func,

  active: React.PropTypes.bool.isRequired,
  count: React.PropTypes.number
}

export default flow(
  DropTarget([TASK, SECTION], sectionTarget, collect),
  DragSource(SECTION, sectionSource, collectSource)
)(NavigationTitle)

export const NavigationTitleClass = NavigationTitle
