const app = getApp()

Page({
  data : {
    appointment : {}
  },
  onLoad: function (options) {
    let object = JSON.parse(options.jsonStr);
    this.setData({ appointment: object});
  },
  closeContent: function(){
    wx.navigateBack({
      delta: 1
    })
  },
})