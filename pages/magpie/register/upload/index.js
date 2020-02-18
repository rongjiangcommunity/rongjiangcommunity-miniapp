// pages/magpie/register/upload/index.js
//获取应用实例
const app = getApp();
wx.cloud.init();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    IDCardImg: null,
    DegreeImg: null,
    disabled: false
  },
  chooseIDCard: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0];
        that.setData({
          IDCardImg: tempFilePaths
        })
      }
    })
  },
  uplaodFile() {
    var { IDCardImg, DegreeImg, magpieRegisterData, urls } = this.data;
    const that = this;
    that.setData({
      disabled: true
    });
    wx.showLoading({
      title: '提交中',
    });
    if ( !urls ) { // 防止上传图片成功，提交数据失败之后多次请求图片
      return Promise.all([ IDCardImg, DegreeImg ].map(f => {
        return new Promise((resolve, reject) => {
          const name = getFilename(f);
          if (name) {
            wx.cloud.uploadFile({
              cloudPath: `magpie/${name}`,
              filePath: f, // 小程序临时文件路径
              success: res => {
                resolve(res.fileID);
              },
              fail: reject,
            });
          } else {
            resolve('');
          }
        })
      })).then(urls => {
        console.log('urls: ', urls);
        that.setData({
          urls: urls
        })
        that.uploadData(urls);
      });
    } else {
      that.uploadData(urls);
    }
  },
  // 上传数据
  uploadData: function (urls){
    const credentials = app.getCredentials();
    const serverUrl = app.serverUrl;
    let that = this;
    let { magpieRegisterData } = this.data
    wx.request({
      url: `${serverUrl}/api/magpie/register/${credentials}`,
      header: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      data: {
        ...magpieRegisterData,
        idImgFront: urls[0],
        idImgBack: urls[1]
      },
      success: function (res) {
        console.log('res: ', res);
        wx.hideLoading();
        that.setData({
          disabled: false
        });
        if (res.data.success) {
          console.log('提交成功');
          wx.navigateTo({
            url: '/pages/magpie/register/success/index'
          });
        } else {
          app.failAlert('提交失败，请重新尝试！');
        }
      },
      fail: function (err) {
        console.log('err: ', err);
        that.setData({
          disabled: false
        });
        wx.hideLoading();
        app.failAlert(err.errMsg);
      }
    });
  },
  chooseDegreeImg: function(){
    let ctx = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res);
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0];
        ctx.setData({
          DegreeImg: tempFilePaths
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'magpieRegisterData',
      success(res) {
        console.log(res.data);
        that.setData({
          magpieRegisterData: JSON.parse(res.data)
        });
      }
    });

    wx.getStorage({
      key: 'magpieIndexData',
      success(res) {
        let data = res.data
        console.log('data: ', JSON.parse(data));
      }
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

function getFilename(url) {
  return (url.match(/[^.]{32}\.\w+$/) || [])[0];
}