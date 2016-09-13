import React from 'react'
import { AUTH_IN_PROGRESS, AUTH_SUCESS, AUTH_ERROR, AUTH_NONE } from '../../constants/authStatus'
import User from './user/User.js'
import Login from './login/Login.js'
import './Auth.less'

const Auth = ({ authStatus, userName, userImage, login, logout}) =>  (
  <div className='auth'>
    {authStatus === AUTH_SUCESS ?
      <User userName={userName} userImage={userImage} logout={logout} /> :
      <Login login={login} isAuthInProgress={authStatus === AUTH_IN_PROGRESS} />
    }
  </div>
)

Auth.propTypes = {
  authStatus: React.PropTypes.oneOf([AUTH_IN_PROGRESS, AUTH_SUCESS, AUTH_ERROR, AUTH_NONE]),
  authErrorMessage: React.PropTypes.string,
  userName: React.PropTypes.string,
  userImage: React.PropTypes.string,

  login: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired
}

export default Auth
