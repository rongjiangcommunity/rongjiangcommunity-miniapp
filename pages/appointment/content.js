const app = getApp()

Page({
<<<<<<< HEAD
=======
  data : {
    appointment : {}
  },
  onLoad: function (options) {
    let object = JSON.parse(options.jsonStr);
    this.setData({ appointment: object});
  },
>>>>>>> f9a1ac965600287056fdc41c9b19609afad36447
  closeContent: function(){
    wx.navigateBack({
      delta: 1
    })
<<<<<<< HEAD
  }
=======
  },
>>>>>>> f9a1ac965600287056fdc41c9b19609afad36447
})