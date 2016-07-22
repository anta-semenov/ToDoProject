import React, { Component } from 'react'
import { NEW_TASK_TITLE } from '../../../constants/defaults'
import classNames from 'classnames'
import './AddTask.less'

export default class AddTask extends Component {

  handleKeyDown = e => {
    switch (e.keyCode) {
      case 13: {
        this.props.addTask(this.refs.input.value)
        this.input.value = ''
      }
    }
  }
  handleFocus = () => {
    this.frame.classList.add('has-focus')
  }
  handleBlur = () => {
    this.frame.classList.remove('has-focus')
  }
  handleButtonClick = () => {
    this.props.addTask(this.input.value)
    this.input.value = ''
    this.input.focus()
  }

  render() {
    const inputClasses = classNames({
      'add-task__textfield': true,
      'is-empty': this.props.isSectionEmpty
    })
    return (
      <div className='add-task' ref={(c) => this.frame = c}>
        <input
          type='text'
          ref={(c) => this.input = c}
          className={inputClasses}
          onKeyDown={this.handleKeyDown}
          onFocus={() => this.handleFocus()}
          onBlur={() => this.handleBlur()}
          placeholder={NEW_TASK_TITLE} />
        <button className='add-task__button' onClick={this.handleButtonClick} ><span className='add-task__button-text'>Add Task</span></button>
      </div>
    )
  }
}

AddTask.propTypes = {
  addTask: React.PropTypes.func.isRequired,
  isSectionEmpty: React.PropTypes.bool
}
AddTask.defaultProps = {
  isSectionEmpty: false
}
