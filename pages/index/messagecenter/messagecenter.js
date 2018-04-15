// pages/index/messagecenter/messagecenter.js

var initData = {
  systemMsg: [
    {
      title: '',
      content: '',
      time: ''
    }, {
      title: '',
      content: '',
      time: ''
    }, {
      title: '',
      content: '',
      time: ''
    }, 
  ],
  privateMsg: [
    {
      user: {
        userId: 0,
        nickname: '',
        avatarUrl: ''
      },
      msg: [ // 私信内容
        {
          content: '',
          time: '',
        }, {
          content: '',
          time: '',
        }
      ], 
    }, {
      user: {
        userId: 0,
        nickname: '',
        avatarUrl: ''
      },
      msg: [ // 私信内容
        {
          content: '',
          time: '',
        }, {
          content: '',
          time: '',
        }
      ], 
    }, {
      user: {
        userId: 0,
        nickname: '',
        avatarUrl: ''
      },
      msg: [ // 私信内容
        {
          content: '',
          time: '',
        }, {
          content: '',
          time: '',
        }
      ], 
    }, 
  ]
};
var debugData = {
  systemMsg: [ // 系统消息
    {
      title: '', // 标题
      content: '', // 内容
      time: '' // 事件
    }, {
      title: '',
      content: '',
      time: ''
    }, {
      title: '',
      content: '',
      time: ''
    }, 
  ],
  privateMsg: [
    {
      user: { // 对方的大概信息
        userId: 0, 
        nickname: '',
        avatarUrl: ''
      },
      msg: [ // 私信内容
        {
          content: '',
          time: '',
        }, {
          content: '',
          time: '',
        }
      ], 
    }, {
      user: {
        userId: 0,
        nickname: '',
        avatarUrl: ''
      },
      msg: [ // 私信内容
        {
          content: '',
          time: '',
        }, {
          content: '',
          time: '',
        }
      ], 
    }, {
      user: {
        userId: 0,
        nickname: '',
        avatarUrl: ''
      },
      msg: [ // 私信内容
        {
          content: '',
          time: '',
        }, {
          content: '',
          time: '',
        }
      ], 
    }, 
  ]
};


Page({

  /**
   * 页面的初始数据
   */
  data: debugData,


  // 回调函数
  jumpToMsgDetail: function () { // 消息详情
    console.log('jumpToMsgDetail');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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