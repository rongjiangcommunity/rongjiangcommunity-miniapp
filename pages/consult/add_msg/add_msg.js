// pages/consult/consult.js
const app = getApp();
const util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollH: 0,
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
    consultList: [],
    realConsultList: [],
    offset: 0,
    from: '', //我的咨询还是咨询我的来的
    color: '',  //不同状态颜色
    toView: ''
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
    //获取设备高度
    wx.getSystemInfo({
      success: function (res) {
        let scrollH = res.windowHeight;
        self.setData({
          scrollH: scrollH
        });
      }
    });

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

  //获取留言列表以及当前留言
  this.requestData(5);
   
  },

//分页请求列表数据
  requestData(count) {
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

        var leftBubble = self.data.from === 'consult_me' ? 'fromUid' : 'toUid';
        var rightBubble = leftBubble === 'fromUid' ? 'toUid' : 'fromUid';
        var consultData = res.data.data;
        var consultList = consultData.list;
        var copyConsultList;
        console.log(consultData)
        self.setData({
          currentMsg: consultData.top.msg,
          fromUid: consultData.top[leftBubble],
          toUid: consultData.top[rightBubble],
        })
        
        //请求到的数据为空时，关掉加载开关
        if (consultList && consultList.length === 0) {
          var flag = false;
        } else {
          var flag = true;
        }
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
         console.log(copyConsultList)

         self.setData({
           toView: 'msg-' + (consultList.length - 1)
         })
       }
        var offset = self.data.offset + 4;
        if(copyConsultList){
          self.setData({
            consultList,
            offset,
            flag,
            realConsultList: copyConsultList
          })
        }
      }
    });

  },
  //出发加载更多
  loadMore() {
    if (this.data.flag) {
      this.requestData(4);
      
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