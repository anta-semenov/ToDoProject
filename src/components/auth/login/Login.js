import React from 'react'
import Loader from '../../elements/loader/Loader'
import './Login.less'

export default class Login extends React.Component {
  render() {
    return (
      <div className='login'>
        <div className='login__title'>Log In / Sign Up</div>
        {this.props.authInProgress ?
          <Loader appearance='sidebar' /> :
          <div className='login__list'>
            {this.props.loginProviders.map(provider =>
              <div className={`login__btn login__btn--${provider}`} onClick={() => this.props.login(provider)} />
            )}
          </div>
        }
      </div>
    )
  }
}

Login.propTypes = {
  loginProviders: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  login: React.PropTypes.func.isRequird,
  isAuthInProgress: React.PropTypes.bool
}
Login.defaultProps = {
  loginProviders: ['facebook', 'twitter', 'google']
}
