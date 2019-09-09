// pages/me_feedback/me_feedback.js
//获取应用实例
const app = getApp()

Page({
  data:{
    doctorArr:[]
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '寻医问药'
    })
  },
  onShow: function () {
    this.checkInfo();
  },
  gotoDocotrInfo: function (e){
    let info = JSON.stringify(e.currentTarget.dataset.info);
    wx.navigateTo({
      url: '../me_doctor/doctor_detail/doctor_detail?info='+info,
    })
  },
  checkInfo: function () {
    app.appReady().then(() => {
      const ctx = this;
      const credentials = getApp().getCredentials();
      return new Promise((resolve, reject) => {
        wx.request({
          url: `https://www.rongjiangcommunity.cn/api/doctor/doctors/${credentials}`,
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          },

          success(res) {
            console.log(res.data)
            if(res.data.success){
              ctx.setData({
                doctorArr: res.data.data
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
  }
})