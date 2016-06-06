import Authentication from '../components/authentication/Authentication'
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

const AuthenticationConnected = connect(mapStateToProps, mapDispatchToProps)(Authentication)

export default AuthenticationConnected
