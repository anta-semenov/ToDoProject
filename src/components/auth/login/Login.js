import React from 'react'
import Loader from '../../elements/loader/Loader'
import './Login.less'

const providerIcon = (provider) => {
  switch (provider) {
    case 'facebook':
      return <svg className='login__icon' viewBox='0 0 15 30' xmlns='http://www.w3.org/2000/svg'><path id='icon' d='M10,10 L10,7 C10,5.7 10.3,5 12.4,5 L15,5 L15,0 L11,0 C6,0 4,3.3 4,7 L4,10 L0,10 L0,15 L4,15 L4,30 L10,30 L10,15 L14.4,15 L15,10 L10,10 L10,10 Z' /></svg>
    case 'twitter':
      return <svg className='login__icon' viewBox='0 0 30 24' xmlns='http://www.w3.org/2000/svg'><path id='icon' d='M29.2,2.7 C28.1,3.2 27,3.5 25.7,3.7 C26.9,2.9 27.9,1.8 28.4,0.4 C27.2,1.1 25.9,1.6 24.6,1.9 C23.5,0.7 21.9,1.13686838e-13 20.2,1.13686838e-13 C16.9,1.13686838e-13 14.2,2.7 14.2,6.1 C14.2,6.6 14.2,7 14.4,7.5 C9.4,7.3 4.9,4.8 1.9,1.2 C1.4,2.1 1.1,3.1 1.1,4.2 C1.1,6.3 2.2,8.2 3.8,9.2 C2.8,9.2 1.9,8.9 1,8.4 C1,8.4 1,8.4 1,8.5 C1,11.4 3.1,13.9 5.9,14.4 C5.4,14.5 4.9,14.6 4.3,14.6 C3.9,14.6 3.5,14.6 3.2,14.5 C4,16.9 6.2,18.7 8.9,18.7 C6.8,20.3 4.2,21.3 1.4,21.3 C0.9,21.3 0.4,21.3 0,21.2 C2.7,22.9 5.8,23.9 9.3,23.9 C20.4,23.9 26.5,14.7 26.5,6.7 L26.5,5.9 C27.4,5 28.4,4 29.2,2.7 L29.2,2.7 Z' /></svg>
    case 'google':
      return <svg className='login__icon' viewBox='0 0 28 28' xmlns='http://www.w3.org/2000/svg'><path id='icon' d='M14,12 L14,16.8 L21.9,16.8 C21.6,18.9 19.5,22.8 14,22.8 C9.2,22.8 5.3,18.8 5.3,14 C5.3,9.2 9.2,5.2 14,5.2 C16.7,5.2 18.5,6.4 19.6,7.4 L23.4,3.7 C21,1.4 17.8,0 14,0 C6.3,0 0,6.3 0,14 C0,21.7 6.3,28 14,28 C22.1,28 27.4,22.3 27.4,14.3 C27.4,13.4 27.3,12.7 27.2,12 L14,12 L14,12 Z' /></svg>
  }
}
const Login = props =>
(
  <div className='login'>
    <div className='login__title'>Log In / Sign Up</div>
    {props.isAuthInProgress ?
      <Loader appearance='sidebar' /> :
      <div className='login__list'>
        {props.providers.map(provider =>
          <div key={`auth-${provider}`} className={`login__btn login__btn--${provider}`} onClick={() => props.login(provider)}>
            {providerIcon(provider)}
          </div>
        )}
      </div>
    }
  </div>
)

Login.propTypes = {
  providers: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  login: React.PropTypes.func.isRequired,
  isAuthInProgress: React.PropTypes.bool
}
Login.defaultProps = {
  providers: ['facebook', 'twitter', 'google']
}
export default Login
