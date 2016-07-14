import React from 'react'
import './Loader.less'

const Loader = ({ appearance = 'default' }) => (
  <div className={`loader loader--${appearance}`}>
    <div className='loader__indicator' />
    <div className='loader__indicator' />
    <div className='loader__indicator' />
  </div>
)

Loader.propTypes = {
  appearance: React.PropTypes.oneOf(['default', 'sidebar'])
}
export default Loader
