import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Map } from 'immutable'
import { DATE_FORMAT } from '../../../constants/defaults'
import { descriptionToString } from '../../../utils/descriptionTransform'
import Today from '../../elements/today/Today'
import Checkbox from '../../elements/checkbox/Checkbox'
import Priority from '../../elements/priority/Priority'

import './Task.less'

const appearance = 'tasks-list'

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
  }

  render() {
    return (
      <li className={`task ${this.props.completed ? 'is-completed' : ''} ${this.props.active ? 'is-active' : ''} ${this.props.latent && !this.props.completed ? 'is-latent-today' : ''} `}>
        <Checkbox appearance={appearance} checked={this.props.completed} dimmed={this.props.latent && !this.props.completed} onClick={() => this.props.onTaskCheckboxClick(this.props.id, !this.props.completed)} />
        <Today appearance={appearance} checked={this.props.today} dimmed={this.props.latent && !this.props.completed} disabled={this.props.completed} onClick={() => this.props.onTaskTodayClick(this.props.id, !this.props.today)} />
        <Priority appearance={appearance} priority={this.props.priority} dimmed={this.props.latent && !this.props.completed} disabled={this.props.completed} onClick={(priority) => this.props.onPriorityClick(this.props.id, priority)}/>
        <div className='task__body' onClick={() => this.props.onTaskClick(this.props.id)}>
          <div className='task__main'>
            <div className='task__title'>{this.props.title}</div>
            {descriptionToString(this.props.description) ? <div className='task__description'>{descriptionToString(this.props.description)}</div> : null}
          </div>
          {this.props.date ? <div className='task__date'>{this.props.date.toLocaleDateString('en-US', DATE_FORMAT)}</div> : null}
        </div>
      </li>
    )
  }
}

Task.propTypes = {
  id: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  completed: React.PropTypes.bool.isRequired,
  today: React.PropTypes.bool.isRequired,

  onTaskClick: React.PropTypes.func.isRequired,
  onTaskCheckboxClick: React.PropTypes.func.isRequired,
  onTaskTodayClick: React.PropTypes.func.isRequired,
  onPriorityClick: React.PropTypes.func.isRequired,

  description: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.instanceOf(Map)
  ]),
  priority: React.PropTypes.string,
  date: React.PropTypes.instanceOf(Date),
  active: React.PropTypes.bool,
  latent: React.PropTypes.bool
}
