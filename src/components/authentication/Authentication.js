import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import User from './user/User.js'
import Login from './login/Login.js'
import './Authentication.less'

export default class Authentication extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    if (this.props.authStatus) {
      return <User userName={this.props.userName} userImgUrl={this.props.userImgUrl} logout={this.props.logout} />
    }
    return ()
      <div className='auth'>
        {this.props.authStatus ?
          <User userName={this.props.userName} userImgUrl={this.props.userImgUrl} logout={this.props.logout} /> :
          <Login loginPlatforms={this.props.loginPlatforms} />
        }
      </div>
    )
  }
}

Authentication.propTypes = {
  authStatus: React.PropTypes.bool.isRequired,
  authErrorMessage: React.PropTypes.string,
  userName: React.PropTypes.string,
  showAuth: React.PropTypes.bool.isRequired,
  loginPlatforms: React.PropTypes.arrayOf(React.PropTypes.shape({
    type: React.PropTypes.string.isRequired,
    login: React.PropTypes.func.isRequired
  })),

  loginFacebook: React.PropTypes.func,
  loginGoogle: React.PropTypes.func,
  loginEmail: React.PropTypes.func,
  logout: React.PropTypes.func
}
