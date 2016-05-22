import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './Authentication.less'

export default class Authentication extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    let buttons
    if (this.props.showAuth) {
      if (this.props.authStatus) {
        buttons = <div key='0' className='auth-logout-btn' onClick={this.props.logout}>logout</div>
      } else {
        buttons = [
          <div key='1' className='auth-facebook-btn' onClick={this.props.loginFacebook}>facebook</div>,
          <div key='2' className='auth-google-btn' onClick={this.props.loginGoogle}>google</div>
        ]
      }
    } else {
      buttons = []
    }
    return(
      <div className='auth'>
        <div className='auth-menu-icon' onMouseLeave={this.props.hideMenu} onMouseOver={this.props.showMenu}>
          <div className='auth-menu-icon-item' />
          <div className='auth-menu-icon-item' />
          <div className='auth-menu-icon-item' />
          <div className='auth-menu-icon-item' />
          <ReactCSSTransitionGroup
            transitionName='auth-btn'
            transitionAppear={true}
            transitionAppearTimeout={400}
            transitionEnterTimeout={400}
            transitionLeaveTimeout={400}
            component='div'>
            {buttons}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    )
  }
}

Authentication.propTypes = {
  authStatus: React.PropTypes.bool.isRequired,
  authErrorMessage: React.PropTypes.string,
  userName: React.PropTypes.string,
  showAuth: React.PropTypes.bool.isRequired,

  loginFacebook: React.PropTypes.func,
  loginGoogle: React.PropTypes.func,
  loginEmail: React.PropTypes.func,
  logout: React.PropTypes.func,
  showMenu: React.PropTypes.func,
  hideMenu: React.PropTypes.func
}
