import Authentication from '../components/authentication/Authentication'
import { connect } from 'react-redux'
import { logIn, logOut } from '../actions/commonActions'
import { setProperty } from '../actions/uiStateActions'

const mapStateToProps = (state) => {
  return {
    authStatus: state.getIn(['uiState', 'authStatus'], false),
    authErrorMessage: state.getIn(['uiState', 'authErrorMessage']),
    userName: state.getIn(['userInfo','name']),
    showAuth: state.getIn(['uiState', 'showAuthMenu'], false)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginFacebook: () => {dispatch(logIn({type:'facebook'}))},
    loginGoogle: () => {dispatch(logIn({type:'google'}))},
    loginEmail: (email, password) => {dispatch(logIn({type:'email', email, password}))},
    logout: () => {dispatch(logOut())},
    showMenu: () => {dispatch(setProperty('showAuthMenu', true))},
    hideMenu: () => {dispatch(setProperty('showAuthMenu'))}
  }
}

const AuthenticationConnected = connect(mapStateToProps, mapDispatchToProps)(Authentication)

export default AuthenticationConnected
