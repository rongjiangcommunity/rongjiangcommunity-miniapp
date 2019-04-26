
Page({

  // 回调函数
  submitForm: function () {
    console.log('submitForm');
  },

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false
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
  formSubmit: function (e) {
    console.log(e);
    let that = this;
    var data = e.detail.value;
    console.log('form发生了submit事件，携带数据为：', data);
    if (!data.name) { this.failAlert('请输入姓名！');return}
    // if (!data.gender) { this.failAlert('请选择性别！');return}
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
    // if (data.region.length<3) { this.failAlert('请选择所在区域！');return}
    // if (!data.residence) { this.failAlert('请输入居住地址！');return}
    // if (!data.degree) { this.failAlert('请选择学历！');return}
    // if (!data.email) { this.failAlert('请输入邮箱！');return}
    if (!data.wechat) { this.failAlert('请输入微信号！');return}
    // if (workExperience.length>0){
    //   for (var i = 0; i < workExperience.length;i++){
    //     if (!workExperience[i]['work-place'] || !workExperience[i]['work-industry'] || !workExperience[i]['work-post']){
    //       this.failAlert("请完善工作信息！");
    //       return;
    //     }
    //   }
    // }
    this.setData({ disabled: true})
    wx.showLoading({
      title: '上传中',
    })
    wx.request({
      url: getApp().serverUrl + '/api/user/apply/' + wx.getStorageSync('credentials'),
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        // gender: data.gender,
        name: data.name,
        mobile: data.mobile,
        period: parseInt(data.period),
        g3: parseInt(data.g3),
        classmates: [data.classmate1,data.classmate2,data.classmate3].join(','),
        message: data.field,
        wechat: data.wechat,
        // country: data.region[0],
        // province: data.region[1],
        // city: data.region[2],
        // email: data.email,
        // g2: data.g2,
        // g1: data.g1,
        // degree: data.degree,
        // university: data.university,
        // residence: data.residence,
        // hobby: data.hobby,
        // work: JSON.stringify(this.data.workExperience)
      },
      success(res) {
        console.log(res.data)
        that.setData({ disabled: false});
        if (res.data.success) {
          wx.showToast({
            title: '上传成功',
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
        that.failAlert("请求失败！");
      }
    })
  },
  bindMultiPickerColumnChange: function(e){
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value)
    let idxSch = this.data.idxSch;
    idxSch[e.detail.column] = e.detail.value;
    this.setData({ idxSch });
  },
  toggleArrow : function(){
    this.setData({
      isShowGrade: !this.data.isShowGrade
    });
  },
  delWorkExperience : function(e){
    var idx  = e.target.dataset.idx;
    var exps = this.data.workExperience;
    exps.splice(idx, 1);
    this.setData({
      workExperience: exps
    });
  },
  addWorkExperience : function(){
    var exps = this.data.workExperience;
    exps.push({
      'work-place'    : '',
      'work-industry' : '',
      'work-post'     : ''
    });
    this.setData({
      workExperience: exps
    });
  },
  bindWorkChange: function (e) {
    console.log(e);
    var id = e.target.id;
    var idx = e.target.dataset.idx;
    var val = e.detail.value;
    var exps = this.data.workExperience;
    exps[idx][id] = val;
    this.setData({
      workExperience: exps
    });
  },
  bindRegionChange: function (e){
    this.setData({
      region: e.detail.value
    });
  },
  bindSchoolChange: function (e) {
    this.setData({
      idxSch: e.detail.value
    });
  },
 
  bindEducationChange: function (e) {
    this.setData({
      idxEdu: e.detail.value
    });
  },
  getUserInfoApi: function () {
    wx.request({
      url: getApp().serverUrl + '/api/user/' + wx.getStorageSync('credentials'),
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        name: "林晓洪",
        gender: "male",
        mobile: 13435604116,
        period: 91,
        g3: 11,
        country: "中国",
        province: "广东省",
        city: "广州市",
        email: "446440084@qq.com",
        wechat: "lin446440084",
        g2: 11,
        g1: 9,
        degree: "本科",
        university: "广东工业大学",
        residence: "广州大学城南亭村",
        hobby: "没有爱好",
        work: "无业游民"
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
