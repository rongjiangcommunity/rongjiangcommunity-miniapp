// pages/me/feedback/feedback.js

var initData = {
  feedbackForm: {
    title: '',
    content: '',
    images: []
  }
};
var debugData = {
  feedbackForm: {
    title: '今天你为什么不来我家玩',
    content: '呜呜呜',
    images: [] // 图片最多几张？现在暂定三张吧，到时候问一下师兄
  }
};

Page({

  /**
   * 页面的初始数据
   */
  data: debugData,

  // 回调函数
  submitForm: function () { // 提交反馈表格，提交后提醒一下用户提交成功，然后返回me页面
    console.log('submitForm');
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