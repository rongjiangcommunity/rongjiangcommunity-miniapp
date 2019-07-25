const app = getApp();

const personalStatuses = ['单身', '恋爱中', '已婚'];
const genders = ['male', 'female'];
const areas = ["越秀区", "海珠区", "荔湾区", "天河区", "白云区", "黄埔区", "花都区", "番禺区", "南沙区", "从化区", "增城区"];
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
    areas,
    personalStatuses,
    genders: ['♂️', '♀️'],

    email: '',
    wechat: '',

    personalStatusIndex: undefined,
    genderIndex: undefined,
    livingAreaIndex: undefined,
    workingAreaIndex: undefined,

    region: null,
    address: '',
  
    isPhd: '',
    selfEmployed: '',
    origin: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人信息'
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
            o.livingAreaIndex = areas.indexOf(data.livingArea);
          }
          if (data.workingArea) {
            o.workingAreaIndex = areas.indexOf(data.workingArea);
          }
          if (data.gender) {
            o.genderIndex = genderValues[data.gender];
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
  }
});
