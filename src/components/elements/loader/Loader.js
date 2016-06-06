import React from 'react'
import './Loader.less'

export default class Loader extends React.Component {
  render() {
    return (<div className={`loader loader--${this.props.appearance}`}></div>)
  }
}

Loader.propTypes = {
  appearance: React.PropTypes.oneOf(['default', 'sidebar'])
}
Loader.defaultProps = {
  appearance: 'default'
}
