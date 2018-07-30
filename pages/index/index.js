//index.js
//获取应用实例
const app = getApp()

var initData = {
  pageState: 'index', // index, loading, error
  tab: 'index',
  userInfo: {},
  hasUserInfo: false,
  //事件处理函数
  gotoRegisterAndLogin: function () {
    wx.navigateTo({
      url: '../registerAndLogin/registerAndLogin'
    });
  },
  jumpToMsgCenter: function () { // 跳到消息中心，也就是右上角的泡泡图标
    console.log('jumpToMsgCenter');
  },
  checkAuth: function () {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (setting) => {
          if (setting.authSetting['scope.userInfo']) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        fail: reject
      });
    });
  },
  checkApproved: function () {
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
  onLoad: async function () {
    const result = await this.checkAuth().catch(() => (false));
    if (result) {
      this.setData({ hasUserInfo: true });

      wx.navigateTo({
        url: '../registerAndLogin/registerAndLogin'
      })

    }
  }
};

Page(initData);
