const app = getApp();
const personalStatuses = ['单身', '恋爱中', '已婚'];
const genders = ['male', 'female'];
const genderValues = {
  male: 0,
  female: 1,
};
Page({
  // 回调函数
  submitForm: function () {
    console.log('submitForm');
  },

  /**
   * 页面的初始数据
   */
  data: {
    personalStatuses: ['单身', '恋爱', '已婚'],
    statusIndex: undefined,
    genders: ['♂️', '♀️'],
    genderIndex: undefined,
    region: null,
    address: '',

    email: '',
    wechat: '',
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
            o.statusIndex = data.personalStatus;
          }
          if (data.gender) {
            o.genderIndex = genderValues[data.gender];
          }
          this.setData({
            ...o,
            ...data
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
  bindPersonalChange(e) {
    this.setData({
      statusIndex: e.detail.value,
    });
    app.saveUserInfo({personalStatus: e.detail.value});
  },
  bindGenderChange(e) {
    this.setData({
      genderIndex: e.detail.value,
    });
    const gender = genders[e.detail.value];
    app.saveUserInfo({gender});
  },
})
