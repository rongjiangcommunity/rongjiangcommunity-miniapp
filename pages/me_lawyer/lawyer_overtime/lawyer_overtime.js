Page({
  /**
   * 生命周期函数--监听页面加载
   */
  data:{
    cardData: [
      { "alum": "王校友", "lawyer": "蔡律师","time_difference":"24小时未回复","intime":"2019-5-20 10:00:00" }]
  },


  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '24小时未回复'
    })
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})