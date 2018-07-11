//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
  },
  globalData: {
    userInfo: null
  },
  getUserInfo: function (cb) {

    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo);
    } else {
      wx.getSetting({
        success: (setting) => {
          console.log(setting);
        }
      });
      wx.login({
        success: function (res) {
          console.log("logincode:" + res.code);
          
        }
      });
    }
  }
})