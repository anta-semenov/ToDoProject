import React from 'react'
import './CloseBtn.less'

export default class CloseBtn extends React.Component {
  componentDidUpdate() {
    console.log('componentDidUpdate')
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
  render() {
    return (
      <div className={`close close--${this.props.appearance}`} title='Close' onClick={() => this.props.onClick()}>
        <div className='close__sign'/>
      </div>
    )
  }
}

CloseBtn.propTypes = {
  appearance: React.PropTypes.oneOf(['task-info', 'default']),
  onClick: React.PropTypes.func.isRequired
}

CloseBtn.defaultProps = {
  appearance: 'default'
}
