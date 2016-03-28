import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

require('./Task.less')

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <li className={`task ${this.props.completed ? `is-completed` : null} ${this.props.active ? `is-active` : null}`}>
        <input type='checkbox' className='task__checkbox' checked={this.props.completed} onChange={() => this.props.onTaskCheckboxClick(this.props.id)} />
        <input type='checkbox' className='task__today' checked={this.props.today} onChange={() => this.props.onTaskTodayClick(this.props.id)} />
        <div className={`task__priority task__priority--${this.props.priority}`} onClick={() => this.props.onPriorityClick(this.props.id)} />
        <div className='task__body' onClick={() => this.props.onTaskClick(this.props.id)}>
          <div className='task__title'>{this.props.title}</div>
          {this.props.description ? <div className='task__description'>{this.props.description}</div> : null}
          {this.props.date ? <div className='task__date'>{this.props.date}</div> : null}
        </div>
      </li>
    )
  }
}

Task.propTypes = {
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  completed: React.PropTypes.bool.isRequired,
  today: React.PropTypes.bool.isRequired,

  onTaskClick: React.PropTypes.func.isRequired,
  onTaskCheckboxClick: React.PropTypes.func.isRequired,
  onTaskTodayClick: React.PropTypes.func.isRequired,
  onPriorityClick: React.PropTypes.func.isRequired,

  description: React.PropTypes.string,
  priority: React.PropTypes.string,
  date: React.PropTypes.object,
  active: React.PropTypes.bool
}
