//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    /** @type {'index' | ''} 页面状态 */
    tab:'index',
    userInfo: {},
    hasUserInfo : true
  },
  //事件处理函数
  gotoRegisterAndLogin: function() {
    wx.navigateTo({
      url: '../registerAndLogin/registerAndLogin'
    })
  },
  checkSetting : function(){
    console.log('checkSetting');
    wx.getSetting({
      success: (setting) => {
        if (setting.authSetting['scope.userInfo']) {
          this.setData({ hasUserInfo: true });
        }
      }
    });
  },
  onLoad: function () {
    console.log(app);
    wx.getSetting({
      success: (setting) => {
        console.log(setting);
        if (setting.authSetting['scope.userInfo']) {
          this.setData({hasUserInfo : true});
          if(true){//未认证
            wx.navigateTo({
              url: '../registerAndLogin/registerAndLogin'
            })
          }
        }else{
          this.setData({ hasUserInfo: false });
        }
      }
    });
  }
})
