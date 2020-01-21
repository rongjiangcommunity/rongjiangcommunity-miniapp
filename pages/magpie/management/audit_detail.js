// pages/love/management/audit_detail.js
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opid:'',
    detailData:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var _this = this;
    this.setData({
      opid:options.opid,
    });
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
    this.getDetailData();
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

  /**
   * 取详情数据
   */
  getDetailData:function(){
    var sid = app.getCredentials();
    var _this = this;
    util.send({
      url: '/api/magpie/admin/user/' + sid + '?openid='+_this.data.opid,
      method: 'GET',
      callback: function (res) {
        console.log(res);
        _this.setData({
          detailData: res.data.data,
        });
      },
    });
  },
  /**
   * 同意申请
   */
  agreeAction: function (e) {
    Dialog.confirm({
      message: '是否确认通过该用户的鹊桥相会权限申请'
    }).then(() => {
      // on confirm
      var sid = app.getCredentials();
      var _this = this;
      util.send({
        url: '/api/magpie/admin/review/' + _this.data.opid + '/ok/' + sid,
        method: 'POST',
        callback: function (res) {
          _this.afterAction();
        }
      });
    }).catch(() => {
      // on cancel
    });
  },
  /**
   * 拒绝申请
   */
  refuseAction: function (e) {
    Dialog.confirm({
      message: '是否确认拒绝该用户的鹊桥相会权限申请'
    }).then(() => {
      // on confirm
      var sid = app.getCredentials();
      var _this = this;
      util.send({
        url: '/api/magpie/admin/review/' + _this.data.opid + '/notok/' + sid,
        method: 'POST',
        callback: function (res) {
          _this.afterAction();
        }
      });
    }).catch(() => {
      // on cancel
    });
  },
  /**
   * 操作后
   */
  afterAction:function(){
    var _this = this;
    wx.showToast({
      title: '操作成功',
      success: function () {
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          });
        },3000);
      }
    });
  },
})