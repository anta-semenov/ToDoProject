import { expect } from 'chai'
import React from 'react'
import { renderIntoDocument, findRenderedDOMComponentWithClass, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils'
import { List, fromJS } from 'immutable'
import TaskCalendar, { weekdayRow, monthWeeksList, weekdayNamesRow } from '../../src/components/taskInfo/taskCalendar/TaskCalendar'
import { WEEKDAY_SHORT_NAMES } from '../../src/constants/date'

describe('TaskCalendar Component', () => {
  describe('Helper functions', () => {
    describe('weekdayRow', () => {
      it('Should return correct list for startDate: Date(2016, 4, 3)', () => {
        const startDate1 = new Date(2016, 4, 3)
        const week1 = List([
          new Date(2016, 4, 2),
          new Date(2016, 4, 3),
          new Date(2016, 4, 4),
          new Date(2016, 4, 5),
          new Date(2016, 4, 6),
          new Date(2016, 4, 7),
          new Date(2016, 4, 8)
        ])
        expect(weekdayRow(startDate1)).to.equal(week1)
      })
      it('Should return correct list for startDate: Date(2016, 4, 1), weekStart: 2', () => {
        const startDate2 = new Date(2016, 4, 1)
        const week2 = List([
          new Date(2016, 3, 26),
          new Date(2016, 3, 27),
          new Date(2016, 3, 28),
          new Date(2016, 3, 29),
          new Date(2016, 3, 30),
          new Date(2016, 4, 1),
          new Date(2016, 4, 2)
        ])
        expect(weekdayRow(startDate2, 2)).to.equal(week2)
      })
    })
    describe('monthWeeksList', () => {
      it('Should return correct list for May of 2016', () => {
        const monthList = fromJS([
          [
            new Date(2016, 3, 25),
            new Date(2016, 3, 26),
            new Date(2016, 3, 27),
            new Date(2016, 3, 28),
            new Date(2016, 3, 29),
            new Date(2016, 3, 30),
            new Date(2016, 4, 1)
          ],
          [
            new Date(2016, 4, 2),
            new Date(2016, 4, 3),
            new Date(2016, 4, 4),
            new Date(2016, 4, 5),
            new Date(2016, 4, 6),
            new Date(2016, 4, 7),
            new Date(2016, 4, 8)
          ],
          [
            new Date(2016, 4, 9),
            new Date(2016, 4, 10),
            new Date(2016, 4, 11),
            new Date(2016, 4, 12),
            new Date(2016, 4, 13),
            new Date(2016, 4, 14),
            new Date(2016, 4, 15)
          ],
          [
            new Date(2016, 4, 16),
            new Date(2016, 4, 17),
            new Date(2016, 4, 18),
            new Date(2016, 4, 19),
            new Date(2016, 4, 20),
            new Date(2016, 4, 21),
            new Date(2016, 4, 22)
          ],
          [
            new Date(2016, 4, 23),
            new Date(2016, 4, 24),
            new Date(2016, 4, 25),
            new Date(2016, 4, 26),
            new Date(2016, 4, 27),
            new Date(2016, 4, 28),
            new Date(2016, 4, 29)
          ],
          [
            new Date(2016, 4, 30),
            new Date(2016, 4, 31),
            new Date(2016, 5, 1),
            new Date(2016, 5, 2),
            new Date(2016, 5, 3),
            new Date(2016, 5, 4),
            new Date(2016, 5, 5)
          ]
        ])
        expect(monthWeeksList(4, 2016)).to.equal(monthList)
      })
      it('Should return correct list for May of 2016 and startWeek 2', () => {
        const monthList = fromJS([
          [
            new Date(2016, 3, 26),
            new Date(2016, 3, 27),
            new Date(2016, 3, 28),
            new Date(2016, 3, 29),
            new Date(2016, 3, 30),
            new Date(2016, 4, 1),
            new Date(2016, 4, 2)
          ],
          [
            new Date(2016, 4, 3),
            new Date(2016, 4, 4),
            new Date(2016, 4, 5),
            new Date(2016, 4, 6),
            new Date(2016, 4, 7),
            new Date(2016, 4, 8),
            new Date(2016, 4, 9)
          ],
          [
            new Date(2016, 4, 10),
            new Date(2016, 4, 11),
            new Date(2016, 4, 12),
            new Date(2016, 4, 13),
            new Date(2016, 4, 14),
            new Date(2016, 4, 15),
            new Date(2016, 4, 16)
          ],
          [
            new Date(2016, 4, 17),
            new Date(2016, 4, 18),
            new Date(2016, 4, 19),
            new Date(2016, 4, 20),
            new Date(2016, 4, 21),
            new Date(2016, 4, 22),
            new Date(2016, 4, 23)
          ],
          [
            new Date(2016, 4, 24),
            new Date(2016, 4, 25),
            new Date(2016, 4, 26),
            new Date(2016, 4, 27),
            new Date(2016, 4, 28),
            new Date(2016, 4, 29),
            new Date(2016, 4, 30)
          ],
          [
            new Date(2016, 4, 31),
            new Date(2016, 5, 1),
            new Date(2016, 5, 2),
            new Date(2016, 5, 3),
            new Date(2016, 5, 4),
            new Date(2016, 5, 5),
            new Date(2016, 5, 6)
          ]
        ])
        expect(monthWeeksList(4, 2016, 2)).to.equal(monthList)
      })
      it('Should return correct list for November of 2016 and startWeek 1', () => {
        const monthList = fromJS([
          [
            new Date(2016, 9, 31),
            new Date(2016, 10, 1),
            new Date(2016, 10, 2),
            new Date(2016, 10, 3),
            new Date(2016, 10, 4),
            new Date(2016, 10, 5),
            new Date(2016, 10, 6)
          ],
          [
            new Date(2016, 10, 7),
            new Date(2016, 10, 8),
            new Date(2016, 10, 9),
            new Date(2016, 10, 10),
            new Date(2016, 10, 11),
            new Date(2016, 10, 12),
            new Date(2016, 10, 13)
          ],
          [
            new Date(2016, 10, 14),
            new Date(2016, 10, 15),
            new Date(2016, 10, 16),
            new Date(2016, 10, 17),
            new Date(2016, 10, 18),
            new Date(2016, 10, 19),
            new Date(2016, 10, 20)
          ],
          [
            new Date(2016, 10, 21),
            new Date(2016, 10, 22),
            new Date(2016, 10, 23),
            new Date(2016, 10, 24),
            new Date(2016, 10, 25),
            new Date(2016, 10, 26),
            new Date(2016, 10, 27)
          ],
          [
            new Date(2016, 10, 28),
            new Date(2016, 10, 29),
            new Date(2016, 10, 30),
            new Date(2016, 11, 1),
            new Date(2016, 11, 2),
            new Date(2016, 11, 3),
            new Date(2016, 11, 4)
          ]
        ])
        expect(monthWeeksList(10, 2016, 1)).to.equal(monthList)
      })
    })
    describe('weekdayNamesRow', () => {
      it('Should return correct list of weekday names for weekstart at Monday (1)', () => {
        const weekdayNames = List([
          'Mo',
          'Tu',
          'We',
          'Th',
          'Fr',
          'Sa',
          'Su'
        ])
        expect(weekdayNamesRow()).to.equal(weekdayNames)
      })
      it('Should return correct list of weekday names for weekstart at Wednesday (3)', () => {
        const weekdayNames = List([
          'We',
          'Th',
          'Fr',
          'Sa',
          'Su',
          'Mo',
          'Tu'
        ])
        expect(weekdayNamesRow(WEEKDAY_SHORT_NAMES, 3)).to.equal(weekdayNames)
      })
    })
  })
  describe('Component', () => {
    it('Should render all elements of component: navigation with prev and next button, title and weekday names. Also it should render dates', () => {
      const calendarComponent = renderIntoDocument(<TaskCalendar id={0} />)
      const calendarNavigation = findRenderedDOMComponentWithClass(calendarComponent, 'calendar__nav')
      const calendarMonth = findRenderedDOMComponentWithClass(calendarComponent, 'calendar__month')
      const calendarYear = findRenderedDOMComponentWithClass(calendarComponent, 'calendar__year')
      const prevBtn = findRenderedDOMComponentWithClass(calendarComponent, 'calendar__prev')
      const nextBtn = findRenderedDOMComponentWithClass(calendarComponent, 'calendar__next')
      const weekdayNames = findRenderedDOMComponentWithClass(calendarComponent, 'calendar__day-names')
      const weekdayNameArray = scryRenderedDOMComponentsWithClass(calendarComponent, 'calendar__day-name')
      const calendarDayArray = scryRenderedDOMComponentsWithClass(calendarComponent, 'calendar__day')

      expect(calendarNavigation.className).to.equal('calendar__nav')
      expect(calendarMonth.className).to.equal('calendar__month')
      expect(calendarYear.className).to.equal('calendar__year')
      expect(prevBtn.className).to.include('calendar__prev')
      expect(nextBtn.className).to.equal('calendar__next')
      expect(weekdayNames.className).to.equal('calendar__day-names')
      expect(weekdayNameArray.length).to.equal(7)
      expect(calendarDayArray.length).to.be.above(27)
      expect(calendarDayArray.length).to.be.below(43)
    })
  })
})
