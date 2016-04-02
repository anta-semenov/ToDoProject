import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
require('./AddTask.less')

export default class AddTask extends Component {
  state = {value: ''}
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  getInitialState: () => {value: ''}

  render() {
    return (
      <div className='add-task'>
        <input type='text' className='add-task__input' value={this.state.value} />
        <button className='add-task__button' onClick={() => addTask(this.state.value)} >Add Task</button>
      </div>
    )
  }
}

AddTask.propTypes = {
  addTask: React.PropTypes.func.isRequired
}
