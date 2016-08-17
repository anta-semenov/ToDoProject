import React from 'react'
import { findDOMNode } from 'react-dom'
import shallowCompare from 'react-addons-shallow-compare'
import { DropTarget, DragSource } from 'react-dnd'
import classNames from 'classnames'
import { TODAY, SOMEDAY, PROJECT, CONTEXT } from '../../constants/sectionTypes'
import { TASK, SECTION } from '../../constants/dndTypes'
import flow from 'lodash/flow'
import './NavigationItem.less'
import { Motion, spring } from 'react-motion'

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
    this.state = {translateY:0}
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.index !== this.props.index) {
      this.setState({prevY: this._ref.getBoundingClientRect().top, translateY: undefined})
    } else if (this.state.prevY) {
      this.setState({prevY: undefined})
    }
  }

  componentDidUpdate() {
    if (this.state.prevY) {
      const currentY = this._ref.getBoundingClientRect().top
      const deltaY = this.state.prevY - currentY

      //this._ref.style.transform = `translateY(${deltaY}px)`
      this.setState({translateY: deltaY, prevY: undefined})
    }
  }

  render() {
    const navItemClasses = classNames({
      'nav-item': true,
      'is-active': this.props.active,
      'is-drop-over-task': this.props.isTaskHovering && this.props.canDrop,
      'is-dragging': this.props.isDragging
    })
    const translateY = this.state.translateY
    return (
      <Motion defaultStyle={{ translateY: translateY }} style={{translateY: spring(translateY)}}>
        {({ interpolatedY }) => {
          return this.props.connectDragSource(
            this.props.connectDropTarget(
              <li
                className={navItemClasses}
                onClick={() => this.props.onItemClick(this.props.type, this.props.id)}
                ref={(ref) => {this._ref = ref}}
                style={{transform: `translateY(${translateY - interpolatedY}px)`}}
              >
                {this.props.connectDragPreview(<span className='nav-item__title'>{this.props.title}</span>)}
                {this.props.count ? <span className='nav-item__count'>{this.props.count}</span> : null}
              </li>
            )
          )
        }}
      </Motion>
    )
  }
}

NavigationTitle.propTypes = {
  type: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  id: React.PropTypes.string,
  index: React.PropTypes.number,

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
