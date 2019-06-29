const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//字符串日期格式 yyyy-MM-dd       
const stringToTimestamp = strTime => {
  new Date(Date.parse(strTime.replace(/-/g, "/")));
}

module.exports = {
  formatTime: formatTime,
  stringToTimestamp: stringToTimestamp
}
