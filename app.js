//app.js

const serverUrl = 'https://eudemonia.me';

App({
  onLaunch: function() {
    const app = this;
    const credentials = wx.getStorageSync('credentials');

    if (!credentials) {
      this.login({
        cb: app.getUserInfo
      });
    } else {
      wx.checkSession({
        success: function () {
          app.getUserInfo()
        },
      fail: function () {
          app.expireCredentials();
          app.login({
            cb: app.getUserInfo
          });
        }
      })
    }
  },
  login: function ({ cb }){
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res && res.code) {
          wx.request({
            url: `${serverUrl}/api/wechat/redeem`,
            header: {
              'Content-Type': 'application/json'
            },
            method: 'POST',
            data: {
              app: 'yiz',
              code: res.code
            },
            success: function (res) {
              if (res && res.statusCode === 200) {
                wx.setStorageSync('credentials', res.data.credentials);
                cb && cb();
              }
            }
          })
        }
      }
    });
  },
  expireCredentials: function() {
    const credentials = wx.getStorageSync('credentials');
    if (!credentials) {
      return;
    }
    try {
      wx.removeStorageSync('credentials');
      console.log('rm local credentials success!');
    } catch (e) {
      console.error(e);
    }
    wx.request({
      url: `${serverUrl}/api/wechat/expire`,
      header: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      data: {
        credentials,
      },
      success: function (res) {
        if (res && res.statusCode === 200) {
          console.log('rm remote credentials success!');
        }
      }
    });
  },
  getUserInfo: function(){
    wx.getUserInfo({
      success: res => {
        this.globalData.userInfo = res.userInfo
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
});