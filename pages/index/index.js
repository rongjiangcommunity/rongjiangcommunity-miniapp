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
    status:undefined
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

    Promise.all([this.checkIfregister(),this.getRegisterStatus()]).then(function (posts) {
      // ...
      console.log(posts);
      let pendData = posts[1].data.data;
      let approvedData = posts[0].data.data;
      if(pendData.status){
        ctx.setData({ status: pendData.status })
      }
      if (posts[1].data.data.approved || posts[1].data.data.approved === true) { 
        ctx.setData({ approved: true })
      }
    }).catch(function (reason) {
      // ...
      console.log(reason)
    });

    // wx.request({
    //   url: getApp().serverUrl + '/api/user/apply/' + wx.getStorageSync('credentials'),
    //   method: 'GET',
    //   header: {
    //     'Content-Type': 'application/json'
    //   },
    //   success(res) {
    //     console.log(res)
    //   },
    //   fail() {
    //     that.failAlert("请求失败！");
    //   }
    // })

    // wx.request({
    //   url: getApp().serverUrl + '/api/user/apply/' + wx.getStorageSync('credentials'),
    //   method: 'post',
    //   header: {
    //     'Content-Type': 'application/json'
    //   },
    //   data:{
    //     name:"林晓洪", 
    //     period:91, g3:11, wechat:"lin446440084", mobile:"13435604116", classmates:"林志辉",
    //   },
    //   success(res) {
    //     console.log(res)
    //   },
    //   fail() {
    //     that.failAlert("请求失败！");
    //   }
    // })

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
    // let that = this;
    // wx.request({
    //   url: getApp().serverUrl + '/api/user/' + wx.getStorageSync('credentials'),
    //   method: 'GET',
    //   header: {
    //     'Content-Type': 'application/json'
    //   },
    //   success(res) {
    //     if (res.data.success) {
    //       if(!res.data.data.approved || !res.data.data.approved === true){
    //         console.log('goto register')
    //         that.setData({ showRegisterBtn: true})
    //       }
    //     } else {
    //       that.failAlert("请求失败！");
    //     }
    //   },
    //   fail() {
    //     that.failAlert("请求失败！");
    //   }
    // })
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
