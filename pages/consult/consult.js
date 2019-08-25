// pages/consult/consult.js
const app = getApp();
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ellipsis: true, // 文字是否收起，默认收起
    isShow: true,
    currentMsg: '',
    inputValue: '',
    wxAppendData: [],
    submitTime: ''
  },
  //留言的伸展与收起
  ellipsis: function () {
    var value = !this.data.ellipsis;
    this.setData({
      ellipsis: value
    })
  },
  //提交留言后动态创建dom结点
  submit: function() {
    let submitTime = util.formatTime(new Date(), true);
    let sid = app.getCredentials();
    var self = this;
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
          content: this.data.submitTime,
        }
      ]
    };
    this.data.wxAppendData.push(wxAppendDataItem)
    let wxAppendData = this.data.wxAppendData
    this.setData({
      wxAppendData
    })

    util.send({
      url: '/api/lawyer/msg/add/' + sid,
      method: 'POST',
      data: {
        msg: self.data.inputValue,
        fromUid: 392,
        toUid: 605,
        pid: 7
      },
      callback: function (res) {
        if(res.data.success){
          self.setData({
            inputValue: ''
          })
        }
      }
    });
  },
  
  onLoad: function (option) {    
    let sid = app.getCredentials();

    var self = this;
    // 获取微信服务凭证
    //判断是否是律师，是的话不显示关闭咨询框
    // util.send({
    //   url: '/api/lawyer/is_lawyer/' + sid,
    //   method: 'GET',
    //   callback: function (res) {
    //     var isLawyer = res.data.data;
    //     self.setData({
    //       isShow: !isLawyer
    //     })
    //   }
    // });

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

//获取输入框内容
  ins: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
//关闭咨询,返回上一个页面
  close: function() {
    let sid = app.getCredentials();
    util.send({
      url: '/api/lawyer/msg/close/' + sid,
      method: 'POST',
      data: {
        finished: true,
        id: 1
      },
      callback: function (res) {
        console.log(res.data)

        if (res.data.success) {
          wx.navigateBack()
        }
      }
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