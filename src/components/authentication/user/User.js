import React from 'react'
import  './User.less'

const defaultUsrImg = 'data:image/svg+xml;charset=UTF-8, <svg viewBox=\'0 0 17 14\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M15.0328152,0.000721764681 C13.8445596,0.691568051 12.2970639,2.12852833 11.2746114,3.04044543 C9.22970639,4.86427962 7.26770294,6.77101537 5.33333333,8.70538498 L1.46459413,5.3340551 L-1.5720758e-13,6.77101537 C2.12780656,8.89882194 4.42141623,11.1924316 6.30051813,13.5689428 C8.70466321,9.61730208 12.6286701,3.95236252 16,0.967906566 C15.8894646,0.746835754 15.4196891,-0.0269120868 15.0328152,0.000721764681 Z\' fill=\'#ffffff\'></path></svg>'

export default class User extends React.Component {
  render() {
    return (
      <div className='user'>
        <div className='user__img' src={this.props.userImgUrl || defaultUsrImg} />
        <div className='user__body'>
          <div className='user__name'>{this.props.userName}</div>
          <div className='user__logout' onCLick={this.props.logout}>Log Out</div>
        </div>
      </div>
    )
  }
}
User.propTypes = {
  userName: React.PropTypes.string.isRequired,
  userImgUrl: React.PropTypes.string,

  logout: React.PropTypes.func.isRequired
}
