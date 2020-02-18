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
    approved: wx.getStorageSync('isXiaoyou'),
    status: '',
    productName: getApp().productName
  },
  onReady() {
  },
  onShow: function(){
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
    this.checkInfo();
  },
  onLoad: function() {
  },
  checkInfo: function(){
    app.appReady().then(() => {
      Promise.all([app.getUserInfo(), app.getApplyInfo()])
        .then(([user, applyInfo]) => {
          const approved = user && user.approved === 'true' ? true:false;
          const status = applyInfo ? applyInfo.status : '';
          try {
            wx.setStorageSync('isXiaoyou', approved);
          } catch (error) {
            console.error(error);
          }
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
  //未开通入口
  expect : function(){
    wx.showToast({
      title: '敬请期待',
      icon: 'none',
      duration: 3000,
    });
  },
  jumpToMsgCenter: function(){ // 跳到消息中心，也就是右上角的泡泡图标
    console.log('jumpToMsgCenter');
  },
  // 前往鹊桥相会,有信息跳转到主页，没信息跳转到注册页
  gotoMagpie: function () { 
    const credentials = app.getCredentials();
    wx.request({
      url: `${app.serverUrl}/api/magpie/info/${credentials}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        if (res.data.success) {
          let { status } = res.data.data;
          wx.setStorage({
            key: 'magpieIndexData',
            data: JSON.stringify(res.data.data)
          });
          if (status === 'created') { // 已提交注册信息
            wx.navigateTo({
              url: '../magpie/index/index'
            });
          } else if (status === 'ok') { // 注册通过
            wx.navigateTo({
              url: '../magpie/register/pass/index'
            });
          } else if (status === 'notok') { // 注册不通过
            wx.navigateTo({
              url: '../magpie/register/refuse/index'
            });
          } else if (status === 'disabled') { // 封禁账号
            wx.showToast({
              title: '账号存在风险，已被冻结。',
              duration: 2000
            })
          } else { // 开始注册
            wx.navigateTo({
              url: '../magpie/index'
            });
          }
          if (res.data.data) {
            wx.navigateTo({
              url: '../magpie/index/index'
            });
          } else {
            wx.navigateTo({
              url: '../magpie/index'
            });
          }
        }
      },
      fail(err) {
        console.error(err)
      }
    })
  }
});
