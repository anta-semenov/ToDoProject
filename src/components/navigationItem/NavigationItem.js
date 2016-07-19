import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { DropTarget } from 'react-dnd'
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
    } else {
      return(
        this.props.connectDropTarget(
          <li className={`nav-item ${this.props.active ? 'is-active' : ''} ${this.props.isHovering && this.props.canDrop ? 'nav-item-drop-over' : ''}`} onClick={() => this.props.onItemClick(this.props.type, this.props.id)}>
            <span className='nav-item__title'>{this.props.title}</span>
            {this.props.count ? <span className='nav-item__count'>{this.props.count}</span> : null}
          </li>
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

  active: React.PropTypes.bool.isRequired,
  editing: React.PropTypes.bool,
  count: React.PropTypes.number
}

export const NavigationItemConnectedDropTarget = DropTarget(TASK, sectionTarget, collect)(NavigationItem)
