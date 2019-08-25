// pages/me_about/me_about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productName: getApp().productName,
    listData: [
      { "lawyer": "蔡律师", "click_count": "666", "click_num": "1", "con_num": "2", "com_num": "3", "overtime_num": "4" },
      { "lawyer": "蔡律师", "click_count": "666", "click_num": "1", "con_num": "2", "com_num": "3", "overtime_num": "4" },
      { "lawyer": "蔡律师", "click_count": "666", "click_num": "1", "con_num": "2", "com_num": "3", "overtime_num": "4" },
      { "lawyer": "蔡律师", "click_count": "666", "click_num": "1", "con_num": "2", "com_num": "3", "overtime_num": "4" },
      { "lawyer": "蔡律师", "click_count": "666", "click_num": "1", "con_num": "2", "com_num": "3", "overtime_num": "4" },
      { "lawyer": "蔡律师", "click_count": "666", "click_num": "1", "con_num": "2", "com_num": "3", "overtime_num": "4" },
      { "lawyer": "蔡律师", "click_count": "666", "click_num": "1", "con_num": "2", "com_num": "3", "overtime_num": "4" }
    ],
    allData:[
      { "alllawyer": "28", "allclick_count": "288", "allclick_num": "188", "allcon_num": "180", "allcom_num": "150", "allovertime_num": "25"}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '律师咨询记录'
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