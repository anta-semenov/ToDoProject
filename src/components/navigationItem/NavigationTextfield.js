import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './NavigationItem.less'

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
  type: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  id: React.PropTypes.string,

  onStopEditing: React.PropTypes.func,

  active: React.PropTypes.bool.isRequired,
  count: React.PropTypes.number
}