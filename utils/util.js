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

//字符串日期格式转为时间戳 yyyy-MM-dd       
const stringToTimestamp = strTime => {
  return new Date(Date.parse(strTime.replace(/-/g, "/"))).getTime();
}

//日期字符串比较
const compareDateStr = (date1,date2) => {
  return stringToTimestamp(date1) - stringToTimestamp(date2);
}

const send = param =>{
  wx.showLoading({
    title: param.loading||'加载中',
  })
  wx.request({
    url    : getApp().serverUrl + param.url,
    method : param.method,
    data   : param.data||{},
    success(res) {
      wx.hideLoading();
      if (res.data.success) {
        param.callback(res);
      } else {
        wx.showToast({
          title: param.errorMess||'服务器返回失败',
          icon: 'none',
          duration: 3000
        })
      }
    },
    fail() {
      wx.hideLoading();
      wx.showToast({
        title: param.errorMess||'请求失败',
        icon: 'none',
        duration: 3000
      })
    }
  });
} 

module.exports = {
  formatTime        : formatTime,
  stringToTimestamp : stringToTimestamp,
  compareDateStr    : compareDateStr,
  send              : send,
}
