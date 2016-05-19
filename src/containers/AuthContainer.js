import Authentication from '../components/authentication/Authentication'
import { connect } from 'react-redux'
import { logIn, logOut } from '../actions/commonActions'

const mapStateToProps = (state) => {
  return {
    authStatus: state.getIn(['uiState', 'authStatus']),
    authErrorMessage: state.getIn(['uiState', 'authErrorMessage']),
    userName: state.getIn(['userInfo','name'])
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginFacebook: () => {dispatch(logIn({type:'facebook'}))},
    loginGoogle: () => {dispatch(logIn({type:'google'}))},
    loginEmail: (email, password) => {dispatch(logIn({type:'email', email, password}))},
    logout: () => {dispatch(logOut())}
  }
}

const AuthenticationConnected = connect(mapStateToProps, mapDispatchToProps)(Authentication)

export default AuthenticationConnected
