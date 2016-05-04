import React from 'react'
import { List } from 'immutable'
import { WEEKDAY_SHORT_NAMES, MONTH_NAMES } from '../../../constants/date'
import { shiftDate, areDatesEqual } from '../../../utils/date'
import './TaskCalendar.less'

const DATE_MODE = 'DATE_MODE'
const MONTH_MODE = 'MONTH_MODE'
const YEAR_MODE = 'YEAR_MODE'

export const weekdayNamesRow = (weekdayNames = WEEKDAY_SHORT_NAMES, weekStart = 1) => {
  return weekdayNames.reduce((weekRow, day, index) => weekRow.set(index - weekStart, day), List([0, 1, 2, 3, 4, 5, 6]))
}

export const weekdayRow = (startDate, weekStart = 1) => {
  return WEEKDAY_SHORT_NAMES.map((day, index) => shiftDate(startDate, startDate.getDay() === 0 ? (index + weekStart - 7) : (index + weekStart - startDate.getDay())))
}
export const monthWeeksList = (month, year, weekStart = 1) => {
  let startDate = new Date(year, month, 1)
  let monthArray = []
  while (startDate.getMonth() === month) {
    monthArray.push(weekdayRow(startDate, weekStart))
    startDate = shiftDate(monthArray[monthArray.length - 1].get(0), 7)
  }
  return List(monthArray)
}

export default class TaskCalendar extends React.Component {
  constructor(props) {
    super(props)
    const today = new Date()
    this.state = {
      todayDate: today,
      currentMonth: this.props.selectedDate ? this.props.selectedDate.getMonth() : today.getMonth(),
      currentYear: this.props.selectedDate ? this.props.selectedDate.getFullYear() : today.getFullYear(),
      mode: DATE_MODE
    }
  }
  nextPeriod() {
  }
  prevPeriod() {
    switch (this.state.mode) {
      case DATE_MODE:
        if (this.state.currentMonth === 0) {this.setState({
          currentMonth: 11,
          currentYear: this.state.currentYear - 1
        })}
        else {this.setState({currentMonth: this.state.currentMonth - 1})}
        break
      case MONTH_MODE:
        this.setState({currentYear: this.state.currentYear - 1})
        break
      case YEAR_MODE:
        this.setState
    }
  }

  render() {
    return (
      <div className='calendar'>
        <div className='calendar__header'>
          <div className='calendar__nav'>
            <button className='calendar__prev' onClick={() => this.prevPeriod()}></button>
            <div className='calendar__title'>
              <div className='calendar__month'>{MONTH_NAMES.get(this.state.currentMonth)}</div>
              <div className='calendar__year'>{this.state.currentYear}</div>
            </div>
            <button className='calendar__next' onClick={() => this.nextPeriod()}></button>
          </div>
          <div className='calendar__day-names'>
            {weekdayNamesRow().map(dayName =>
              <div className='calendar__day-name'>{dayName}</div>
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
                    ${areDatesEqual(day, this.state.todayDate) ? 'is-today' : '' }
                    ${areDatesEqual(day, this.props.selectedDate) ? 'is-selcted' : '' }
                  `}>
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
  selectedDate: React.PropTypes.instanceOf(Date),
  tasks: React.PropTypes.object,
  onChange: React.PropTypes.func.isRequired
}
