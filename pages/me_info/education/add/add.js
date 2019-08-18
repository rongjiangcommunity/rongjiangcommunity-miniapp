// pages/me_feedback/me_feedback.js
//获取应用实例
const app = getApp();
Page({
  data:{
    startDate: '2000-09-01',
    endDate: '2004-07-01',
    multiIndex: [0, 0],

    temp_major:false,
    temp_degree:false,
    temp:false,
    
    multiArray: [app.provinceArr, app.collegeObj[app.provinceArr[0]]],
    multiMajorIndex: [0, 0, 0],
    multiMajorArray: [app.majorFirst, app.majorSecond[0], app.majorThird['哲学类']],
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
      app.failAlert('在校时间填写有误！')
      return
    }
    let education = data.education;
    let majorFir = data.multiMajorArray[0][data.multiMajorIndex[0]];
    let majorSec = data.multiMajorArray[1][data.multiMajorIndex[1]]
    let majorThir = data.multiMajorArray[2][data.multiMajorIndex[2]]
    let tempDatas = {
      what: data.degreeArr[data.degreeIndex],
      where: [
        data.multiArray[0][data.multiIndex[0]],
        data.multiArray[1][data.multiIndex[1]]
      ],
      when: [data.startDate, data.endDate],
      major: [ majorFir, majorSec, majorThir ]
    };
    education.push(tempDatas);
      wx.showToast({
        title: '成功',
        icon: 'succes',
        duration: 4000,
        mask: true
      })
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
        multiArray: [app.provinceArr, app.collegeObj[app.provinceArr[value]]],
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
        multiArray: [app.provinceArr, app.collegeObj[app.provinceArr[recordMultiIndex[0]]]],
        multiIndex: recordMultiIndex
      });
    } else {
      this.setData({
        recordMultiIndex: this.data.multiIndex
      })
    }
  },

  bindMultiMajorPickerChange(e) {
    console.log('picker发送选择改变，携带值为：：：', e.detail)
    this.setData({
      multiMajorIndex: e.detail.value,
      recordMajorMultiIndex: e.detail.value
    })
  },
  bindMultiMajorPickerColumnChange(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail)
    let column = e.detail.column;
    let value = e.detail.value;
    let multiMajorIndex = this.data.multiMajorIndex
    if (column===0){
      multiMajorIndex = [value, 0, 0]
      this.setData({ 
        multiMajorArray: [app.majorFirst, app.majorSecond[value], app.majorThird[app.majorSecond[value][0]]],
        multiMajorIndex: multiMajorIndex
      })
     } else if (column===1){
      multiMajorIndex[1] = value;
      multiMajorIndex[2] = 0;
      this.setData({ 
        multiMajorArray: [app.majorFirst, app.majorSecond[multiMajorIndex[0]], app.majorThird[app.majorSecond[multiMajorIndex[0]][value]]],
        multiMajorIndex: multiMajorIndex
      })
    } else {
      multiMajorIndex[2] = value
      this.setData({
        multiMajorIndex: multiMajorIndex
      })
    }
  },
  bindMultiMajorPickercancel(e) {
    let recordMajorMultiIndex = this.data.recordMajorMultiIndex
    if (recordMajorMultiIndex) {
      this.setData({
        temp_major:false,
        multiMajorArray:[app.majorFirst, app.majorSecond[recordMajorMultiIndex[0]], app.majorThird[app.majorSecond[recordMajorMultiIndex[0]][recordMajorMultiIndex[2]]]],
        multiMajorIndex: recordMajorMultiIndex
      });
    } else {
      this.setData({
        recordMajorMultiIndex: this.data.multiMajorIndex
      })
    }
  },
  changeTempMajor:function(e){
    this.setData({
      temp_major:true
    })
  },
  changeTempDegress: function (e) {
    this.setData({
      temp_degree: true
    })
  },
  display: function (e) {
    this.setData({
      temp: true
    })
  }
})