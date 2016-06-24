import React, { Component } from 'react'
import { NEW_TASK_TITLE } from '../../../constants/defaults'
import './AddTask.less'

export default class AddTask extends Component {

  handleKeyDown = e => {
    switch (e.keyCode) {
      case 13: {
        this.props.addTask(this.refs.input.value)
        this.refs.input.value = ''
      }
    }
  }
  handleFocus = () => {
    this.refs.frame.classList.add('has-focus')
  }
  handleBlur = () => {
    this.refs.frame.classList.remove('has-focus')
  }
  handleButtonClick = () => {
    this.props.addTask(this.refs.input.value)
    this.refs.input.value = ''
    this.refs.input.focus()
  }

  render() {
    return (
      <div className='add-task' ref='frame'>
        <input
          type='text'
          ref='input'
          className='add-task__textfield'
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
  addTask: React.PropTypes.func.isRequired
}
