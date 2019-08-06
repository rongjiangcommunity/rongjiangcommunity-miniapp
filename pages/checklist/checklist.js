// pages/checklist/checklist.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    proList: [],
    checkData: {},
    radioItem: null,
    page: 0,
    start: 0,
    stop: 3,
    num: 4,
    hasMoredData: true
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
    var sid = app.getCredentials();
    //var sid = "yiz:b996d73ec77be9743adbf83d0cbd832632c98151c6a68184e8b5861a3ac54597";
    wx.request({
      url: getApp().serverUrl + '/api/user/reviewlist/' + sid + "?start=" + self.data.start + "&stop=" + self.data.stop,
      method: 'GET',
      success: function (res) {
        console.log(res.data.data);
        if(!res.data.data.length||res.data.data<=self.data.num){
          self.setData({
            hasMoredData: false
          });
        }
        self.setData({
          proList: res.data.data,
        });
      },
      fail: function () {

      },
      complete: function () {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      }

    })
  },
  toDetail: function (e) {
    wx.navigateTo({
      url: '../audit_form/audit_form?uid=' + e.target.dataset.uid
    });
  },
  checkSubmit: function (e) {
    var that = this;
    var data = e.target.dataset;
    var status = data.status;
    var checkItem = data.checkdata;
    if (data.checkitem == null) {
      wx.showModal({
        title: '审核提示',
        content: '请先选择处理方式',
        canceColor: '#666',
        confirmColor: '#ec5300'
      })
      return;
    }
    var radioItem = data.checkitem == 0 ? false : true;
    var sid = app.getCredentials();
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
          comment: "快速审核",
          approved: radioItem,
          uid: checkItem.uid,
        },
        success(res) {
          console.log(res.data)
          wx.hideLoading();
          if (res.data.success) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 4000
            }),
              that.onLoad();
          } else {
            that.failAlert("请求失败！");
          }
        },
        fail() {
          wx.hideLoading();
          that.failAlert("请求失败！");
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
   * 监听下拉事件
   */
  onPullDownRefresh: function () {
    console.log("下拉");
    wx.showNavigationBarLoading();
    if (this.data.page <= 0) {
      this.setData({
        page: 0
      });
      console.log("第一页");
      wx.stopPullDownRefresh();
    } else {
      let page = this.data.page - 1;
      let start = this.data.start - this.data.num;
      let stop = this.data.stop - this.data.num;
      this.setData({
        page: page,
        start: start,
        stop: stop
      })
      this.getProList();
    }
  },
  /**
  * 监听上拉事件
  */
  onReachBottom: function () {
    console.log("上拉");
    if (this.data.hasMoredData){
      wx.showNavigationBarLoading();
      let page = this.data.page + 1;
      let start = this.data.stop + 1;
      let stop = this.data.stop + this.data.num;
      this.setData({
        page: page,
        start: start,
        stop: stop
      })
      this.getProList();
    }
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
