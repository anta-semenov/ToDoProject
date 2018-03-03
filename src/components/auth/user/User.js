import PropTypes from 'prop-types';
import React from 'react'
import  './User.less'

const User = (props) => (
  <div className={`user ${props.userImage ? 'user--image' : 'user--name'}`} style={props.userImage ? {backgroundImage: `url(${props.userImage})`} : null } onClick={() => props.logout()}>
    <div className='user__logout' />
    {!props.userImage ? <div className='user__name' >{props.userName.slice(0, 1)}</div> : null }
  </div>
)

User.propTypes = {
  userName: PropTypes.string.isRequired,
  userImage: PropTypes.string,
  logout: PropTypes.func.isRequired
}
export default User
