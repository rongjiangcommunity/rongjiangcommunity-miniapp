// pages/love/management/audit.js
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personList :[],
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
    this.getListData();
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
   * 获取数据列表数据
   */
  getListData:function(){
    var sid = app.getCredentials();
    var _this = this;
    util.send({
      url: '/api/magpie/admin/users/' + sid + '?status=created',
      method: 'GET',
      callback: function (res) {
        if(res.data.data != null){
          _this.setData({
            personList: res.data.data.map(x => {
              x.gender_self = (x.gender == 'female') ? 'women' : 'man';
              return x;
            })
          });
        }else{
          _this.setData({
            personList:[],
          });
        }
      }
    });
  },
  /**
   * 跳转到详情页
   */
  cardToDetail:function(e){
    var opid = e.currentTarget.dataset.opid;
    wx.navigateTo({
        url: 'audit_detail?opid=' + opid,
    })
  },
  /**
   * 同意操作
   */
  agree:function(e){
    var selOpenid = e.currentTarget.dataset.opid;
    Dialog.confirm({
      message: '是否确认通过该用户的鹊桥相会权限申请'
    }).then(() => {
      // on confirm
      var sid = app.getCredentials();
      var _this = this;
      util.send({
        url: '/api/magpie/admin/review/' + selOpenid + '/ok/' + sid,
        method: 'POST',
        callback: function (res) {
          _this.afterAgree();
        }
      });
    }).catch(() => {
      // on cancel
    });
  },

  /**
   * 同意后，弹窗并刷新列表
   */
  afterAgree:function(){
    var _this = this;
    wx.showToast({
      title:'操作成功',
      success:function(){
        _this.getListData();
      }
    });
  },
})