const app = getApp();

Page({
  onLoad : function(option){
    var self = this;
    wx.showLoading({
      title: '加载中',
    })
    self.setData({
      id        : option.id,
      statusRef : JSON.parse(option.jsonStr)
    })
    var sid = app.getCredentials();
    wx.request({
      url: getApp().serverUrl + '/api/doctor/admin/booking/' + sid + '/' + option.id,
      method: 'GET',
      success(res) {
        wx.hideLoading();
        console.log(res.data)
        if (res.data.success) {
          var appointment = res.data.data;
          appointment.statusLabel = self.data.statusRef[appointment.status].label;
          self.setData({
            appointment: appointment,
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
    appointment : {},
    statusRef   : {},
    radioItem: null,
    id:''
  },
  //拨打医生电话
  phoneCall : function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },
  //撤销申请todo
  cancelAppointment : function(){
    wx.showModal({
      title       : '撤销申请',
      cancelText  : '再想想',
      confirmText : '确定撤销',
      content     : '撤销后不可恢复，请确定对方是否同意撤销。',
      success(res) {

      }
    })
  },
  //更新受理结果todo
  updateAppointment: function () {
    wx.showModal({
      title: '更新受理结果',
      cancelText: '再想想',
      confirmText: '确定更新',
      content: '更新后此申请状态变为#已选状态#，并且更新最新的反馈内容，对方可以看到，是否提交？',
      success(res) {

      }
    })
  },
  //去内容页todo
  toContent: function (e) {
    wx.navigateTo({
      url: 'content?jsonStr=' + JSON.stringify(this.data.appointment)
    });
  },
})
