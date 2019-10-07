// pages/love/management/member.js
// pages/love/management/audit.js
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  disable: function () {
    Dialog.confirm({
      message: '是否禁用该用户的鹊桥相会权限'
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    });
  },
  enable: function () {
    Dialog.confirm({
      message: '是否取消禁用该用户的鹊桥相会权限'
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    });
  }
})