const app = getApp();

Page({
  data: {
    region: ['广东省', '广州市', '海珠区'],
    address: '',
  },
  handleInput: function(e){
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
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: '我的住址'
    });
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
