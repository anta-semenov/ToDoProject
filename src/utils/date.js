export const dateDayDifference = (startDate, endDate) => {
  const dateDiff = endDate.getTime() - startDate.getTime()
  const dayDiff = dateDiff >= 0 ? Math.floor(dateDiff / (1000*60*60*24)) : Math.ceil(dateDiff / (1000*60*60*24))
  const hourLeftover = startDate < endDate ? startDate.getHours() + Math.round(dateDiff % (1000*60*60*24) / (1000*60*60)) :
  console.log(dayDiff, startDate.getHours(), Math.round(dateDiff % (1000*60*60*24) / (1000*60*60)), hourLeftover)
  return hourLeftover >= 24 ? dayDiff + 1 : dayDiff
}
export const dateHumanNameDifference = (startDate, endDate) => {

}
export const dateHumanName = (date, baseDate = Date.now()) => {

}
export const shiftDate = (date, shift, item = 'day') => {
  switch (item) {
    case 'week':
      return shiftDate(date, shift * 7)
    case 'month': {
      let yearShift = shift >= 0 ? Math.floor(shift/12) : Math.ceil(shift/12)
      let monthShift = shift % 12
      if (shift > 0 && monthShift + date.getMonth() > 11) {
        return new Date(date.getFullYear() + yearShift + 1, date.getMonth() + monthShift - 12, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds())
      }
      if (shift < 0 && monthShift + date.getMonth() < 0) {
        return new Date(date.getFullYear() + yearShift - 1, date.getMonth() + monthShift + 12, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds())
      }
      return new Date(date.getFullYear() + yearShift, date.getMonth() + monthShift, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds())
    }
    case 'year':
      return new Date(date.getFullYear() + shift, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds())
    default:
      return new Date(date.getTime() + shift * (1000*60*60*24))
  }
}
export const areDatesEqual = (date1, date2) => {
  if (date1 && date2) {
    return date1.getYear() === date2.getYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
  }
  return false
}
