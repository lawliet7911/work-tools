import { getPlainType } from './shared'

export const getMonthDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const firstDay = new Date(year, month - 1, 1)
  const lastDay = new Date(year, month, 0)
  return { firstDay: formatDate(firstDay), lastDay: formatDate(lastDay) }
}
// 日期格式化
export const formatDate = (date, format) => {
  if (getPlainType(date) !== 'date') throw new TypeError('date is not a Date()')
  const pad = (num) => (num < 10 ? '0' : '') + num
  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  const seconds = pad(date.getSeconds())

  const formats = {
    yyyy: year,
    MM: month,
    dd: day,
    HH: hours,
    mm: minutes,
    ss: seconds,
  }

  return format.replace(/(yyyy|MM|dd|HH|mm|ss)/g, (match) => formats[match])
}
