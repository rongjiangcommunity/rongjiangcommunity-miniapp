// pages/love/management/member.js
// pages/love/management/audit.js
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberList:[],
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
    var _this = this;
    _this.getListData();
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
   * 取列表数据
   */
  getListData:function(){
    var sid = app.getCredentials();
    var _this = this;
    util.send({
      url: '/api/magpie/admin/users/' + sid + '?status=disabled,ok',
      method: 'GET',
      callback: function (res) {
        _this.setData({
          memberList: res.data.data.map(x => {
            x.gender_self = (x.gender == 'female') ? 'women' : 'man';
            x.btn_text_self = (x.status == 'disbaled') ? '取消禁止' : '禁止';
            x.btn_plain_self = (x.status == 'disbaled') ? 'plain' : '';
            return x;
          }),
        });
      },
    });
  },

  /**
   * 禁止
   */
  disable: function (e) {
    var selOpenid = e.currentTarget.dataset.opid;
    Dialog.confirm({
      message: '是否禁用该用户的鹊桥相会权限'
    }).then(() => {
      // on confirm
      var sid = app.getCredentials();
      var _this = this;
      util.send({
        url: '/api/magpie/admin/review/' + selOpenid + '/disabled/' + sid,
        method: 'POST',
        callback: function (res) {
          _this.getListData();
        }
      });
    }).catch(() => {
      // on cancel
    });
  },

  /**
   * 取消禁止
   */
  enable: function (e) {
    var selOpenid = e.currentTarget.dataset.opid;
    Dialog.confirm({
      message: '是否取消禁用该用户的鹊桥相会权限'
    }).then(() => {
      // on confirm
      var sid = app.getCredentials();
      var _this = this;
      util.send({
        url: '/api/magpie/admin/review/' + selOpenid + '/ok/' + sid,
        method: 'POST',
        callback: function (res) {
          _this.getListData();
        }
      });
    }).catch(() => {
      // on cancel
    });
  }
})