//index.js
//获取应用实例
const app = getApp()

Page({
  pageState: 'index', // index, loading, error
  tab: 'index',
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false,
    userInfo: null,
    user: null,
    applyInfo: null,
    approved: false,
    status: '',
  },
  onReady() {
  },
  onShow: function(){
    this.checkInfo();
    // wx.navigateTo({
    //   url: '../me_info/me_info'
    // });
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
          // console.log(approved)
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
    const ctx = this;
    if (e.detail.userInfo){
      app.getWxUserInfo().then(userInfo => {
        app.synWxInfo(userInfo);
        ctx.setData({
          hasUserInfo: true,
          userInfo: userInfo,
        });
      });
    } else {
      //用户按了拒绝按钮
    }
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
