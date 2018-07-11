// pages/registerAndLogin/registerAndLogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region : ['广东省', '广州市', '天河区'],
    arrSch : ['中山大学','揭阳一中'],
    arrEdu : ['本科','研究生'],
    arrInd : ['IT行业','TI行业'],
    idxEdu : 0,
    idxSch : 0,
    idxInd : 0,
    isShowGrade : false,
    workExperience :[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '校友认证'
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  toggleArrow : function(){
    this.setData({
      isShowGrade: !this.data.isShowGrade
    });
  },
  delWorkExperience : function(e){
    var idx  = e.target.dataset.idx;
    var exps = this.data.workExperience;
    exps.splice(idx, 1);
    this.setData({
      workExperience: exps
    });
  },
  addWorkExperience : function(){
    var exps = this.data.workExperience;
    exps.push({
      'work-place'    : '',
      'work-industry' : 0,
      'work-post'     : ''
    });
    this.setData({
      workExperience: exps
    });
  },
  bindRegionChange: function (e){
    this.setData({
      region: e.detail.value
    });
  },
  bindSchoolChange: function (e) {
    this.setData({
      idxSch: e.detail.value
    });
  },
  bindWorkChange: function (e) {
    var id  = e.target.id;
    var idx = e.target.dataset.idx;
    var val = e.detail.value;
    var exps = this.data.workExperience;
    exps[idx][id] = val;
    this.setData({
      workExperience: exps
    });
  },
  bindEducationChange: function (e) {
    this.setData({
      idxEdu: e.detail.value
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