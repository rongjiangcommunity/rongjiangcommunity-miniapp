// pages/me_feedback/me_feedback.js
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
    console.log(e.detail)
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
      url: getApp().serverUrl + '/api/user/feedback/' + wx.getStorageSync('credentials'),
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data:{
        message
      },
      success(res) {
        that.setData({ disabled: false,inputText:''});
        if (res.data.success) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 4000)
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