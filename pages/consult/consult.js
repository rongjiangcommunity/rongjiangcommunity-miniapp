// pages/consult/consult.js
const app = getApp();
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ellipsis: true, // 文字是否收起，默认收起
    islawyer: '',
    currentMsg: '',
    inputValue: '',
    wxAppendData: [],
    submitTime: ''
  },
  ellipsis: function () {
    var value = !this.data.ellipsis;
    this.setData({
      ellipsis: value
    })
  },
  submit: function() {
    let submitTime = util.formatTime(new Date(), true);
    this.setData({submitTime})

    let wxAppendDataItem = {
      node: 'element',
      tag: 'view',
      class: ['bubble-box'],
      content: '',
      child: [
        {
          node: 'element',
          tag: 'view',
          class: ['right-bubble'],
          content: this.data.inputValue
        },
        {
          node: 'element',
          tag: 'view',
          class: ['date right-date'],
          content: this.data.submitTime5645634,
        }
      ]
    };
    this.data.wxAppendData.push(wxAppendDataItem)
    let wxAppendData = this.data.wxAppendData
    this.setData({
      wxAppendData
    })

    // var self = this;
    // var sid = app.getCredentials();
    // console.log(sid)
    // util.send({
    //   url: '/api/lawyer/msg/add/' + sid,
    //   method: 'POST',
    //   data: {
    //     msg: self.data.inputValue,
    //     fromUid: 392,
    //     toUid: 605,
    //     pid: 605
    //   },
    //   callback: function (res) {

    //   }
    // });
  },
  
  onLoad: function (option) {    
    var self = this;
    var sid = app.getCredentials();

    console.log(sid)
    util.send({
      url: '/api/lawyer/is_lawyer/' + sid,
      method: 'GET',
      callback: function (res) {
        var islawyer = res.data.data;
        self.setData({
          islawyer
        })
      }
    });

    util.send({
      url: '/api/lawyer/msg/' + sid + '/1',
      method: 'GET',
      callback: function (res) {
        var consultList = res.data.data;
        console.log(consultList)
        self.setData({
          currentMsg: consultList.list[2]
        })
      }
    });
  },

  ins: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
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