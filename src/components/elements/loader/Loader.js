import PropTypes from 'prop-types';
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
  appearance: PropTypes.oneOf(['default', 'sidebar', 'section'])
}
export default Loader
