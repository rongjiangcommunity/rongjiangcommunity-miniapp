const app = getApp();

const personalStatuses = ['单身', '恋爱中', '已婚', '保密'];
const genders = ['male', 'female'];
const areas = ["越秀区", "海珠区", "荔湾区", "天河区", "白云区", "黄埔区", "花都区", "番禺区", "南沙区", "从化区", "增城区"];
const areaColumns = [
  ['广州地区', '非广州地区'],
  [areas, ['清远', '佛山', '东莞', '其它']],
];

const genderValues = {
  male: 0,
  female: 1,
};
const ranges = {
  areas,
  genders,
  personalStatuses,
}
Page({
  // 回调函数
  submitForm: function () {
    console.log('submitForm');
  },

  /**
   * 页面的初始数据
   */
  data: {
    areaColumns,

    areas,
    personalStatuses,
    genders: ['♂️', '♀️'],

    email: '',
    wechat: '',

    personalStatusIndex: undefined,
    genderIndex: undefined,
    livingAreaMultiIndex: [],
    workingAreaMultiIndex: [],
    livingAreaIndex: undefined,
    workingAreaIndex: undefined,

    region: null,
    address: '',

    isPhd: '',
    selfEmployed: '',
    origin: '',

    multiIndex: [0, 0],
    multiArray: [app.originFirst, app.originSecond[0]],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的资料'
    });
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
        if(data) {
          const o = {};
          if (data.personalStatus) {
            if (Number(data.personalStatus) >= 0) {
              o.personalStatusIndex = data.personalStatus;
            } else {
              o.personalStatusIndex = personalStatuses.indexOf(data.personalStatus);
            }
          }
          if (data.livingArea) {
            o.livingAreaMultiIndex = area2MultIndex(data.livingArea);
          }
          if (data.workingArea) {
            o.workingAreaMultiIndex = area2MultIndex(data.workingArea);
          }
          if (data.gender) {
            o.genderIndex = genderValues[data.gender];
          }
          if (data.origin) {
            let origin = JSON.parse(data.origin);
            let first = app.originFirst.indexOf(origin[0]);
            let originSecond =  app.originSecond[first];
            let second = originSecond.indexOf(origin[1]);
            let multiArray = [ app.originFirst, originSecond ];
            o.multiIndex = [ first, second ];
            o.multiArray = multiArray;
          }
          this.setData({
            ...data,
            ...o,
          });
        }
      });
    });
  },

  getPhoneNumber(e) {
    if (e.detail.encryptedData && e.detail.iv) {
      app.wxDecrypt(e.detail.encryptedData, e.detail.iv).then(data => {
        if (data) {
          const {countryCode, phoneNumber} = data;
          const updateData = {countryCode, phoneNumber};
          if(!this.data.wechat) {
            updateData.wechat = phoneNumber;
          }
          app.saveUserInfo(updateData);
          this.setData(updateData);
        }
      });
    }
  },
  bindIndexChange(e) {
    const {name, range} = e.currentTarget.dataset;
    if (name) {
      this.setData({
        [`${name}Index`]: e.detail.value,
      });
      const value = ranges[range][e.detail.value];
      app.saveUserInfo({[name]: value});
    }
  },
  bindBoolChange(e) {
    const {name} = e.currentTarget.dataset;
    if (name) {
      app.saveUserInfo({[name]: `${e.detail.value}`});
    }
  },
  bindAreaChange(e) {
    const multiIndex = e.detail.value;
    const {name} = e.currentTarget.dataset;
    if (name) {
      app.saveUserInfo({
        [name]: [areaColumns[0][multiIndex[0]], areaColumns[1][multiIndex[0]][multiIndex[1]]],
      });
    }
  },

  bindMultiPickerChange(e) {
    console.log('picker发送选择改变，携带值为：：：', e.detail)
    var first = e.detail.value[0];
    var second = e.detail.value[1];
    console.log(app.originFirst[first], app.originSecond[first][second])
    this.setData({
      multiIndex: e.detail.value,
      recordMultiIndex: e.detail.value
    });
    app.saveUserInfo({origin: [app.originFirst[first], app.originSecond[first][second]]});
  },
  bindMultiPickerColumnChange(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail)
    let column = e.detail.column;
    let value = e.detail.value;
    let multiIndex = this.data.multiIndex
    if (column === 0) {
      multiIndex[0] = e.detail.value
      this.setData({
        multiArray: [app.originFirst, app.originSecond[value]],
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
        multiArray: [app.originFirst, app.originSecond[recordMultiIndex[0]]],
        multiIndex: recordMultiIndex
      });
    } else {
      this.setData({
        recordMultiIndex: this.data.multiIndex
      });
    }
  }
});

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
