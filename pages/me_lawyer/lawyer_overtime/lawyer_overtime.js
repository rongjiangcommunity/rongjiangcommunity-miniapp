const app = getApp();
Page({

  tel:function(e){
    let that = this
    var telId = e.currentTarget.dataset.telid;
    wx:wx.makePhoneCall({
      phoneNumber: that.data.cardData[telId].lawyer.mobile,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  data:{
    cardData: [
      ],
    offset:0,
    count:8,
    screenHight:0 //屏幕高度
  },
  onLoad: function (options) {
    let that = this;
    //获取屏幕尺寸
    let windowHeight = wx.getSystemInfoSync().windowHeight;
    that.setData({
      screenHight: windowHeight - 60
    })
    wx.setNavigationBarTitle({
      title: '24小时未回复'
    })
    that.getList();
  },
  //获取消息列表
  getList:function(e){
    let that = this
    const sid = app.getCredentials();
    wx.request({
      url: app.serverUrl + '/api/lawyer/msg/delay/' + sid,
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        hours: 24,
        offset: that.data.offset,
        count: that.data.count
      },
      success(res) {
        if (res.data.success === true) {
        let arr = res.data.data;
        if(arr != null){
          arr = that.data.cardData.concat(arr)
          that.setData({
            cardData: arr
          })
        }
        }
        console.log(that.data.cardData)
      }
    })
  },
lowerMoreClassify:function(e){
  let that = this;
    that.setData({
      offset: that.data.offset + that.data.count,
    })
  that.getList(); //重新获取信息
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