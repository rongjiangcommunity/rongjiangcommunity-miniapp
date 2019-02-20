//app.js

const serverUrl = 'https://www.rongjiangcommunity.cn';
const appName = 'yiz';

App({
  onLaunch: function() {
    // @TODO
    // wx.app = this;
    const app = this;
    const credentials = wx.getStorageSync('credentials');

    if (!credentials) {
      app.login().catch(err=> {
        console.error(err);
      });
    } else {
      wx.checkSession({
        success: function () {
        },
        fail: function () {
          app.expireCredentials();
          app.login().catch(err=> {
            console.error(err);
          });
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
  setCredentials: function(credentials) {
    wx.setStorageSync('credentials', credentials);
  },
  getCredentials: function(){
    return wx.getStorageSync('credentials');
  },
  globalData: {
  }
});
