import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import Auth from '../components/auth/Auth'
import { unAuth } from '../backend/firebase/api'

import { login } from '../actions/commonActions'

const mapStateToProps = (state) => {
  return {
    authStatus: state.getIn(['auth', 'authStatus'], undefined),
    authErrorMessage: state.getIn(['auth', 'errorMessage'], 'Something went wrong'),
    userName: state.getIn(['auth','userName'], 'Mr. Nobody'),
    userImage: state.getIn(['auth', 'userImage'], undefined)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (type) => dispatch(login(type)),
    logout: () => {
      browserHistory.push('/')
      unAuth()
    }
  }
}

const AuthConnected = connect(mapStateToProps, mapDispatchToProps)(Auth)

export default AuthConnected
