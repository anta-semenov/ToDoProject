import PropTypes from 'prop-types';
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
  authStatus: PropTypes.oneOf([AUTH_IN_PROGRESS, AUTH_SUCESS, AUTH_ERROR, AUTH_NONE]),
  authErrorMessage: PropTypes.string,
  userName: PropTypes.string,
  userImage: PropTypes.string,

  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

export default Auth
