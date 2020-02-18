// pages/magpie/index/index.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    albumDatas: []
  },
  // 选择照片
  addImg: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        let albumDatas = [
          ...that.data.albumDatas,
          ...tempFilePaths
        ]
        console.log('albumDatas: ', albumDatas);
        that.setData({
          albumDatas
        });
        that.uploadImg( albumDatas );
      }
    })
  },
  // 上传照片到服务端
  uploadImg: function (albumDatas) {
    const credentials = app.getCredentials();
    wx.request({
      url: `${app.serverUrl}/api/magpie/zadd/${credentials}`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        type: 'album',
        values: albumDatas
      },
      success(res) {
        console.log('res: ', res.data)
      },
      fail(err) {
        console.error(err)
      }
    })
  },
  // 删除服务端照片
  deleteImg: function ( imgUrl ) {
    const credentials = app.getCredentials();
    wx.request({
      url: `${app.serverUrl}/api/magpie/zrem/${credentials}`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        type: 'album',
        value: imgUrl
      },
      success(res) {
        console.log('res: ', res.data)
      },
      fail(err) {
        console.error(err)
      }
    })
  },
  // 删除照片
  removeImg: function (e) {
    console.log(e)
    let index = e.target.dataset.index
    let { albumDatas } = this.data;
    let removeImgs = albumDatas.splice(index, 1);
    this.setData({
      albumDatas
    })
    this.deleteImg( removeImgs[0] );
  },
  // 初始化数据
  setInitData: function(){
    // let that = this;
    // wx.getStorage({
    //   key: 'magpieIndexData',
    //   success(res) {
    //     let magpieInfo = JSON.parse(res.data)
    //     console.log('magpieInfo: ', magpieInfo);
    //     let tagArr = magpieInfo.tags ? magpieInfo.tags.split(',') : [];
    //     that.setData({
    //       ...magpieInfo,
    //       tagArr
    //     })
    //   }
    // })
    const ctx = this;
    const credentials = app.getCredentials();
    wx.request({
      url: `${app.serverUrl}/api/magpie/info/${credentials}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        if (res.data.success) {
          console.log('data: ', res.data.data);
          let { data } = res.data;
          let tagArr = data.tags ? data.tags.split(',') : [];
          ctx.setData({
            ...data,
            tagArr,
            albumDatas: data.album.split(',')
          });
        }
      }
    });
  },

  // 获取初始照片信息
  getAlbumImg: function(){
    let that = this;
    const credentials = app.getCredentials();
    console.log('credentials:', credentials);
    wx.request({
      url: `${app.serverUrl}/api/magpie/zrange/${credentials}?type=album`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        console.log('res1: ', res.data.data)
        if (res.data.success) {
          that.setData({
            albumDatas: res.data.data
          });
        }
      },
      fail(err) {
        console.error(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setInitData();
    // this.getAlbumImg();
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