import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

require('./NavigationItem.less')

export default class NavigationItem extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <li className={`nav-item ${this.props.active ? 'is-active' : null}`} onClick={this.props.onItemClick}>
        <span className='nav-item__title'>{this.props.title}</span>
        {this.props.count ? <span className='nav-item__count'>{this.props.count}</span> : null}
      </li>
    )
  }
}

NavigationItem.propTypes = {
  id: React.PropTypes.number.isRequired,
  type: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,

  onItemClick: React.PropTypes.func.isRequired,

  active: React.PropTypes.bool.isRequired,
  count: React.PropTypes.number
}
