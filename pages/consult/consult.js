// pages/consult/consult.js
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lawyerList:[],
    isLawyer: false,
    infoPro:'刑事辩护及控告，企业刑事风险防护，刑民交叉案件和其他相关方面的案件'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const credentials = app.getCredentials();
    console.log(credentials)
    const that=this;
    wx.setNavigationBarTitle({
      title: '律师咨询'
    });
    // 获取律师列表
    wx.request({
      url: app.serverUrl + '/api/lawyer/lawyers/' + credentials,
      header: {
        'Content-Type': 'application/json'
      },
      success(res){
        if(res.data.success===true){
          that.setData({
            lawyerList:res.data.data,
          });
        }
      }
    })
    // 检测用户是否是律师
    wx.request({
      url: app.serverUrl + '/api/lawyer/is_lawyer/' + credentials,
      success(res){
        if(res.data.success===true){
          that.setData({
            isLawyer : res.data.data,
          })
        }
      }
    }); 
  },
  // 跳转至律师主页
  goToLawyer:function(e){
    const info = JSON.stringify(e.currentTarget.dataset.info);
    wx.navigateTo({
      url: './lawyer_home/lawyer_home?info='+info,
    })
  },
  showModal:function(){
    this.setData({
      showModalJoin: true
    })
  },
  onCancel:function(){
    this.setData({
      showModalJoin:false
    })
  },
  callNow:function(){
    wx.makePhoneCall({
      phoneNumber: '13903013645',
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