Page({
  onLoad : function(option){
    var self = this;
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      uid: option.uid,
    })
    console.log('option', this.data.uid)
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
    student : {},
    radioItem: null,
    uid:'',
  },
  radioChange: function (e) {
    var radioItem = e.detail.value;
    this.setData({
      showModal: true,
      radioItem: radioItem,
    })
    console.log('radio发生change事件，携带value值为：', radioItem)
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

  checkSubmit: function (e) {
    var that = this;
    var data = e.target.dataset;
    var status = data.status;
    var checkItem = data.checkdata;
    var uid = that.data.uid;
    console.log('checkSubmit ', data.checkitem);
    if (data.checkitem == null) {
      wx.showModal({
        title: '审核提示',
        content: '请先选择处理方式',
        canceColor: '#666',
        confirmColor: '#ec5300'
      })
      return;
    }
    var radioItem = data.checkitem == 0 ? false : true;
    var sid = wx.getStorageSync('credentials');
    // sid = "yiz:b996d73ec77be9743adbf83d0cbd832632c98151c6a68184e8b5861a3ac54597";
    console.log('checkSubmit ', radioItem);
    if (status != "cancel") {
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: getApp().serverUrl + '/api/user/review/' + sid + '/' + uid,
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        data: {
          comment: "快速审核",
          approved: radioItem,
          uid: uid,
        },
        success(res) {
          console.log(res.data)
          wx.hideLoading();
          if (res.data.success) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 4000
            }),
              that.onLoad();
          } else {
            that.failAlert("请求失败！");
          }
        },
        fail() {
          wx.hideLoading();
          that.failAlert("请求失败！");
        }
      })
    }
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function (e) {
    this.hideModal();
    this.checkSubmit(e);
  },
})