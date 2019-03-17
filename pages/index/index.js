//index.js
//获取应用实例
const app = getApp()

Page({
  pageState: 'index', // index, loading, error
  tab: 'index',
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    hasUserInfo: false,
  },
  onLoad: function() {
    const ctx = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          ctx.getUserInfo();
        }
      }
    })
  },
  bindGetUserInfo: function(e) {
    const ctx = this;
    if (e.detail.userInfo){
      //用户按了允许授权按钮
      ctx.getUserInfo();
    } else {
      //用户按了拒绝按钮
    }
  },
  getUserInfo: function() {
    const ctx = this;
    wx.getUserInfo({
      success: function(res) {
        //用户已经授权过
        ctx.setData({
          hasUserInfo: true,
          userInfo: res.userInfo,
        });
      }
    });
  },

  //事件处理函数
  gotoRegisterAndLogin: function(){
    wx.navigateTo({
      url: '../registerAndLogin/registerAndLogin'
    });
  },
  jumpToMsgCenter: function(){ // 跳到消息中心，也就是右上角的泡泡图标
    console.log('jumpToMsgCenter');
  },
  checkApproved: function(){
    new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        data: {
          credentials: '',
        },
        success(res) {
          if (res && res.statusCode === 200) {
              
          }
        }
      })
    });
  },
});
