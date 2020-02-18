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

    multiSchoolIndex: [0, 0],
    recordSchoolMultiIndex: [0, 0],
    multiSchoolArray: [app.provinceArr, app.collegeObj[app.provinceArr[0]]],

    multiMajorIndex: [0, 0, 0],
    recordMajorMultiIndex: [0, 0, 0],
    multiMajorArray: [app.majorFirst, app.majorSecond[0], app.majorThird['哲学类']],

    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',

    eduRange,
    eduIndex: 1,

    incomeRanges,
    incomeIndex: 1,
  },

  bindBirthDateChange: function (e) {
    this.setData({
      birth: e.detail.value
    });
    this.changeData({
      birth: e.detail.value,
    });
  },
  bindMultiSchoolPickerChange(e) {
    console.log('picker发送选择改变，携带值为：：：', e.detail);
    let { multiSchoolArray } = this.data;
    let value = e.detail.value;
    this.setData({
      multiSchoolIndex: value,
      recordSchoolMultiIndex: [...value]
    });
    this.changeData({
      college: multiSchoolArray[0][value[0]] + '-' + multiSchoolArray[1][value[1]]
    });
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

  bindMultiMajorPickerChange(e) {
    console.log('picker发送选择改变，携带值为：：：', e.detail)
    let { value } = e.detail;
    let { multiMajorArray }= this.data;
    this.setData({
      multiMajorIndex: value,
      recordMajorMultiIndex: [...value]
    });
    this.changeData({
      major: multiMajorArray[0][value[0]] + '-' + multiMajorArray[1][value[1]] + '-' + multiMajorArray[2][value[2]]
    });
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

  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    });
    this.changeData({
      workingArea: e.detail.value.join('-')
    });
  },

  bindIndexChange(e) {
    const { name, range } = e.currentTarget.dataset;
    if (name) {
      this.setData({
        [`${name}Index`]: e.detail.value,
      });
      const value = ranges[range][e.detail.value];
      // app.saveUserInfo({ [name]: value });
      if( name === 'gender'){
        this.changeData({
          gender: ['男', '女'][e.detail.value]
        });
      } else if (name === 'personalStatus' ){
        this.changeData({
          singleStatus: personalStatuses[e.detail.value]
        });
      } else if (name === 'degree') {
        this.changeData({
          degree: degrees[e.detail.value]
        });
      } else if (name === 'edu') {
        this.changeData({
          schoolStatus: eduRange[e.detail.value]
        });
      } else if (name === 'income') {
        this.changeData({
          yearlyIncome: incomeRanges[e.detail.value]
        });
      }
    }
  },

  // 绑定input
  bindInputChange: function(e){
    const { name } = e.currentTarget.dataset;
    if (name) {
      this.changeData({
        [`${name}`]: e.detail.value,
      });
    }
  },

  // 修改数据
  changeData: function( data ){
    const credentials = app.getCredentials();
    wx.request({
      url: `${app.serverUrl}/api/magpie/info/${credentials}`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: data,
      success(res) {
        console.log('res: ', res.data)
      },
      fail(err) {
        console.error(err)
      }
    });
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
    const credentials = app.getCredentials();
    // app.appReady().then(_ => {
    //   return app.getUserInfo().then(data => {
    //     if (data) {
    //       const o = {};
    //       if (data.gender) {
    //         o.genderIndex = genderValues[data.gender];
    //       }
    //       if (data.personalStatus) {
    //         if (Number(data.personalStatus) >= 0) {
    //           o.personalStatusIndex = data.personalStatus;
    //         } else {
    //           o.personalStatusIndex = personalStatuses.indexOf(data.personalStatus);
    //         }
    //       }
    //       this.setData({
    //         ...data,
    //         ...o,
    //       });
    //     }
    //   });
    // });

    wx.request({
      url: `${app.serverUrl}/api/magpie/info/${credentials}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        if (res.data.success) {
          let datas = res.data.data;
          console.log('magpieIndexData: ', datas);
          let { college, major, workingArea, schoolStatus, workFor, yearlyIncome, gender, singleStatus } = datas;
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
            app.majorSecond[app.majorFirst.indexOf(major[0])],
            app.majorThird[major[1]]
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

          let genderIndex = { '男': 0, '女': 1 }[gender];
          let personalStatusIndex = personalStatuses.indexOf(singleStatus);

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
            incomeIndex,
            genderIndex,
            personalStatusIndex
          })
        }
      }
    });

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