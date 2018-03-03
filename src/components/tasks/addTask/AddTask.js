import React, { Component } from 'react'
import { NEW_TASK_TITLE } from '../../../constants/defaults'
import classNames from 'classnames'
import './AddTask.less'

export default class AddTask extends Component {

  handleKeyDown = e => {
    switch (e.keyCode) {
      case 13: {
        this.props.addTask(this.input.value)
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
  handleChange = (event) => {
    this.props.setSearchQuery(event.target.value)
  }
  handleButtonClick = () => {
    this.props.addTask(this.input.value)
    this.input.value = ''
    this.props.setSearchQuery('')
    this.input.focus()
  }

  render() {
    const addTaskClasses = classNames({
      'add-task': true,
      'is-empty': this.props.isSectionEmpty
    })
    return (
      <div className={addTaskClasses} ref={(c) => this.frame = c}>
        <input
          type='text'
          ref={(c) => this.input = c}
          className='add-task__textfield'
          onKeyDown={this.handleKeyDown}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          placeholder={NEW_TASK_TITLE} />
        <button className='add-task__button' onClick={this.handleButtonClick} ><span className='add-task__button-text'>Add Task</span></button>
      </div>
    )
  }
}

AddTask.propTypes = {
  addTask: React.PropTypes.func.isRequired,
  setSearchQuery: React.PropTypes.func.isRequired,
  isSectionEmpty: React.PropTypes.bool,
  hasFocus: React.PropTypes.bool
}
AddTask.defaultProps = {
  isSectionEmpty: false,
  hasFocus: false
}
