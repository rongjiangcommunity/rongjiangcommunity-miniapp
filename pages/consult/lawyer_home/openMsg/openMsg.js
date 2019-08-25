// pages/consult/consult_input/consult_input.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lawyerInfo:{},
    strCount : 300,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const credentials = app.getCredentials();
    const that=this;
    const lawyerInfo=JSON.parse(options.info);
    that.setData({
      lawyerInfo:lawyerInfo,
    })
    wx.setNavigationBarTitle({
      title: '提交咨询'
    });
    // 获取fromUid
    wx.request({
      url: app.serverUrl + '/api/user/' + credentials,
      success(res) {
        that.setData({
          fromUid: res.data.data.id,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 咨询字数计数
  strCount:function(e){
  let maxlength=300;
  let inputStr=e.detail.value.length;
  let strCount=maxlength-inputStr;
  this.setData({
    strCount : strCount,
  });
  },
  // 提交咨询处理
  consultSubmit:function(e){
    const credentials = app.getCredentials();
    const that=this;
    const msg = e.detail.value.message;
    const fromUid = that.data.fromUid;
    const toUid=that.data.lawyerInfo.uid;
    if(this.data.strCount>285){
      // 显示提示框
      this.setData({
        showModal_fail: true
      });
    }else{
      // 调用打开信息接口
      wx.request({
        url: app.serverUrl + '/api/lawyer/msg/open/' + credentials,
        method: 'POST',
        data: { "msg": msg, "fromUid": fromUid, "toUid": toUid},
        success(res) {
          console.log(res.data);
          that.setData({
            showModal: true,
          });
        }
      })     
    }   
  },
  // 回到律师列表页面
  backToList:function(){
   wx.navigateBack({
     delta: 2
   })
  },
  // 隐藏提示框
  hideModal:function(){
    this.setData({
      showModal_fail: false,
    })
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