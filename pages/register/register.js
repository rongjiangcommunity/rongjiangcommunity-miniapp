//获取应用实例
const app = getApp();
const approved = wx.getStorageSync('isXiaoyou');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    editable: false,
    applyInfo: {},
    approved,
    status: '',
    gender: '',
    msg_complete: true
  },
  /**
     * 生命周期函数--监听页面显示
     */
  onShow: function () {
    this.checkInfo();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '校友认证'
    })
  },
  failAlert: function(str){
    wx.showToast({
      title: str,
      icon: 'none',
      duration: 3000
    })
  },
  isNumber: function(val){
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(val) || regNeg.test(val)){
      return true;
    }else {
      return false;
    }
  },
  onChange(event) {
    this.setData({
      gender: event.detail,
      msg_complete: false
    });
   
  },
  msg_contentHandle:function(e){
    if(e.detail.value==''){
      this.setData({
        msg_complete: true
      })
    }else{
      this.setData({
        msg_complete: false
      })
    }
  },
  formSubmit: function (e) {
    console.log(e);
    let that = this;
    var data = e.detail.value;
    console.log('form发生了submit事件，携带数据为：', data);
    if (!data.name) { this.failAlert('请输入姓名！');return}
    if (!data.gender) { this.failAlert('请选择性别！'); return }
    if (!data.mobile) { this.failAlert('请输入手机号！');return}
    if (!(/^1[34578]\d{9}$/.test(data.mobile))) {
      this.failAlert("手机号码有误，请重填");
      return false;
    } 
    if (!data.period) { this.failAlert('请输入届别！');return}
    if (!this.isNumber(data.period)) {
      this.failAlert('请输入数字表示届别！'); return
    }
    if (!data.g3) { this.failAlert('请输入高三班级！');return}
    if (!this.isNumber(data.g3)) {
      this.failAlert('请输入数字表示高三班级！'); return
    }
    if (!data.classmate1 || !data.classmate2 || !data.classmate3) { this.failAlert('请输入三位同学姓名！'); return }
    if (!data.wechat) { this.failAlert('请输入微信号！');return}

    this.setData({ disabled: true})
    wx.showLoading({
      title: '上传中',
    })
    wx.request({
      url: getApp().serverUrl + '/api/user/apply/' + app.getCredentials(),
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        name: data.name,
        gender:data.gender,
        mobile: data.mobile,
        period: parseInt(data.period),
        g3: parseInt(data.g3),
        classmates: [data.classmate1,data.classmate2,data.classmate3].join(','),
        message: data.field,
        wechat: data.wechat,
        formId: e.detail.formId,
      },
      success(res) {
        that.setData({ disabled: false});
        wx.hideLoading()
        if (res.data.success) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 4000
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },4000)
        } else {
          that.failAlert("请求失败！");
        }
      },
      fail() {
        this.setData({ disabled: false})
        wx.hideLoading()
        that.failAlert("请求失败！");
      }
    })
  },


  checkInfo: function () {
    app.appReady().then(() => {
      Promise.all([app.getUserInfo(), app.getApplyInfo()])
        .then(([user, applyInfo]) => {
          const approved = user && user.approved === 'true' ? true : false;
          const status = applyInfo ? applyInfo.status : '';
          // console.log(approved)
          this.setData({
            user,
            applyInfo,
            approved,
            status,
          });
          this.setClassMates(applyInfo && applyInfo.classmates);
          this.checkIfEditable(approved, status);
        }).catch((err) => {
          console.log(err);
        });
    });
  },
  setClassMates: function ( classmatesStr ) {
    let classMates = classmatesStr ? classmatesStr.split(',') : [];
    this.setData({ classMates })
  },
  checkIfEditable: function ( approved, status  ){
    if ( approved ){
      this.setData({ editable: false })
    } else {
      this.setData({ editable: true })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
