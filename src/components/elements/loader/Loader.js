import React from 'react'
import './Loader.less'

const Loader = (props) => <div className={`loader loader--${props.appearance}`}><div className='loader__indicator' /></div>

Loader.propTypes = {
  appearance: React.PropTypes.oneOf(['default', 'sidebar'])
}
Loader.defaultProps = {
  appearance: 'default'
}
export default Loader
