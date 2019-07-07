// pages/me_feedback/me_feedback.js
//获取应用实例
const app = getApp()

Page({
  data:{
    doctorInfo:{},
    startTime: undefined,
    regDate: undefined
  },
  onLoad: function (options) {
    this.setData({ doctorInfo: JSON.parse(options.info), startTime: this.getDate()})

    app.getUserInfo().then(res=>{
      const approved = res && res.approved === 'true' ? true:false;
      this.setData({ userInfo: res, approved })
    })
 
    
    wx.setNavigationBarTitle({
      title: '预约挂号'
    })
  },

  bindDateChange: function (e) {
    this.setData({
      regDate: e.detail.value
    })
  },

  formSubmit: function (e) {
    let that = this;
    var data = e.detail.value;
    if (!data.note) { app.failAlert('请输入预约内容');return}
    if (!data.regDate) { app.failAlert('请选择预约时间');return}

    wx.showModal({
      title: '提交预约',
      content: '提交后会有工作人员帮您联系医生，是否确定提交，预约成功前都可撤销。',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.postInfo(data.drid, data.note, data.regDate)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  postInfo: function(drid, note, regDate){
    wx.showLoading({
      title: '加载中',
    })

    const credentials = app.getCredentials();
    wx.request({
      url: `https://www.rongjiangcommunity.cn/api/doctor/booking/${credentials}`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data:{ drid, note, regDate},
      success(res) {
        wx.hideLoading()
        if(res.data.success){
          app.failAlert("预约成功");
          setTimeout(()=>{
            wx.navigateTo({
              url: '../me_doctor',
            })
          },3000)
        }else{
          app.failAlert("请求失败！");
        }
      },
      fail() {
        wx.hideLoading()
        app.failAlert("请求失败！");
      }
    });
  },

  onShow: function () {
    app.getUserInfo().then(res=>{
      const approved = res && res.approved === 'true' ? true:false;
      this.setData({ approved })
      if (!approved) {
          wx.navigateTo({
            url: '../../index/index'
          })
      }
    })
  }, 

  // 获取当前时间
  getDate: function(){
    let date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + '-' + month + '-' + strDate;
    return currentdate;
  },
  
})