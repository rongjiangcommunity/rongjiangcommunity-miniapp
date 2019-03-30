// pages/checklist/checklist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proList: [],
    checkData: {},
    radioItem:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '审核列表'
    }),
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
    var sid = wx.getStorageSync('credentials');
    // sid = "yiz:b996d73ec77be9743adbf83d0cbd832632c98151c6a68184e8b5861a3ac54597";
    console.log("getProList ", sid)
    wx.request({
<<<<<<< HEAD
      url: getApp().serverUrl + '/api/user/reviewlist/' + wx.getStorageSync('credentials'),
=======
      url: getApp().serverUrl + '/api/user/reviewlist/' + sid,
>>>>>>> 审核接口和快速审核功能
      method: 'GET',
      success: function (res) {
        console.log(res);
        self.setData({
          proList: res.data.data,
        })
      },
      fail: function () {

      }
    })
  },
  toDetail: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '../audit_form/audit_form?uid=' + e.target.dataset.uid
    });
<<<<<<< HEAD
  }
})
=======
  },

  checkSubmit: function (e) {
    var data = e.target.dataset;
    var status = data.status;
    var checkItem = data.checkdata;
    var radioItem = data.checkitem == 0 ? false : true;
    var sid = wx.getStorageSync('credentials');
    // sid = "yiz:b996d73ec77be9743adbf83d0cbd832632c98151c6a68184e8b5861a3ac54597";
    console.log('checkSubmit ', radioItem);
    if (status != "cancel") {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: getApp().serverUrl + '/api/user/review/' + sid + '/' + checkItem.uid,
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        data: {
          comment: "优秀",
          approved: radioItem,
          uid: checkItem.uid,
        },
        success(res) {
          console.log(res.data)
          wx.hideLoading();
          if (res.data.success) {
            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 4000
            })
            setTimeout(function () {

            }, 4000)

          } else {
            this.failAlert("请求失败！");
          }
        },
        fail() {
          wx.hideLoading();
          this.failAlert("请求失败！");
        }
      })
    }
  },

  /**
 * 弹窗
 */
  toQuickCheck: function (e) {
    var checkData = e.target.dataset.check;
    console.log('快速审核', checkData);
    this.setData({
      showModal: true,
      checkData: checkData,
    })
  },

  radioChange: function (e) {
    var radioItem = e.detail.value;
    this.setData({
      showModal: true,
      radioItem: radioItem,
    })
    console.log('radio发生change事件，携带value值为：', radioItem)
  },
  /**
  * 弹出框蒙层截断touchmove事件
  */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function (e) {
    this.hideModal();
    this.checkSubmit(e);
  },
})
>>>>>>> 审核接口和快速审核功能
