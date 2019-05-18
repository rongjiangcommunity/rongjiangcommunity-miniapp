//index.js
//获取应用实例
const app = getApp()

Page({
  pageState: 'index', // index, loading, error
  tab: 'index',
  data: {
    canIUseButtonOpenType: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
    userInfo: null,
    user: null,
    applyInfo: null,
    approved: wx.getStorageSync('isXiaoyou'),
    status: '',
  },
  onReady() {
    const ctx = this;
    const supported = wx.canIUse('button.open-type.getUserInfo');
    if (!supported) {
      this.getWxUserInfo();
    }
  },
  onShow: function(){
    this.checkInfo();
  },
  onLoad: function() {
    const ctx = this;
    wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          app.getWxUserInfo().then(userInfo => {
            ctx.setData({
              hasUserInfo: true,
              userInfo,
            });
          });
        }
      }
    });
  },
  checkInfo: function(){
    app.appReady().then(() => {
      Promise.all([app.getUserInfo(), app.getApplyInfo()])
        .then(([user, applyInfo]) => {
          const approved = user && user.approved === 'true' ? true:false;
          const status = applyInfo ? applyInfo.status : '';
          wx.setStorageSync('isXiaoyou', approved);
          this.setData({
            user,
            applyInfo,
            approved,
            status,
          });
        }).catch((err) => {
          console.log(err);
        });
    });
  },

  bindGetUserInfo: function(e) {
    if (e.detail.userInfo){
      return this.getWxUserInfo();
    } else {
      //用户按了拒绝按钮
    }
  },
  getWxUserInfo() {
    const ctx = this;
    return app.getWxUserInfo().then(userInfo => {
      app.synWxInfo(userInfo);
      ctx.setData({
        hasUserInfo: true,
        userInfo: userInfo,
      });
    });
  },
  //事件处理函数
  gotoRegister: function(){
    wx.navigateTo({
      url: '../register/register'
    });
  },
  jumpToMsgCenter: function(){ // 跳到消息中心，也就是右上角的泡泡图标
    console.log('jumpToMsgCenter');
  }
});
