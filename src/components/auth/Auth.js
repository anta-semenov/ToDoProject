import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { AUTH_IN_PROGRESS, AUTH_SUCESS, AUTH_ERROR } from '../../constants/authStatus'
import User from './user/User.js'
import Login from './login/Login.js'
import './Auth.less'

export default class Authentication extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    return (
      <div className='auth'>
        {this.props.authStatus === AUTH_SUCESS ?
          <User userName={this.props.userName} userImage={this.props.userImage} logout={this.props.logout} /> :
          <Login login={this.props.login} isAuthInProgress={this.props.authStatus === AUTH_IN_PROGRESS} />
        }
      </div>
    )
  }
}

Authentication.propTypes = {
  authStatus: React.PropTypes.oneOf([AUTH_IN_PROGRESS, AUTH_SUCESS, AUTH_ERROR]),
  authErrorMessage: React.PropTypes.string,
  userName: React.PropTypes.string,
  userImage: React.PropTypes.string,

  login: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired
}
