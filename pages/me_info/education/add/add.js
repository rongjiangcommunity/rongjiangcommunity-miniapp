// pages/me_feedback/me_feedback.js
//获取应用实例
const app = getApp()
Page({
  data:{
    startDate: '2000-09-01',
    endDate: '2004-07-01',
    multiIndex: [0, 0],
    multiArray: [getApp().provinceArr, getApp().collegeObj[getApp().provinceArr[0]]],
    degreeIndex: 0,
    degreeArr:['高中','大专','本科','硕士','博士']
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '教育信息'
    })
  },

  onShow: function () {
    this.checkInfo();
  },
  checkInfo: function () {
    app.appReady().then(() => {
      Promise.all([app.getUserInfo()])
        .then(([user]) => {
          this.setEducation(user.education)
        }).catch((err) => {
          console.log(err);
        });
    });
  },
  setEducation: function (educationStr) {
    if (educationStr) {
      educationStr = JSON.parse(educationStr)
    } else {
      educationStr = [];
    }
    this.setData({
      education: educationStr
    })
  },
  handleSave:function(){
    let data = this.data;
    if(data.startDate > data.endDate){
      getApp().failAlert('在校时间填写有误！')
      return
    }
    let education = data.education;
    let tempDatas = {
      what: data.degreeArr[data.degreeIndex],
      where: [
        data.multiArray[0][data.multiIndex[0]],
        data.multiArray[1][data.multiIndex[1]]
      ],
      when: [data.startDate, data.endDate]
    };
    education.push(tempDatas);
    app.saveUserInfo({ education: education }).then(() => {
      wx.navigateBack();
    });
  },
  bindStartDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },
  bindEndDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },
  bindPickerChange(e) {
    console.log('picker1发送选择改变，携带值为', e.detail.value)
    this.setData({
      degreeIndex: e.detail.value
    })
  },
  bindMultiPickerChange(e) {
    console.log('picker发送选择改变，携带值为：：：', e.detail)
    this.setData({
      multiIndex: e.detail.value,
      recordMultiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail)
    let column = e.detail.column;
    let value = e.detail.value;
    let multiIndex = this.data.multiIndex
    if (column===0){
      multiIndex[0] = e.detail.value
      this.setData({ 
        multiArray: [getApp().provinceArr, getApp().collegeObj[getApp().provinceArr[value]]],
        multiIndex: multiIndex
      })
    } else {
      multiIndex[1] = e.detail.value
      this.setData({
        multiIndex: multiIndex
      })
    }
  },
  bindMultiPickercancel(e) {
    let recordMultiIndex = this.data.recordMultiIndex
    if (recordMultiIndex) {
      this.setData({
        multiArray: [getApp().provinceArr, getApp().collegeObj[getApp().provinceArr[recordMultiIndex[0]]]],
        multiIndex: recordMultiIndex
      });
    } else {
      this.setData({
        recordMultiIndex: this.data.multiIndex
      })
    }
  }
})