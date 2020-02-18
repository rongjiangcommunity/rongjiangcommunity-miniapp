//获取应用实例
const app = getApp();
const personalStatuses = ['单身', '恋爱中', '已婚', '保密'];
const degrees = ['博士', '硕士', '本科', '大专'];
const genders = ['♂️', '♀️'];
const eduRange = ["学生党", "工作党"];
const incomeRanges = ["10万以下", "10~15万", "15~20万", "20~25万", "25~30万", "30万以上"];

const genderValues = {
  male: 0,
  '♂️': 0,
  female: 1,
  '♀️': 1
};
const ranges = {
  genders,
  personalStatuses,
  degrees,
  eduRange,
  incomeRanges
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalStatuses,
    personalStatusIndex: undefined,
    genders,
    degrees,
    genderIndex: undefined,

    email: '',
    wechat: '',
    height: null,

    degreeIndex: undefined,
    temp_degree: false,

    multiSchoolIndex: [0, 0],
    recordSchoolMultiIndex: [0, 0],
    temp_multiSchool: false,
    multiSchoolArray: [app.provinceArr, app.collegeObj[app.provinceArr[0]]],

    temp_major: false,
    multiMajorIndex: [0, 0, 0],
    recordMajorMultiIndex: [0, 0, 0],
    multiMajorArray: [app.majorFirst, app.majorSecond[0], app.majorThird['哲学类']],

    temp_working_area: false,
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',

    temp_edu: false,
   
    eduRange,
    eduIndex: 1,

    temp_income: false,
    incomeRanges,
    incomeIndex: 1,
  },

  bindBirthDateChange: function (e) {
    this.setData({
      birth: e.detail.value
    })
  },

  bindDegreePickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      degree: e.detail.value
    })
  },

  bindMultiSchoolPickerChange(e) {
    console.log('picker发送选择改变，携带值为：：：', e.detail)
    let value = e.detail.value;
    this.setData({
      multiSchoolIndex: value,
      recordSchoolMultiIndex: [...value]
    })
  },
  bindMultiSchoolPickerColumnChange(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail)
    let column = e.detail.column;
    let value = e.detail.value;
    let multiSchoolIndex = this.data.multiSchoolIndex
    if (column === 0) {
      multiSchoolIndex[0] = e.detail.value
      this.setData({
        multiSchoolArray: [app.provinceArr, app.collegeObj[app.provinceArr[value]]],
        multiSchoolIndex: multiSchoolIndex
      })
    } else {
      multiSchoolIndex[1] = e.detail.value
      this.setData({
        multiSchoolIndex: multiSchoolIndex
      })
    }
  },
  bindMultiSchoolPickercancel(e) {
    let recordSchoolMultiIndex = this.data.recordSchoolMultiIndex
    if (recordSchoolMultiIndex) {
      this.setData({
        multiSchoolArray: [app.provinceArr, app.collegeObj[app.provinceArr[recordSchoolMultiIndex[0]]]],
        multiSchoolIndex: recordSchoolMultiIndex
      });
    } else {
      this.setData({
        recordSchoolMultiIndex: this.data.multiSchoolIndex
      })
    }
  },

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  bindMultiMajorPickerChange(e) {
    console.log('picker发送选择改变，携带值为：：：', e.detail)
    let { value } = e.detail;
    this.setData({
      multiMajorIndex: value,
      recordMajorMultiIndex: [...value]
    })
  },
  bindMultiMajorPickerColumnChange(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail)
    let column = e.detail.column;
    let value = e.detail.value;
    let multiMajorIndex = this.data.multiMajorIndex
    if (column === 0) {
      multiMajorIndex = [value, 0, 0]
      this.setData({
        multiMajorArray: [app.majorFirst, app.majorSecond[value], app.majorThird[app.majorSecond[value][0]]],
        multiMajorIndex: multiMajorIndex
      })
    } else if (column === 1) {
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
        temp_major: false,
        multiMajorArray: [app.majorFirst, app.majorSecond[recordMajorMultiIndex[0]], app.majorThird[app.majorSecond[recordMajorMultiIndex[0]][recordMajorMultiIndex[2]]]],
        multiMajorIndex: recordMajorMultiIndex
      });
    } else {
      this.setData({
        recordMajorMultiIndex: this.data.multiMajorIndex
      })
    }
  },
  changeTempMajor: function (e) {
    this.setData({
      temp_major: true
    })
  },

  bindIndexChange(e) {
    const { name, range } = e.currentTarget.dataset;
    if (name) {
      this.setData({
        [`${name}Index`]: e.detail.value,
      });
      const value = ranges[range][e.detail.value];
      // app.saveUserInfo({ [name]: value });
    }
  },

  changeTemp: function (e) {
    const { name } = e.currentTarget.dataset;
    if (name) {
      this.setData({
        [`temp_${name}`]: true,
      });
    }
  },

  // 绑定input
  bindInputChange: function(e){
    const { name } = e.currentTarget.dataset;
    if (name) {
      this.setData({
        [`${name}`]: e.detail.value,
      });
    }
  },

  //检查数据
  checkData: function(){
    const { 
      wechat, 
      phoneNumber,
      birth,
      period,
      g3,
      cm,
      temp_degree,
      temp_multiSchool,
      temp_major,
      temp_working_area,
      temp_edu,
      workFor,
      temp_income
    } = this.data;
    if (!wechat ){
      app.failAlert('请填写微信号');
      return false;
    } else if (!phoneNumber ){
      app.failAlert('请填写手机号码！');
      return false;
    } else if (!birth) {
      app.failAlert('请选择出生年月！');
      return false;
    } else if(!period) {
      app.failAlert('请填写届别！');
      return false;
    } else if (!g3) {
      app.failAlert('请填写班级！');
      return false;
    } else if (!cm) {
      app.failAlert('请填写身高！');
      return false;
    } else if(!temp_degree) {
      app.failAlert('请选择最高学历！');
      return false;
    } else if(!temp_multiSchool) {
      app.failAlert('请选择毕业院校！');
      return false;
    } else if (!temp_major) {
      app.failAlert('请选择专业名称！');
      return false;
    } else if (!temp_working_area) {
      app.failAlert('请选择工作区域！');
      return false;
    } else if (!temp_edu) {
      app.failAlert('请选择学籍状态！');
      return false;
    } else if (!workFor) {
      app.failAlert('请填写工作单位！');
      return false;
    } else if (!temp_income) {
      app.failAlert('请选择收入范围！');
      return false;
    }
    return true;
  },
  
  // 下一步
  bindToNextStep: function(e){
    if (!this.checkData()) return;
    console.log('提交数据');
    const {
      name,
      wechat,
      phoneNumber,
      birth,
      period,
      g3,
      genderIndex,
      cm,
      personalStatusIndex,
      degreeIndex,
      multiMajorIndex,
      multiMajorArray,
      multiSchoolIndex,
      multiSchoolArray,
      region,
      eduRange,
      eduIndex,
      workFor,
      incomeRanges,
      incomeIndex
    } = this.data;
    // const credentials = app.getCredentials();
    // const serverUrl = app.serverUrl;
    var datas = {
      name,
      wechat,
      mobile: phoneNumber,
      birth: birth,
      period,
      g3,
      gender: ["男", "女"][genderIndex],
      cm,
      singleStatus: personalStatuses[personalStatusIndex],
      degree: degrees[degreeIndex],
      major: [
      multiMajorArray[0][multiMajorIndex[0]],
      multiMajorArray[1][multiMajorIndex[1]],
      multiMajorArray[2][multiMajorIndex[2]],
      ].join('-'),
      college: [
      multiSchoolArray[0][multiSchoolIndex[0]],
      multiSchoolArray[1][multiSchoolIndex[1]]
      ].join('-'),
      workingArea: region.join('-'),
      schoolStatus: eduRange[eduIndex],
      workFor: workFor,
      yearlyIncome: incomeRanges[incomeIndex]
    };

    wx.setStorage({
      key: 'magpieRegisterData',
      data: JSON.stringify(datas)
    });
    wx.navigateTo({
      url: '../register/upload/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    const ctx = this;

    app.appReady().then(_ => {
      return app.getUserInfo().then(data => {
        if (data) {
          console.log('+++data:', data);
          const o = {};
          if (data.gender) {
            o.genderIndex = genderValues[data.gender];
          }
          if (data.personalStatus) {
            if (Number(data.personalStatus) >= 0) {
              o.personalStatusIndex = data.personalStatus;
            } else {
              o.personalStatusIndex = personalStatuses.indexOf(data.personalStatus);
            }
          }
          
          this.setData({
            ...data,
            ...o,
          });
        }
      });
    });

    wx.getStorage({
      key: 'magpieIndexData',
      success(res) {
        let datas = JSON.parse(res.data)
        console.log('magpieIndexData: ', datas);
        let { college, major, workingArea, schoolStatus, workFor, yearlyIncome } = datas;
        let province = college.split('-')[0];
        let school = college.split('-')[1];
        major = major.split('-');
        let region = workingArea.split('-');
        let multiSchoolArray = [
          app.provinceArr, 
          app.collegeObj[province]
        ];
        let multiMajorArray = [
          app.majorFirst, 
          app.majorSecond[app.majorFirst.indexOf(major[0]) ], 
          app.majorThird[ major[1] ]
        ];
        let multiSchoolIndex = [
          app.provinceArr.indexOf(province),
          app.collegeObj[province].indexOf(school)
        ]
        let majorFirstIndex = app.majorFirst.indexOf(major[0])
        let multiMajorIndex = [
          majorFirstIndex,
          app.majorSecond[majorFirstIndex].indexOf(major[1]),
          app.majorThird[major[1]].indexOf(major[2])
        ]
        let eduIndex = eduRange.indexOf(schoolStatus);
        let incomeIndex = incomeRanges.indexOf(yearlyIncome);
        ctx.setData({
          ...ctx.data,
          ...datas,
          degreeIndex: degrees.indexOf(datas.degree),
          multiSchoolArray,
          multiSchoolIndex,
          multiMajorArray,
          multiMajorIndex,
          region,
          eduIndex,
          workFor,
          incomeIndex
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
function area2MultIndex(jsonstring) {
  try {
    const data = JSON.parse(jsonstring);
    const i1 = areaColumns[0].indexOf(data[0]);
    const i2 = areaColumns[1][i1].indexOf(data[1]);
    return [i1, i2];
  } catch (error) {
    return [];
  }
}