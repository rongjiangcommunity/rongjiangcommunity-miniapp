//index.js
//获取应用实例
const app = getApp()
const serverUrl = app.serverUrl

Page({
  data: {
    members: [],
  },
  onReady: async function() {
    await app.appReady();
  },
  onShow: async function(){
    await app.appReady();
    const ctx = this;
    wx.getSetting({
      success (res) {
        // res.authSetting['scope.userLocation']
        app.getLocation().then(res => {
          app.saveLocation(res);
        });
      }
    });
  },
  onLoad: async function() {
    await app.appReady();

    await this.getNearby();
  },
  getNearby: function() {
    const sid = app.getCredentials();
    return new Promise(resolve => {
      wx.request({
        url: `${serverUrl}/api/geo/nearby/${sid}`,
        method: 'GET',
        success(res) {
          console.dir(res);
          resolve();
        },
      });
    });
  },
});
