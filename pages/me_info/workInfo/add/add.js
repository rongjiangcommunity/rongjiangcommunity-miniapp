//获取应用实例
const app = getApp()

Page({
  data:{
    focustemp:false,
    startDate: null,
    endDate: null,
    multiIndex: [0, 0],
    recordMultiIndex: [0, 0],
    multiArray: [getApp().firstINdustry, getApp().secondIndustry[0]],
    temp:false,
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '工作信息'
    })
  },

  onShow: function () {
    this.checkInfo();
  },
  checkInfo: function () {
    app.appReady().then(() => {
      Promise.all([app.getUserInfo()])
        .then(([user]) => {
          this.setExperience(user.experience)
        }).catch((err) => {
          console.log(err);
        });
    });
  },
  setExperience: function (experienceStr) {
    if (experienceStr) {
      experienceStr = JSON.parse(experienceStr)
    } else {
      experienceStr = [];
    }
    this.setData({
      experience: experienceStr
    })
  },

  formSubmit: function(e){
    let { what, where, startDate, endDate } = e.detail.value;
    let multiIndex = this.data.multiIndex;
    if(!what){
      return getApp().failAlert('请输入职务！')
    } else if (!where) {
      return getApp().failAlert('请输入工作单位！')
    } else if (!startDate || !endDate) {
      return getApp().failAlert('请输在职时间！')
    }
    if (endDate <= startDate ) {
      return getApp().failAlert('在职时间的起始时间应小于结束时间！')
    }
    console.log(multiIndex)
    let experience = this.data.experience;
    let tempDatas = {
      what: what,
      where: where,
      when: [ startDate, endDate ],
      type: [getApp().firstINdustry[multiIndex[0]], getApp().secondIndustry[multiIndex[0]][multiIndex[1]]]
    };
    experience.push(tempDatas);
    wx.showToast({
      title: '保存成功',
      icon: 'succes',
      duration: 4000,
      mask: true
    })
    setTimeout(function () {
      app.saveUserInfo({ experience }).then(() => {
        wx.navigateBack();
      })
    }, 2000)

  },
  bindStartDateChange(e) {
    console.log('携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value,
      focustemp: true,
    })
  },
  bindEndDateChange(e) {
    console.log('携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value,
      focustemp:true,
    })
  },
  bindMultiPickerChange(e) {
    console.log('picker发送选择改变，携带值为：：：', e.detail)
    let { value } = e.detail;
    this.setData({
      multiIndex: value,
      recordMultiIndex: [...value]
    })
  },
  bindMultiPickerColumnChange(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail)
    let column = e.detail.column;
    let value = e.detail.value;
    let multiIndex = this.data.multiIndex
    if (column === 0) {
      multiIndex[0] = e.detail.value
      this.setData({
        multiArray: [getApp().firstINdustry, getApp().secondIndustry[value]],
        multiIndex: multiIndex
      })
    }else {
      multiIndex[1] = e.detail.value
        this.setData({
        multiIndex: multiIndex
      })
    }
  },
  bindMultiPickercancel(e){
    let recordMultiIndex = this.data.recordMultiIndex
    if (recordMultiIndex) {
      this.setData({
        multiArray: [getApp().firstINdustry, getApp().secondIndustry[recordMultiIndex[0]]],
        multiIndex: recordMultiIndex
      });
    } else {
      this.setData({
        recordMultiIndex: this.data.multiIndex
      })
    }
  },
  display:function(e){
    this.setData({
      temp:true
    })
  },
  focus:function(){
    this.setData({
      focustemp:true
    })
  }
})