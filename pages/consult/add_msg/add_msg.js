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
    fromUid: '',
    toUid: '',
    id: '',
    consultList: [],
    realConsultList: [],
    offset: 0,
    from: '', //我的咨询还是咨询我的来的
    color: '',  //不同状态颜色
    toView: 'msg-5',
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
    // let wxAppendDataItem = {
    //   node: 'element',
    //   tag: 'view',
    //   content: '',
    //   class: ['bubble-box'],
    //   child: [
    //     {
    //       node: 'element',
    //       tag: 'view',
    //       class: ['right-bubble'],
    //       content: this.data.inputValue
    //     },
    //     {
    //       node: 'element',
    //       tag: 'view',
    //       class: ['date right-date'],
    //       content: this.data.submitTime,
    //     }
    //   ]
    // };
    // this.data.wxAppendData.push(wxAppendDataItem)
    // let wxAppendData = this.data.wxAppendData
    // this.setData({
    //   wxAppendData
    // })

    
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
            inputValue: '',
            consultList: [],
            offset: 0
          });

          self.requestData(5, 'msg-3');
        }
      }
    });
    console.log(this.data.toView)
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
    //获取设备高度
    wx.getSystemInfo({
      success: function (res) {
        let scrollH = res.windowHeight;
        let height = from === "'consult_me'" ? 25 : 0;
        self.setData({
          scrollH: scrollH - height
        });
      }
    });

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

  //获取留言列表以及当前留言
    this.requestData(5, 'msg-3');
  
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
        console.log(self.data.from)

        var leftBubble = self.data.from === "'consult_me'" ? 'fromUid' : 'toUid';
        var rightBubble = leftBubble === 'fromUid' ? 'toUid' : 'fromUid';
        var consultData = res.data.data;
        var consultList = consultData.list;
        var copyConsultList;
        console.log(consultData)
        self.setData({
          currentMsg: consultData.top.msg,
          fromUid: consultData.top[leftBubble],
          toUid: consultData.top[rightBubble],
          isShow: self.data.from === "'consult_me'"? true: false
        })
               
        //连接
        //改变返回数据的时间格式
       if(consultList) {
         //标记已读，要判空时标记
         util.send({
           url: '/api/lawyer/msg/read/' + sid + '/' + self.data.pid,
           method: 'POST',
           callback: function (res) {
             console.log(res.data);
                
             }
         });
         consultList.map(item => {
           item.gmtCreate = util.formatTime(new Date(item.gmtCreate), true)
         })
         consultList = self.data.consultList.concat(consultList)   
         //实现数组的逆转，由于只是改变原来的数组，又要拼接不能改变原来的数组，座椅在此再拷贝一个数组 
         copyConsultList = self.data.consultList.concat(consultList);   
         copyConsultList.reverse(); 
       }
        var offset = self.data.offset + 4;
        if(copyConsultList){
          self.setData({
            consultList,
            offset,
            realConsultList: copyConsultList,
            toView: toView
          })
        }
      }
    });  
  },
  //出发加载更多
  loadMore() {
      this.requestData(2, 'msg-1');
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
    wx.createSelectorQuery().select('#consult-content').context(function (res) {
      console.log(res)
    }).exec()

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