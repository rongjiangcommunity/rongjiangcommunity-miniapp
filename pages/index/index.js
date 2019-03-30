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
    showRegisterBtn: false,
    status:undefined,
    gotoRegisterAndLogin: false
  },
  onShow: function(){
    if(this.data.gotoRegisterAndLogin){ //注册完返回时得重新获取用户信息
      this.setData({gotoRegisterAndLogin:false});
      this.checkInfo();
    }
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
    this.checkInfo();
  },
  checkInfo: function(){
    let that = this;
    Promise.all([this.checkIfregister(),this.getRegisterStatus()]).then(function (posts) {
      // ...
      console.log(posts);
      let pendData = posts[1].data.data;
      let approvedData = posts[0].data.data;
      if(pendData.status){
        that.setData({ status: pendData.status })
      }
      if (disabled.approved || disabled.approved === true) { 
        that.setData({ approved: true })
      }
    }).catch(function (reason) {
      // ...
      console.log(reason)
    });
  },
  getRegisterStatus: function () {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: getApp().serverUrl + '/api/user/apply/' + wx.getStorageSync('credentials'),
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success(res) {
          resolve(res)
    
        },
        fail(err) {
          reject(err);
        }
      })
    });
  },
  checkIfregister: function(){
    return new Promise(function (resolve, reject) {
      wx.request({
        url: getApp().serverUrl + '/api/user/' + wx.getStorageSync('credentials'),
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success(res) {
          resolve(res)
          
        },
        fail(err) {
          reject(err);
        }
      })
    });
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
        getApp().userInfo = res.userInfo;
      }
    });
  },

  //事件处理函数
  gotoRegisterAndLogin: function(){
    this.setData({ gotoRegisterAndLogin: true})
    wx.navigateTo({
      url: '../registerAndLogin/registerAndLogin'
    });
  },
  jumpToMsgCenter: function(){ // 跳到消息中心，也就是右上角的泡泡图标
    console.log('jumpToMsgCenter');
  }
});
