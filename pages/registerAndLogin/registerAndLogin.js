// pages/registerAndLogin/registerAndLogin.js

var initData = {
  pageState: 'register', // register, login, modifyPwd, error, loading
  registerInfo: {
    phonenumber: 11111111111,
    password1: '',
    password2: '',
    verificationCode: ''
  },
  modifyPwdInfo: {
    phonenumber: 11111111111,
    password1: '',
    password2: '',
    verificationCode: ''
  },
  loginInfo: {
    phonenumber: 11111111111,
    password: '',
    verificationCode: ''
  },

};



Page({

  // 回调函数
  submitForm: function () {
    console.log('submitForm');
  },

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '注册与登录'
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