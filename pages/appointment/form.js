<<<<<<< HEAD
const app = getApp()

Page({
  onLoad : function(option){
    //todo
=======
const app  = getApp();
const util = require('../../utils/util.js');

Page({
  onLoad : function(option){
>>>>>>> f9a1ac965600287056fdc41c9b19609afad36447
    var self = this;
    wx.showLoading({
      title: '加载中',
    })
<<<<<<< HEAD
    this.setData({
      id   : option.id,
      color: option.color
    })
    var sid = app.getCredentials();
    wx.request({
      url: getApp().serverUrl + '/api/user/review/' + sid + '/' + option.id,
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
=======
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
   
>>>>>>> f9a1ac965600287056fdc41c9b19609afad36447
  },
  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    showModal: false,
    student : {},
    radioItem: null,
    id:'',
    color : '#000'
=======
    appointment : {},
    statusRef   : {},
    radioItem: null,
    id:'',
    postData : {
      status : '',
      fbNote : '',
    }
>>>>>>> f9a1ac965600287056fdc41c9b19609afad36447
  },
  //拨打医生电话
  phoneCall : function(e){
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },
<<<<<<< HEAD
  //撤销申请todo
  cancelAppoinment : function(){
=======
  //撤销申请
  cancelAppointment : function(){
    var self = this;
>>>>>>> f9a1ac965600287056fdc41c9b19609afad36447
    wx.showModal({
      title       : '撤销申请',
      cancelText  : '再想想',
      confirmText : '确定撤销',
      content     : '撤销后不可恢复，请确定对方是否同意撤销。',
      success(res) {
<<<<<<< HEAD

=======
        if (res.confirm) {
          self.setData({
            "postData.status": 'cancel'
          })
          self.syncStatus(self);
        }
>>>>>>> f9a1ac965600287056fdc41c9b19609afad36447
      }
    })
  },
  //更新受理结果todo
<<<<<<< HEAD
  updateAppoinment: function () {
=======
  updateAppointment: function () {
    var self = this;
    var statuaLabel = self.data.statusRef[self.data.postData.status].label;
>>>>>>> f9a1ac965600287056fdc41c9b19609afad36447
    wx.showModal({
      title: '更新受理结果',
      cancelText: '再想想',
      confirmText: '确定更新',
<<<<<<< HEAD
      content: '更新后此申请状态变为#已选状态#，并且更新最新的反馈内容，对方可以看到，是否提交？',
      success(res) {

      }
    })
  },
  //去内容页todo
  toContent: function (e) {
    wx.navigateTo({
      url: 'content'
=======
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
          duration: 3000
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
>>>>>>> f9a1ac965600287056fdc41c9b19609afad36447
    });
  },
})
