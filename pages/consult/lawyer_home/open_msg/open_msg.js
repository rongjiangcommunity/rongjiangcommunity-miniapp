// pages/consult/consult_input/consult_input.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lawyerInfo:{},
    strCount : 300,
    modalTitle: "",
    disabled: true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const credentials = app.getCredentials();
    const that=this;
    const lawyerInfo=JSON.parse(options.info);
    this.getWindowHeight();
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
  if(strCount<=285){
    this.setData({
      disabled: false
    });
  }
  if (strCount > 285) {
      this.setData({
        disabled: true,
    });
  }
  },
  // 提交咨询处理
  consultSubmit:function(e){
    const credentials = app.getCredentials();
    const that=this;
    const formId=e.detail.formId;
    const msg = e.detail.value.message;
    const fromUid = that.data.fromUid;
    const toUid=that.data.lawyerInfo.uid;
    if(that.data.strCount>285){
      // 显示提示框
      that.setData({
        modalTitle: "提交失败",
        modalMsg: "请详细描述您的问题，字数不少于15个字！",
        modalBtn: "我知道了",
        msgStatus: 0,
        showModal: true
      });
    }else{
      // 调用打开信息接口
      wx.request({
        url: app.serverUrl + '/api/lawyer/msg/open/' + credentials,
        method: 'POST',
        data: { "msg": msg, "fromUid": fromUid, "toUid": toUid,"formId":formId},
        success(res) {
          console.log(res.data);
          if(res.data.success){
            that.setData({
              modalTitle: "提交成功",
              modalMsg: "您的咨询已提交，请耐心等候律师解答",
              modalBtn: "返回律师列表",
              msgStatus: 1,
              showModal: true
            });
          }else{
            that.setData({
              modalTitle: "提交失败",
              modalMsg: "已存在进行中的对话，请到校友咨询中查看",
              modalBtn: "返回律师列表",
              msgStatus: 1,
              showModal: true
            });
          }   
        }
      })     
    }   
  },
  getWindowHeight: function () {
    const that = this;
    wx.getSystemInfo({
      success: function (res) {
        const windowHeight = res.windowHeight;
        const windowWidth = res.windowWidth;
        let inputHeight = windowHeight * 750 / windowWidth - 450;
        that.setData({
          inputHeight: inputHeight,
        });
      }
    });
  },
  btnHandle:function(e){
    console.log(e)
    const status = this.data.msgStatus;
    if(status==0){
      this.hideModal();
    }
    if(status==1){
      this.backToList();
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
      showModal: false,
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