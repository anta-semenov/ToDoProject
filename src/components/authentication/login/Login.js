import React from 'react'
import './Login.less'

export default class Login extends React.Component {
  render() {
    return (
      <div className='login'>
        <div className='login__title'>Log In / Sign Up</div>
        <div className='login__list'>
          {this.props.loginPlatforms.map(platform =>
            <div className={`login__plarform login__platform--${platform.type}`} onClick={platform.login} />
          )}
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginPlatforms: React.PropTypes.arrayOf(React.PropTypes.shape({
    type: React.PropTypes.string.isRequired,
    login: React.PropTypes.func.isRequired
  }))
}
