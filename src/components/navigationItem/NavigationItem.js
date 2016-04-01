import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

require('./NavigationItem.less')

export default class NavigationItem extends React.Component {
  state = {text: ''}
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  componentDidMount() {
    this.setState({text: this.props.title})
  }

  handleTitleEdit = (e) => {
    this.setState({text: e.target.value})
  }

  handleKeyDown = (e) => {
    switch (e.keyCode) {
      case 13:
        this.props.onStopEditing({
          type: this.props.type,
          id: this.props.id,
          newTitle: this.state.text
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

  render() {
    return (
      <li className={`nav-item ${this.props.active ? 'is-active' : ''}`} onClick={() => this.props.onItemClick(this.props.type, this.props.id)}>
        {!this.props.editing ? <span className='nav-item__title'>{this.props.title}</span> : null}
        {this.props.editing ? <input className='nav-item__input' type='text' value={this.state.text} onChange={this.handleTitleEdit} onKeyDown={this.handleKeyDown} ></input> : null}
        {this.props.count ? <span className='nav-item__count'>{this.props.count}</span> : null}
      </li>
    )
  }
}

NavigationItem.propTypes = {
  type: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  id: React.PropTypes.number,

  onItemClick: React.PropTypes.func.isRequired,
  onStopEditing: React.PropTypes.func,

  key: React.PropTypes.number,
  active: React.PropTypes.bool.isRequired,
  editing: React.PropTypes.bool,
  count: React.PropTypes.number
}
