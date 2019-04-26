const app = getApp();

Page({
  data: {
    degrees: ['本科', '专科', '硕士', '博士'],
    
    startDate: '1923-01',
    endDate: `${(new Date()).getUTCFullYear()+4}-12`,
    address: '',
  },
  handleInput: function(e){
    console.log(e.detail.value);
    this.setData({ address: e.detail.value})
  },
  handleSubmit: function(){
    console.log(this.data);
    const {region, address} = this.data;
    app.saveUserInfo({region: JSON.stringify(region), address}).then(() => {
      wx.navigateBack();
    });
  },
  bindRegionChange(e) {
    this.setData({
      region: e.detail.value
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
    app.getUserInfo().then(data => {
      if (data) {
        const updatedata = {};
        if (data.address) {
          updatedata.address = data.address;
        }
        if (data.region) {
          updatedata.region = JSON.parse(data.region);
        }
        this.setData(updatedata);
      }
    });
  }
});
