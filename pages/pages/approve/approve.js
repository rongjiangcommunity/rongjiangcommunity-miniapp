// pages/approve/approve.js

Page({
  data: {
    items: [
      { name: 'male', value: '男' },
      { name: 'female', value: '女'},
    ],
    affects: [
      { name: 'solo', value: '单身' },
      { name: 'inlove', value: '恋爱中' },
      { name: 'married', value: '已婚' },
    ],

    region: ['广东省', '广州市', '海珠区'],
    edubg: ['高中', '本科', '硕士', '博士' ],
    school:['华南农业大学'],
  },
  gotoSuccess: function () {
    wx.navigateTo({
      url: '../approve/success/success'
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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