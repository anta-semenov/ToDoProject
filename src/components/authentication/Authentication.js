import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './Authentication.less'

export default class Authentication extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }
  render() {
    if (this.props.authStatus) {
      return(
        <div className='auth'>
          <div onClick={this.props.logout}>log out</div>
        </div>
      )
    } else {
      return(
        <div className='auth'>
          <div classname='auth-facebook' onClick={this.props.loginFacebook}>facebook</div>
          <div classname='auth-google' onClick={this.props.loginGoogle}>google</div>
        </div>
      )
    }
  }
}

Authentication.propTypes = {
  authStatus: React.PropTypes.bool.isRequired,
  authErrorMessage: React.PropTypes.string,
  userName: React.PropTypes.string,

  loginFacebook: React.PropTypes.func,
  loginGoogle: React.PropTypes.func,
  loginEmail: React.PropTypes.func,
  logout: React.PropTypes.func
}
