// pages/checklist/checklist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proList: [
      {
        img: '/images/icons/book.png',
        title: '测试车市',
        shortDesc: '我就是详情',
        name: '陈灿贵',
        className: '90届11班',
        classMateTitle: '同班同学：',
        classMateName: '撒贝宁、王鸥、小白'
      },
      {
        img: '/images/icons/book.png',
        title: '测试车市',
        shortDesc: '我就是详情',
        name: '陈灿贵',
        className: '90届11班',
        classMateTitle: '同班同学：',
        classMateName: '撒贝宁、王鸥、小白'
      },
      {
        img: '/images/icons/book.png',
        title: '测试车市',
        shortDesc: '我就是详情',
        name: '陈灿贵',
        className: '90届11班',
        classMateTitle: '同班同学：',
        classMateName: '撒贝宁、王鸥、小白'
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '审核列表'
    }),
    this.setData({
        test: '01',
      })
    this.getProList();
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

  },
  getProList: function () {
    var self = this;
    wx.request({
      url: app.globalData.host,
      method: 'GET',
      success: function (res) {
        console.log(res);
        self.setData({
          proList: res.data,
        })
      },
      fail: function () {

      }
    })
  }
})