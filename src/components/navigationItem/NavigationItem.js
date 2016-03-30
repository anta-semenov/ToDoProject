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
      <li className={`nav-item ${this.props.active ? 'is-active' : ''}`} onClick={() => this.props.onItemClick(this.props.type, this.props.id)}>
        <span className='nav-item__title'>{this.props.title}</span>
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

  key: React.PropTypes.number,
  active: React.PropTypes.bool.isRequired,
  count: React.PropTypes.number
}
