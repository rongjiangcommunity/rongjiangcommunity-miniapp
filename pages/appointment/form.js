const app  = getApp();
const util = require('../../utils/util.js');

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
    util.send({
      url: '/api/doctor/admin/booking/' + sid + '/' + option.id,
      method: 'GET',
      callback: function (res) {
        var appointment = res.data.data;
        appointment.create_time = toLocalString(appointment.create_time);
        appointment.update_time = toLocalString(appointment.update_time);

        appointment.statusLabel = self.data.statusRef[appointment.status].label;
        self.setData({
          appointment: appointment,
          postData: {
            status: appointment.status,
            fbNote: appointment.fb_note
          }
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
    id:'',
    postData : {
      status : '',
      fbNote : '',
    }
  },
  //拨打医生电话
  phoneCall : function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },
  //撤销申请
  cancelAppointment : function(){
    var self = this;
    wx.showModal({
      title       : '撤销申请',
      cancelText  : '再想想',
      confirmText : '确定撤销',
      content     : '撤销后不可恢复，请确定对方是否同意撤销。',
      success(res) {
        if (res.confirm) {
          self.setData({
            "postData.status": 'cancel'
          })
          self.syncStatus(self);
        }
      }
    })
  },
  //更新受理结果todo
  updateAppointment: function () {
    var self = this;
    var statuaLabel = self.data.statusRef[self.data.postData.status].label;
    wx.showModal({
      title: '更新受理结果',
      cancelText: '再想想',
      confirmText: '确定更新',
      content: '更新后此申请状态变为' + statuaLabel+'，并且更新最新的反馈内容，对方可以看到，是否提交？',
      success(res) {
        if (res.confirm) {
          self.syncStatus(self);
        }
      }
    })
  },
  //同步状态
  syncStatus: function (self){
    util.send({
      url: '/api/doctor/admin/booking/' + app.getCredentials() + '/' + self.data.id,
      data: self.data.postData,
      method: 'POST',
      callback: function () {
        const status = self.data.postData.status;
        self.setData({
          "appointment.status"      : status,
          "appointment.statusLabel" : self.data.statusRef[status].label
        })
        wx.showToast({
          title: '更新成功',
          icon: 'success',
          duration: 3000,
          //更新后跳回列表页
          complete : function(){
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 3000)
          }
        });
      }
    });
  },
  //状态更改
  statusChange : function(e){
    this.setData({
      "postData.status" : e.detail.value
    })
  },
  //内容更改
  noteChange : function(e){
    this.setData({
      "postData.fbNote": e.detail.value
    })
  },
  //去内容页
  toContent: function (e) {
    wx.navigateTo({
      url: 'content?jsonStr=' + JSON.stringify(this.data.appointment)
    });
  },
})

function toLocalString(dateStr) {
  return util.formatTime(new Date(dateStr));
}
