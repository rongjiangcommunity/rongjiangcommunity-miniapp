//index.js
//获取应用实例
const app = getApp()

Page({
  pageState: 'index', // index, loading, error
  tab: 'index',
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false
  },
  onReady() {
  },
  onShow: function(){
  },
  onLoad: function() {
    const ctx = this;
    //授权判断
    wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          app.getWxUserInfo().then(userInfo => {
            ctx.setData({
              hasUserInfo: true,
            });
          });
        }
        wx.switchTab({
          url: '../header/header'
        });
      }
    });
  },

  bindGetUserInfo: function(e) {
    const ctx = this;
    if (e.detail.userInfo){
      app.getWxUserInfo().then(userInfo => {
        app.synWxInfo(userInfo);
        ctx.setData({
          hasUserInfo: true,
        });
        wx.switchTab({
          url: '../header/header'
        });
      });

    } else {
      //用户按了拒绝按钮
    }
  }
});
