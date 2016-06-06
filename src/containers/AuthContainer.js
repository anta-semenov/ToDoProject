import Auth from '../components/auth/Auth'
import { connect } from 'react-redux'
import { logIn, logOut } from '../actions/commonActions'

const mapStateToProps = (state) => {
  return {
    authStatus: state.getIn(['auth', 'authStatus'], undefined),
    authErrorMessage: state.getIn(['auth', 'errorMessage'], 'Something went wrong'),
    userName: state.getIn(['auth','userName'], 'Mr. Nobody'),
    userImage: state.getIn(['autn', 'userImage'], undefined)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (type) => dispatch(logIn(type)),
    logout: () => dispatch(logOut())
  }
}

const AuthConnected = connect(mapStateToProps, mapDispatchToProps)(Auth)

export default AuthConnected
