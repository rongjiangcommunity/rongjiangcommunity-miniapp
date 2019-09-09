// pages/me_feedback/me_feedback.js
//获取应用实例
const app = getApp()

Page({
  data: {
    productName: getApp().productName
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '关于寻医问药'
    })
  },
  callphone : function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  }
})