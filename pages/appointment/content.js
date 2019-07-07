const app = getApp()

Page({
  closeContent: function(){
    wx.navigateBack({
      delta: 1
    })
  }
})