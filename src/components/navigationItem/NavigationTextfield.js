import PropTypes from 'prop-types';
import React, { PureComponent } from 'react'
import './NavigationItem.less'

export default class NavigationItem extends PureComponent {
  state = {text: ''}

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
  }
}

NavigationItem.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string,

  onStopEditing: PropTypes.func,

  active: PropTypes.bool.isRequired,
  count: PropTypes.number
}
