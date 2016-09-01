import React from 'react'
import './CloseBtn.less'

const CloseBtn = ({ appearance = 'default', onClick }) => (
  <div className={`close close--${appearance}`} title='Close' onClick={() => onClick()}>
    <div className='close__sign'/>
  </div>
)

CloseBtn.propTypes = {
  appearance: React.PropTypes.oneOf(['task-info', 'default']),
  onClick: React.PropTypes.func.isRequired
}

export default CloseBtn
