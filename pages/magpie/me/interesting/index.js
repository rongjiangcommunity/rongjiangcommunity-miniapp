// pages/magpie/me/interesting/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 获取初始信息
  getHeartInfo: function(){
    const ctx = this;
    const credentials = app.getCredentials();
    wx.request({
      url: `${app.serverUrl}/api/magpie/heartbeat/${credentials}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        console.log('res2: ', res.data);
        let { data } = res.data;
        for(var i = 0; i < data.length; i++){
          let item = data[i];
          if(!item.user) return;
          item.name = item.user.name;
          item.workingArea = item.user.workingArea;
          item.birth = item.user.birth.split('-')[0];
          item.degree = item.user.degree.split('-')[0];
          item.singleStatus = item.user.singleStatus;
          item.album = item.user.album.split(',')[0];
          item.userInfo = JSON.stringify(item.user)
        }
        ctx.setData({
          interestingList: data
        })
      },
      fail(err) {
        console.error(err)
      }
    })
  },

  // 取消心动
  removeLike: function (e) {
    const credentials = app.getCredentials();
    let openId = e.target.dataset.wechatopenid;
    wx.request({
      url: `${app.serverUrl}/api/magpie/dislike/${openId}/${credentials}`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        console.log('res: ', res.data)
      },
      fail(err) {
        console.error(err)
      }
    });
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
    this.getHeartInfo();
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