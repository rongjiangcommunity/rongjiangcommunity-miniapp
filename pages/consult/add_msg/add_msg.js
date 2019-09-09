// pages/consult/consult.js
const app = getApp();
const util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ellipsis: true, // 文字是否收起，默认收起
    currentMsg: '',
    inputValue: '',
    wxAppendData: [],
    submitTime: '',
    pid: '',
    name: '',
    sessionOrAdress: '',
    status: '',
    userId: '',
    fromUid: '',
    toUid: '',
    id: '',
    consultList: [],
    realConsultList: [],
    offset: 0,
    from: '', //我的咨询还是咨询我的来的
    color: '',  //不同状态颜色
    toView: '',
    flag: true
  },
  //留言的伸展与收起
  ellipsis: function () {
    var value = !this.data.ellipsis;
    this.setData({
      ellipsis: value
    })
  },
  //提交留言后动态创建dom结点
  submit: function(e) {
    let sid = app.getCredentials();
    var self = this;
    this.setData({
      consultList: [],
      offset: 0
    });

    util.send({
      url: '/api/lawyer/msg/add/' + sid,
      method: 'POST',
      data: {
        msg: self.data.inputValue,
        fromUid: self.data.toUid,
        toUid: self.data.fromUid,
        pid: self.data.pid,
        formId: e.detail.value.formId
      },
      callback: function (res) {
        if(res.data.success){
          self.setData({
            inputValue: ''
          })
          self.requestData(9);
        }
      }
    });
  },

  judgeColor(status) {
   switch(status){
     case '咨询中': return 'blue'; break;
     case '已完成': return 'green'; break;
     default: return 'gray';
   }
  },

//适配高度函数
  judgeFitHeight(userId, consulterId, status) {
    if (userId === consulterId && status === '咨询中'){
      return 200
    }else if (status === '咨询中') {
      return 150;
    }else{
      return 110;
    }
  },

  //加载函数
  onLoad: function (option) {
    // console.log(app.data.userId)
    // console.log(option)
    var self = this;
    let { pid, lawyerName, lawyerAdress, lawyerStatus, from} = option;

    this.setData({
      pid,
      name: lawyerName,
      sessionOrAdress: lawyerAdress,
      status: lawyerStatus,
      from,
      color: self.judgeColor(lawyerStatus)
    })
    // 获取微信服务凭证
    let sid = app.getCredentials();

    //获取设备高度
    wx.getSystemInfo({
      success: function (res) {
        let scrollH = res.windowHeight;
        self.setData({
          scrollH: scrollH
        });
      }
    });

  //获取留言列表以及当前留言
    this.requestData(9);
    //只能加载时调用一次，且消息记录不为空时候调用
    util.send({
      url: '/api/lawyer/msg/' + sid + '/' + self.data.pid,
      method: 'GET',
      callback: function (res) {
        if (res.data.data.list){
            //标记已读，要判空时标记
            util.send({
              url: '/api/lawyer/msg/read/' + sid + '/' + self.data.pid,
              method: 'POST',
            });
          }
       }
      })

    this.setData({
      userId: app.data.userId
    })

  },

//分页请求列表数据
  requestData(count, toView) {
    let sid = app.getCredentials();
    var self = this;
    util.send({
      url: '/api/lawyer/msg/' + sid + '/' + self.data.pid,
      method: 'GET',
      data: {
        offset: self.data.offset,
        count: count
      },
      callback: function (res) {
        // console.log(self.data.from)
        var leftBubble = self.data.from === "'consult_me'" ? 'fromUid' : 'toUid';
        var rightBubble = leftBubble === 'fromUid' ? 'toUid' : 'fromUid';
        var consultData = res.data.data;
        var consultList = consultData.list;
        var copyConsultList;
        console.log(consultList)
        self.setData({
          consultData,
          currentMsg: consultData.top.msg,
          fromUid: consultData.top[leftBubble],
          toUid: consultData.top[rightBubble],
          consulterId: consultData.top.fromUid
        })

      //适配高度
        var fitHeight = self.judgeFitHeight(app.data.userId, self.data.consulterId, self.data.status)
        console.log(fitHeight)
        self.setData({
          fitHeight
        })
        //连接
        if (consultList && consultList.length < count){
           //表示数据没了，不用再加载了
           self.setData({
             flag: false
           })

         }

        if (consultList){
          //防止返回null的时候还继续连接数组
           consultList.map(item => {
             item.gmtCreate = util.formatTime(new Date(item.gmtCreate), true)
           })

           consultList = self.data.consultList.concat(consultList)
           //实现数组的逆转，由于reverse会改变原来的数组，又要拼接不能改变原来的数组，所以在此再拷贝一个数组
           copyConsultList = self.data.consultList.concat(consultList);
           copyConsultList.reverse();
           //连接完才能给consultList赋值
           self.setData({
             consultList,
           })
         }

         var offset = self.data.offset + 9;
         if (copyConsultList && copyConsultList.length !== 0) {
        //定位可见范围为长度减1，保持滚动条可以上拉；改变返回数据的时间格式
          //  console.log(copyConsultList.length)
           var len = copyConsultList.length - 1
           self.setData({
             consultList,
             offset,
             realConsultList: copyConsultList,
             toView: toView ? toView : 'msg-' + len

           })

           console.log(self.data.toView)
         }
       }
    });
  },
  //出发加载更多
  loadMore() {
    if(this.data.flag){
      this.requestData(4, 'msg-1');
    }
  },
//获取输入框内容
  ins: function(e) {
    if (e.detail.value.length >= 300) {
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