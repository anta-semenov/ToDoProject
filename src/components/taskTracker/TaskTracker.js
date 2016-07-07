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
      <FlipMove enterAnimation='fade' leaveAnimation='none'>
        {this.props.title ?
          <div className='task-tracker' key='taskTracker'>
            <button className='task-tracker__stop' onClick={() => this.props.stopTracking(this.props.id)}>
              <svg width='18px' height='18px' viewBox='0 0 18 18' version='1.1' vectorEffect='non-scaling-stroke'>
                <g transform='translate(1.000000, 0.000000)'>
                  <circle id='bezel' stroke='#000000' fill='none' strokeWidth='1' cx='9' cy='10' r='6'></circle>
                  <g id='stopwatch'>
                    <polygon id='hand' fill='#000000' points='8 2.98944092 7 2.98944092 7.01660156 2 11 2 11 2.98944092 10 2.98944092 10 4.25482178 8 4.25482178'></polygon>
                    <path d='M9,5.45581055 C9.34204102,5.45581055 9.73310423,10.0430298 9.75054932,11 C9.75473391,11.2295507 9.5,11.4558105 9,11.4558105 C8.5,11.4558105 8.26983643,11.2215576 8.26983643,11 C8.26983643,10.0003052 8.65795898,5.45581055 9,5.45581055 Z' id='toggle' fill='#000000'></path>
                  </g>
                  <g id='stop'>
                    <rect x='6' y='7' width='6' height='6' rx='1' ry='1'></rect>
                  </g>
                </g>
              </svg>
            </button>
            <div className='task-tracker__title'>{this.props.title}</div>
            <div className='task-tracker__time'>{`${this.state.days ? this.state.days.toString() + 'd' : ''} ${this.state.hours ? this.state.hours.toString() + 'h' : ''} ${this.state.minutes ? this.state.minutes.toString() + 'm' : '1m'}`}</div>
          </div> :
          null}
      </FlipMove>
    )
  }
}


TaskTracker.propTypes = {
  title: React.PropTypes.string,
  startTime: React.PropTypes.number,
  id: React.PropTypes.string,
  stopTracking: React.PropTypes.func.isRequired
}
