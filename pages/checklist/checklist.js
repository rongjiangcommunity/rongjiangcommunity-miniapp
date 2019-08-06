// pages/checklist/checklist.js
const app = getApp();

const num = 8;
let page = 0;
let hasMoredData = true;


Page({
  /**
   * 页面的初始数据
   */
  data: {
    proList: [],
    checkData: {},
    radioItem: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '审核列表'
    });
    const start= page*num;
    const stop = start + num -1;
    this.getProList(start, stop);
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getProList: function (start, stop) {
    var self = this;
    var sid = app.getCredentials();
    wx.request({
      url: getApp().serverUrl + '/api/user/reviewlist/' + sid + "?start=" + start + "&stop=" + stop,
      method: 'GET',
      success: function (res) {
        if (res.data.data) {
          const data = res.data.data;
          if (!data.length || data.length < num) {
            hasMoredData = false;
          }
          if (data.length) {
            self.setData({
              proList: self.data.proList.concat(res.data.data),
            });
          }
        }
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
  },
  /**
  * 监听上拉事件
  */
  onReachBottom: function () {
    if (hasMoredData){
      wx.showNavigationBarLoading();
      page = page + 1;
      const start = page*num;
      const stop = page*num + start-1;
      this.getProList(start, stop);
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
