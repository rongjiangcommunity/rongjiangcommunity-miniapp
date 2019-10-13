const app = getApp();
var util = require('../../utils/util.js');
Page({

  tel:function(e){
    let that = this
    var telId = e.currentTarget.dataset.telid;
    wx:wx.makePhoneCall({
      phoneNumber: that.data.cardData[telId].lawyer.mobile,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  data:{
    timeTemp:[],//时间显示列表
    timeIntervalime:24, //时间间隔列表
    times:[],
    cardData: [
      ],
    offset:0,
    count:8,
    screenHight:0 //屏幕高度
  },
  onLoad: function (options) {
    let that = this;
    //获取屏幕尺寸
    let windowHeight = wx.getSystemInfoSync().windowHeight;
    that.setData({
      screenHight: windowHeight - 60
    })
    wx.setNavigationBarTitle({
      title: '24小时未回复'
    })
    that.getList();
  },
  //获取消息列表
  getList:function(e){
    let that = this
    const sid = app.getCredentials();
    wx.request({
      url: app.serverUrl + '/api/lawyer/msg/delay/' + sid,
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        offset: that.data.offset,
        count: that.data.count
      },
      success(res) {
        if (res.data.success === true) {
        let arr = res.data.data;
        if(arr != null){
          var temp = that.data.cardData.concat(arr)
          //处理时间显示
          var timeTemp = that.datatoString(arr)  
          var timeInter = that.getTime(arr) //时间间隔计算
          that.setData({
            cardData: temp,
            timeTemp:timeTemp,
            timeIntervalime: timeInter
          })
        }
        }
      }
    })
  },
lowerMoreClassify:function(e){
  let that = this;
    that.setData({
      offset: that.data.offset + that.data.count,
    })
  that.getList(); //重新获取信息
},
/**
 * 字符串格式转换
 */
datatoString:function(detail){
  let that = this;
  var time;
  var timeTemp = [];
  for (var i = 0; i < detail.length; i++) {
    var data = new Date(detail[i].gmtCreate)
    time = util.formatTime(data)
    timeTemp.push(time)
  }
  return timeTemp;
},
/**
 * 时间间隔计算
 */
  getTime:function(detail){
    let that = this;
    detail = that.datatoString(detail)
    var timeInter = [];
      for(var i = 0;i<detail.length;i++){
        var temp = detail[i]
      var nowTime = new Date();   //当前时间
      var thatTime = new Date(temp);  //创立时间
      var time = (nowTime.getTime() - thatTime.getTime()) / (1000 * 60 * 60)
      var timeInterTemp = Math.round(time)  //四舍五入
        if (timeInterTemp>24){
          timeInterTemp = '超过24'
        }
      timeInter.push(timeInterTemp)
      }
    return timeInter;
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