import React from 'react'
import { List } from 'immutable'
import moment from 'moment'
import { WEEKDAY_SHORT_NAMES, MONTH_NAMES } from '../../../constants/date'
import { areDatesEqual } from '../../../utils/date'
import './TaskCalendar.less'

export const weekdayNamesRow = (weekdayNames = WEEKDAY_SHORT_NAMES, weekStart = 1) => {
  return weekdayNames.reduce((weekRow, day, index) => weekRow.set(index - weekStart, day), List([0, 1, 2, 3, 4, 5, 6]))
}

export const weekdayRow = (startDate, weekStart = 1) => {
  let sd = moment(startDate)
  if (sd.day() > weekStart) {
    sd = sd.subtract(sd.day() - weekStart, 'd')
  } else if (sd.day() < weekStart) {
    sd = sd.subtract(7 - sd.day() - weekStart, 'd')
  }
  return WEEKDAY_SHORT_NAMES.map((day, index) => moment(sd).add(index, 'd').toDate())
}
export const monthWeeksList = (month, year, weekStart = 1) => {
  let startDate = new Date(year, month, 1)
  let monthArray = []
  while (startDate.getMonth() === month) {
    const week = weekdayRow(startDate, weekStart)
    monthArray.push(week)
    startDate = moment(week.get(0)).add(1, 'w').toDate()
  }
  return List(monthArray)
}

export default class TaskCalendar extends React.Component {
  constructor(props) {
    super(props)
    const today = new Date()
    this.state = {
      todayDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      currentMonth: this.props.selectedDate ? this.props.selectedDate.getMonth() : today.getMonth(),
      currentYear: this.props.selectedDate ? this.props.selectedDate.getFullYear() : today.getFullYear()
    }
  }
  nextPeriod() {
    if (this.state.currentMonth === 11) {
      this.setState({
        currentMonth: 0,
        currentYear: this.state.currentYear + 1
      })
    } else {
      this.setState({currentMonth: this.state.currentMonth + 1})
    }
  }
  prevPeriod() {
    if (this.state.currentMonth === 0) {
      this.setState({
        currentMonth: 11,
        currentYear: this.state.currentYear - 1
      })
    } else {
      this.setState({currentMonth: this.state.currentMonth - 1})
    }
  }
  handleDayClick(date) {
    if (areDatesEqual(date, this.props.selectedDate)) {this.props.onChange(this.props.id, undefined)}
    else {this.props.onChange(this.props.id, date.getTime())}
  }

  componentWillReceiveProps(nextProps) {
    const today = new Date()
    this.state = {
      todayDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      currentMonth: nextProps.selectedDate ? nextProps.selectedDate.getMonth() : today.getMonth(),
      currentYear: nextProps.selectedDate ? nextProps.selectedDate.getFullYear() : today.getFullYear()
    }
  }

  render() {
    return (
      <div className='calendar'>
        <div className='calendar__header'>
          <div className='calendar__nav'>
            <button className={`calendar__prev ${this.state.currentMonth === this.state.todayDate.getMonth() ? 'is-disabled' : ''}`} onClick={() => this.prevPeriod()}><div className='calendar__prev-sign'/></button>
            <div className='calendar__title'>
              <div className='calendar__month'>{MONTH_NAMES.get(this.state.currentMonth)}</div>
              <div className='calendar__year'>{this.state.currentYear}</div>
            </div>
            <button className='calendar__next' onClick={() => this.nextPeriod()}><div className='calendar__next-sign'/></button>
          </div>
          <div className='calendar__day-names'>
            {weekdayNamesRow().map(dayName =>
              <div key={dayName} className='calendar__day-name'>{dayName}</div>
            )}
          </div>
        </div>
        <div className='calendar__body'>
          {monthWeeksList(this.state.currentMonth, this.state.currentYear).map((week, index) =>
            <div key={index} className='calendar__week'>
              {week.map(day =>
                <div
                  key={day.getTime()}
                  className={`calendar__day
                    ${day.getMonth() < this.state.currentMonth ? 'is-prev-month' : ''}
                    ${day.getMonth() > this.state.currentMonth ? 'is-next-month' : ''}
                    ${day < this.state.todayDate ? 'is-before-today' : ''}
                    ${areDatesEqual(day, this.state.todayDate) ? 'is-today' : '' }
                    ${areDatesEqual(day, this.props.selectedDate) ? 'is-selected' : '' }
                  `}
                  onClick={() => this.handleDayClick(day)}>
                    {day.getDate()}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

TaskCalendar.propTypes = {
  id: React.PropTypes.string.isRequired,
  selectedDate: React.PropTypes.instanceOf(Date),
  tasks: React.PropTypes.object,
  onChange: React.PropTypes.func.isRequired
}
