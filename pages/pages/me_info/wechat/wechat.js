const app = getApp();

Page({
  data: {
    wechat: '',
  },
  handleInput: function(e){
    this.setData({ wechat: e.detail.value})
  },
  handleSubmit: function(){
    const value = this.data.wechat;
    wx.showToast({
      title: '保存成功',
      icon: 'succes',
      duration: 2000,
      mask: true
    })
    setTimeout(function () {
      app.saveUserInfo({ wechat: value }).then(() => {
        wx.navigateBack();
      })
    }, 2000)
    
    
  },
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '我的微信'
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.getUserInfo().then(data => {
      if (data && data.wechat) {
        this.setData({wechat: data.wechat});
      }
    });
  }
});
