// pages/me_feedback/me_feedback.js
//获取应用实例
const app = getApp()

Page({
  data:{
    appointments:[]
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的预约'
    })
  },
  onShow: function () {
    this.checkInfo();
  }, 
  
  checkInfo: function () {
    app.appReady().then(() => {
      const ctx = this;
      const credentials = app.getCredentials();
      return new Promise((resolve, reject) => {
        wx.request({
          url: `https://www.rongjiangcommunity.cn/api/doctor/booking/${credentials}`,
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          },
      
          success(res) {
            console.log(res.data)
            if(res.data.success){
              ctx.setData({
                appointments: res.data.data
              })
            }
          },
          fail() {
            ctx.failAlert("请求失败！");
            reject();
          }
        });
      });
    });
  },
})