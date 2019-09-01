// pages/consult/consult.js
const app = getApp();
const util = require('../../../utils/util.js');

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
    submitTime: '',
    pid: '',
    name: '',
    sessionOrAdress: '',
    status: '',
    fromUid: '',
    toUid: '',
    id: '',
    consultList: '',
    offset: 0,
    isDone: '',
    from: '', //我的咨询还是咨询我的来的
    color: ''  //不同状态颜色
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
        fromUid: self.data.toUid,
        toUid: self.data.fromUid,
        pid: self.data.pid
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
  
  judgeStatus(status) {
    if(status === '已完成') {
      return 'done'
    }else{
      return 'undone'
    }
  },

  judgeColor(status) {
   switch(status){
     case '咨询中': return 'blue'; break;
     case '已完成': return 'green'; break;
     default: return 'gray';
   }
  },

  //加载函数
  onLoad: function (option) {    
    console.log(option)
    var self = this;
    let { pid, lawyerName, lawyerAdress, lawyerStatus, from} = option;
    this.setData({
      pid,
      name: lawyerName,
      sessionOrAdress: lawyerAdress,
      status: lawyerStatus,
      isDone: self.judgeStatus(lawyerStatus),
      from,
      color: self.judgeColor(lawyerStatus)
    })
    // 获取微信服务凭证
    let sid = app.getCredentials();

    // 判断是否是律师，是的话不显示关闭咨询框
    util.send({
      url: '/api/lawyer/is_lawyer/' + sid,
      method: 'GET',
      callback: function (res) {
        var isLawyer = res.data.data;
        self.setData({
          isShow: !isLawyer
        })
      }
    });

//获取当前留言
    util.send({
      url: '/api/lawyer/msg/' + sid + '/' + pid,
      method: 'GET',
      callback: function (res) {
        var consultList = res.data.data;
        console.log(consultList)
        self.setData({
          currentMsg: consultList.top.msg,
          fromUid: consultList.top.fromUid,
          toUid: consultList.top.toUid,
        })
      }
    });
  //获取留言列表
  this.requestData();
  },

//分页请求列表数据
  requestData() {
    let sid = app.getCredentials();
    var self = this;
    var url = this.data.from === 'consute_me' ? 'consulting_me/' : 'my_consulting/';
    util.send({
      url: '/api/lawyer/' + url + sid,
      method: 'GET',
      data: {
        offset: self.data.offset,
        count: 10,
        type: self.data.isDone
      },
      callback: function (res) {
        var consultList = res.data.data;
        console.log(consultList)
        //请求到的数据为空时，关掉加载开关
        if (consultList && consultList.length === 0) {
          var flag = false;
        } else {
          var flag = true;
        }
        //连接
        //改变返回数据的时间格式
       if(consultList) {
         //标记已读
         util.send({
           url: '/api/lawyer/msg/read/' + sid + '/' + pid,
           method: 'POST',
         });
         consultList.map(item => {
           item.gmtCreate = util.formatTime(new Date(item.gmtCreate), true)
         })
         consultList = self.data.consultList.concat(consultList)

       }
        var offset = self.data.offset + 4;
        self.setData({
          consultList,
          offset,
          flag
        })
      }
    });
  },
  //出发加载更多
  loadMore() {
    if (this.data.flag) {
      this.requestData();
    }
  },
//获取输入框内容
  ins: function(e) {
    if (e.detail.value.length === 300) {
      wx.showToast({
        title: '最多只能输入300字!',
        icon: 'none'
      })
    }
    this.setData({
      inputValue: e.detail.value
    })
  },
//关闭咨询,返回上一个页面
  close: function() {
    let sid = app.getCredentials();
    var self = this;
    util.send({
      url: '/api/lawyer/msg/close/' + sid,
      method: 'POST',
      data: {
        finished: true,
        id: self.data.pid
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