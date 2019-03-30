Page({
  onLoad : function(option){
    var self = this;
    wx.showLoading({
      title: '加载中',
    })
    var sid = wx.getStorageSync('credentials');
    // sid = "yiz:b996d73ec77be9743adbf83d0cbd832632c98151c6a68184e8b5861a3ac54597";
    wx.request({
      url: getApp().serverUrl + '/api/user/review/' + sid + '/' + option.uid,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        wx.hideLoading();
        console.log(res.data)
        if (res.data.success) {
          var student = res.data.data;
          var friends = student.classmates.split(',');
          for(var i=0;i<friends.length;i++){
            student['f' + (i + 1)] = friends[i];
          }
          self.setData({
            student: student,
          })
        } else {
          wx.showToast({
            title: '获取详情信息失败',
            icon: 'none',
            duration: 3000
          })
        }
      },
      fail() {
        wx.hideLoading();
        wx.showToast({
          title: '请求失败',
          icon: 'none',
          duration: 3000
        })
      }
    });
  },
  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    student : {}
  },
  /**
   * 弹窗
   */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
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
  onConfirm: function () {
    this.hideModal();
  }
})