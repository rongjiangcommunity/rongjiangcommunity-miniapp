//index.js
//获取应用实例
const app = getApp()

Page({
  pageState: 'index', // index, loading, error
  tab: 'index',
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: null,
    user: null,
    applyInfo: null,
    approved: wx.getStorageSync('isXiaoyou'),
    status: '',
    productName: getApp().productName
  },
  onReady() {
  },
  onShow: function () {
    this.checkInfo();
  },
  onLoad: function () {
    const ctx = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          app.getWxUserInfo().then(userInfo => {
            ctx.setData({
              userInfo,
            });
          });
        }
      }
    });
  },
  checkInfo: function () {
    app.appReady().then(() => {
      Promise.all([app.getUserInfo(), app.getApplyInfo()])
        .then(([user, applyInfo]) => {
          const approved = user && user.approved === 'true' ? true : false;
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
          this.checkMsgRead();
        }).catch((err) => {
          console.log(err);
        });
    });
  },
  //事件处理函数
  gotoRegister: function () {
    wx.navigateTo({
      url: '../register/register'
    });
  },
  //未开通入口
  expect: function () {
    wx.showToast({
      title: '敬请期待',
      icon: 'none',
      duration: 3000,
    });
  },
  jumpToMsgCenter: function () { // 跳到消息中心，也就是右上角的泡泡图标
    console.log('jumpToMsgCenter');
  },
  checkMsgRead: function () {
    const that = this;
    const credentials = app.getCredentials();
    wx.request({
      url: app.serverUrl + '/api/lawyer/has_unread/' + credentials,
      success(res) {
        if (res.data.success) {
          that.setData({
            msgRead: res.data.data,
          });
        }
      }
    });
  }
});
