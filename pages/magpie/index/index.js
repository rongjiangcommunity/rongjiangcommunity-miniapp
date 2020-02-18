// pages/magpie/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
  },
  handleSwiperChange: function(e){
    this.setData({
      currentIndex: e.detail.current
    })
  },

  // 获取初始信息
  getInitData: function(){
    let ctx = this;
    const credentials = app.getCredentials();
    wx.request({
      url: `${app.serverUrl}/api/magpie/recomend/${credentials}`,
      header: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log('res: ', res.data);
        let data = res.data.data;
        console.log('data: ', data);
        if(!data){
          ctx.setData({
            infoArr: []
          });
          return;
        }
        let infoArr = [];
        for (var i = 0; i < 6; i++) {
          let item = JSON.parse(data);
          item.gender = ['男', '女'][i % 2];
          item.name = item.name + i;
          item.birth = item.birth.split('-')[0];
          item.album = item.album.split(',');
          item.tags = item.tags.split(',');
          item.wechatOpenid = item.wechatOpenid;
          if (!item.like) {
            item.like = false;
          }
          infoArr.push(item);
        }
        ctx.setData({
          infoArr
        });
      },
    });
    // wx.getStorage({
    //   key: 'magpieIndexData',
    //   success(res) {
    //     let data = res.data
    //     console.log('data: ', JSON.parse(data));
    //     let infoArr = [];
    //     for (var i = 0; i < 6; i++) {
    //       let item = JSON.parse(data);
    //       item.gender = ['男', '女'][i % 2];
    //       item.name = item.name + i;
    //       item.birth = item.birth.split('-')[0];
    //       item.album = item.album.split(',');
    //       item.tags = item.tags.split(',');
    //       item.wechatOpenid = item.wechatOpenid;
    //       if(!item.like){
    //         item.like = false;
    //       }
    //       infoArr.push(item);
    //     }
    //     ctx.setData({
    //       infoArr
    //     });
    //   }
    // })
  },

  // 心动
  addLike: function(e){
    const credentials = app.getCredentials();
    let openId = e.target.dataset.wechatopenid;
    wx.request({
      url: `${app.serverUrl}/api/magpie/like/${openId}/${credentials}`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        console.log('res: ', res.data)
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          duration: 1000
        })
      },
      fail(err) {
        console.error(err)
      }
    });
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
    this.getInitData();
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