import React from 'react'
import FlipMove from 'react-flip-move'
import { timeIntervalToComponents } from '../../utils/date'
import './TaskTracker.less'

export default class TaskTracker extends React.Component {
  constructor(props) {
    super(props)
    this.state = timeIntervalToComponents(Date.now() - props.startTime)
  }
  componentWillMount() {
    this.setState({
      interval: window.setInterval(() => this.setState(timeIntervalToComponents(Date.now() - this.props.startTime)), 60000)
    })
  }
  componentWillReceiveProps(nextProps) {
    this.state = timeIntervalToComponents(Date.now() - nextProps.startTime)
  }
  componentWillUnmount() {
    window.clearInterval(this.state.interval)
  }
  render() {
    return (
        this.props.title ?
          <div className='task-tracker' key='taskTracker'>
            <button className='task-tracker__stop' onClick={() => this.props.stopTracking(this.props.id)}></button>
            <div className='task-tracker__title'>{this.props.title}</div>
            <div className='task-tracker__time'>{`${this.state.days ? this.state.days.toString() + 'd' : ''} ${this.state.hours ? this.state.hours.toString() + 'h' : ''} ${this.state.minutes ? this.state.minutes.toString() + 'm' : '1m'}`}</div>
          </div> :
          null

    )
  }
}


TaskTracker.propTypes = {
  title: React.PropTypes.string,
  startTime: React.PropTypes.number,
  id: React.PropTypes.string,
  stopTracking: React.PropTypes.func.isRequired
}
