const app = getApp();

Page({
  data: {
    email: '',
  },
  handleInput: function(e){
    this.setData({ email: e.detail.value})
  },
  handleSubmit: function(){
    const value = this.data.email;
    wx.showToast({
      title: '保存成功',
      icon: 'succes',
      duration: 2000,
      mask: true
    })
    setTimeout(function () {
      app.saveUserInfo({ email: value }).then(() => {
        wx.navigateBack();
      })
    }, 2000)

  },
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '电子邮箱'
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
      if (data && data.email) {
        this.setData({email: data.email});
      }
    });
  }
});
