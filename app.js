//app.js

const serverUrl = 'https://eudemonia.me';
const appName = 'yiz';

App({
  onLaunch: function() {
    const app = this;
    const credentials = wx.getStorageSync('credentials');

    if (!credentials) {
      app.login().catch(err=> {
        console.error(err);
      });
    } else {
      wx.checkSession({
        success: function () {
          app.getUserInfo();
        },
        fail: function () {
          app.expireCredentials();
          app.login();
        }
      })
    }
  },
  login: function (){
    const app = this;
  
    return new Promise((resolve, reject) => {
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
                app: appName,
                code: res.code
              },
              success: function (res) {
                if (res && res.statusCode === 200) {
                  app.setCredentials(res.data.credentials);
                  app.getUserInfo();
                  return resolve();
                }
                reject(new Error('redeem credentials error!'));
              },
              fail: reject
            });
          } else {
            reject(new Error('wx.login error!'));
          }
        },
        fail: reject
      });
    });
  },
  setCredentials: function(credentials) {
    wx.setStorageSync('credentials', credentials);
  },
  getCredentials: function(){
    return wx.getStorageSync('credentials');
  },
  expireCredentials: function() {
    const credentials = this.getCredentials();
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
        app: appName,
      },
      success: function (res) {
        if (res && res.statusCode === 200) {
          console.log('rm remote credentials success!');
        }
      }
    });
  },
  getUserInfo: function(){
    return new Promise(resolve => {
      wx.getUserInfo({
        success: res => {
          this.globalData.userInfo = res.userInfo

          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
          resolve();
        }
      })
    });
  },
  globalData: {
    userInfo: null
  }
});
