import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { NEW_TASK_TITLE } from '../../constants/defaults'
import './AddTask.less'

export default class AddTask extends Component {
  state = {value: ''}
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  handleKeyDown = e => {
    switch (e.keyCode) {
      case 13: {
        this.props.addTask(this.refs.input.value)
        this.refs.input.value = ''
      }
    }
  }
  handleButtonClick = () => {
    this.props.addTask(this.refs.input.value)
    this.refs.input.value = ''
  }

  render() {
    return (
      <div className='add-task'>
        <input type='text' ref='input' className='add-task__textfield' onKeyDown={this.handleKeyDown} placeholder={NEW_TASK_TITLE}/>
        <button className='add-task__button' onClick={this.handleButtonClick} >Add Task</button>
      </div>
    )
  }
}

AddTask.propTypes = {
  addTask: React.PropTypes.func.isRequired
}
