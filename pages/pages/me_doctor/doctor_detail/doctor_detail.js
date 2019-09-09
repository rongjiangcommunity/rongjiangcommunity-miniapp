// pages/me_feedback/me_feedback.js
//获取应用实例
const app = getApp()

Page({
  data:{
    doctorInfo:{
      detail: [],
    },
    info:{},
    approved: false
  },
  onLoad: function (options) {
    const doctorInfo = JSON.parse(options.info);
    doctorInfo.detail = doctorInfo.detail ? doctorInfo.detail.split('\n') : [];
    this.setData({ doctorInfo: doctorInfo, info: options.info })
    wx.setNavigationBarTitle({
      title: '医生详情'
    })
  },
  onShow: function () {
    this.checkInfo();
  },
  gotoAppointment:function(){
    let info = this.data.info
    let approved = this.data.approved;
    if(!approved){
      wx.showModal({
        title: '认证提示',
        content: '该服务只针对校友开放，您还未认证校友身份，是否去认证？',
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../../register/register',
            })
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.navigateTo({
        url: '../doctor_appointment/doctor_appointment?info='+info,
      })
    }
  },

  checkInfo: function(){
    app.appReady().then(() => {
      app.getUserInfo()
        .then((user) => {
          const approved = user && user.approved === 'true' ? true:false;
          this.setData({
            approved,
          });
        }).catch((err) => {
          console.log(err);
        });
    });
  }
})
