import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { DropTarget, DragSource } from 'react-dnd'
import { TODAY, SOMEDAY, PROJECT, CONTEXT } from '../../constants/sectionTypes'
import { TASK, SECTION } from '../../constants/dndTypes'
import './NavigationItem.less'
import flow from 'lodash/flow'
import { Motion, spring } from 'react-motion'

// Drop Target
const sectionTarget = {
  canDrop: props => props.type === TODAY || props.type === SOMEDAY || props.type === PROJECT || props.type === CONTEXT && !props.active && !props.editing,
  drop: props => ({
    type: props.type,
    id: props.id
  })
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isTaskHovering: monitor.isOver() && monitor.getItemType() === TASK,
  isSectionHovering: monitor.isOver() && monitor.getItemType() === SECTION,
  hoveringSectionType: monitor.isOver() && monitor.getItemType() === SECTION ? monitor.getItem().type : '',
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
export default class NavigationItem extends React.Component {
  state = {text: ''}
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  componentDidMount() {
    if (this.titleInput) {
      this.titleInput.focus()
    }
  }

  handleKeyDown = (e) => {
    switch (e.keyCode) {
      case 13:
        this.props.onStopEditing({
          type: this.props.type,
          id: this.props.id,
          newTitle: e.target.value
        })
        break
      case 27:
        e.preventDefault()
        this.props.onStopEditing({
          type: this.props.type,
          id: this.props.id
        })
        break
    }
  }

  handleOnBlur = (e) => {
    this.props.onStopEditing({
      type: this.props.type,
      id: this.props.id,
      newTitle: e.target.value
    })
  }

  render() {
    const style = this.props.isSectionHovering && this.props.hoveringSectionType === this.props.type ? {height: spring(20)} : {height: spring(0)}

    if (this.props.editing) {
      return(
        <li>
          <input
            className='nav-item__input'
            type='text'
            placeholder={this.props.title}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleOnBlur}
            ref={ref => this.titleInput = ref}
          />
        </li>
      )
    } else if (this.props.isDragging) {
      return(<li />)
    } else {
      return(
        this.props.connectDropTarget(
          this.props.connectDragSource(
            <div>
              <Motion style={style}>
                  {({height}) =><div style={{height: `${height}px`}}/>}
              </Motion>
              <li className={`nav-item ${this.props.active ? 'is-active' : ''} ${this.props.isTaskHovering && this.props.canDrop && !this.props.active ? 'nav-item-drop-over' : ''} ${this.props.isSectionHovering && this.props.canDrop && this.props.type === this.props.hoveringSectionType ? 'nav-item-drop-over-section' : ''}`}
                onClick={() => this.props.onItemClick(this.props.type, this.props.id)}>
                {this.props.connectDragPreview(<span className='nav-item__title'>{this.props.title}</span>)}
                {this.props.count ? <span className='nav-item__count'>{this.props.count}</span> : null}
              </li>
            </div>
          )
        )
      )
    }
  }
}

NavigationItem.propTypes = {
  type: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  id: React.PropTypes.string,

  onItemClick: React.PropTypes.func.isRequired,
  onStopEditing: React.PropTypes.func,
  changePosition: React.PropTypes.func.isRequired,

  active: React.PropTypes.bool.isRequired,
  editing: React.PropTypes.bool,
  count: React.PropTypes.number
}

export const NavigationItemConnectedDropTarget = flow(
  DropTarget([TASK, SECTION], sectionTarget, collect),
  DragSource(SECTION, sectionSource, collectSource)
)(NavigationItem)
