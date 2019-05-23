// pages/me_feedback/me_feedback.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputText: undefined,
    disabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '反馈建议'
    })
    // this.subFeed()
  },
  handleInput: function(e){
    this.setData({ inputText:e.detail.value})
  },
  handleSubmit: function(){
    let inputText = this.data.inputText
    if(inputText && inputText.replace(/(^\s*)|(\s*$)/g, "").length>0){
      this.setData({ disabled: true});
      this.subFeed(inputText)
    }else{
      this.failAlert('请输入反馈内容！')
    }
  },
  failAlert: function (str) {
    wx.showToast({
      title: str,
      icon: 'none',
      duration: 3000
    })
  },
  subFeed: function(message){
    let that = this;
    wx.request({
      url: getApp().serverUrl + '/api/user/feedback/' + app.getCredentials(),
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data:{
        message
      },
      success(res) {
        if (res.data.success) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          });
          setTimeout(function () {
            that.setData({ disabled: false,inputText:''});
            wx.navigateBack({
              delta: 1
            });
          }, 2000);
        } else {
          that.failAlert("请求失败！");
        }
      },
      fail() {
        that.setData({ disabled: false });
        that.failAlert("请求失败！");
      }
    })
  }
})
