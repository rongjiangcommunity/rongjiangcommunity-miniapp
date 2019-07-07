const app = getApp();
<<<<<<< HEAD

Page({

=======
const util = require('../../utils/util.js');

Page({
>>>>>>> f9a1ac965600287056fdc41c9b19609afad36447
  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
    proList: [],
    displays   : 'block', // 显示列表页标识
    selected_0 : false,   // 显示状态筛选标识
    selected_1 : false,   // 显示时间筛选标识
    status: [
      { name: '待受理',   value: '0', checked: 'true', color: '#169BD5' },
      { name: '受理中',   value: '1', checked: 'true', color: '#169BD5' },
      { name: '预约成功', value: '2', checked: 'true', color: '#009966' },
      { name: '预约失败', value: '3', checked: 'true', color: '#FF4D57' },
      { name: '已撤销',   value: '4', checked: 'true', color: '#666666' }
    ],
    beginDate : '',//开始日期
    endDate   : '',//结束日期
  },
  onLoad: function (options) {
    this.getProList();
  },
  //获取预约数据 todo
  getProList: function () {
    var self = this;
    var sid = app.getCredentials();
    wx.request({
      url: getApp().serverUrl + '/api/user/reviewlist/' + sid,
      method: 'GET',
      success: function (res) {
        //颜色 todo
        const tmp = res.data.data.map(x=>{
          x.color ='#169BD5';
          return x;
        });
        self.setData({
          proList: tmp,
        });
      },
      fail: function () {

      }
    })
  },
  toDetail: function (e) {
    wx.navigateTo({
      url: '../audit_form/audit_form?uid=' + e.target.dataset.uid
    });
  },
  //隐藏查询区域
  hideNav: function () {
    this.setData({
      displays   : "block",
      selected_0 : false,
      selected_1 : false
    })
=======
    bookList: [],
    displays   : 'block', // 显示列表页标识
    selected_0 : false,   // 显示状态筛选标识
    selected_1 : false,   // 显示时间筛选标识
    statusRef  : {        // label为后台传来状态值对应中文名,checked为默认查询状态
      wait      : {
        label   : '待受理',
        checked : true,
      },
      active: {
        label   : '受理中',
        checked : true,
      },
      completed: {
        label   : '预约成功',
        checked : true,
      }, 
      failed: {
        label   : '预约失败',
        checked : true,
      }, 
      cancel: {
        label   : '已撤销',
        checked : true,
      }, 
    },
    beginDate   : '', // 查询开始日期
    endDate     : '', // 查询结束日期
  },
  onShow: function (options) {
    this.getBookList();
  },
  //获取预约数据 
  getBookList: function () {
    var self  = this;
    var sid   = app.getCredentials();
    var param = this.getQueryParam();
    util.send({
      url : '/api/doctor/admin/booking/' + sid,
      data: param,
      method: 'GET',
      callback: function (res) {
        self.setData({
          bookList: res.data.data.map(x => {
            x.statusLabel = self.data.statusRef[x.status].label;
            return x;
          }),
        });
      }
    });
  },
  //构建参数
  getQueryParam : function(){
    var res = {};
    if (this.data.beginDate){
      res.start = util.stringToTimestamp(this.data.beginDate);
    }
    if (this.data.endDate) {
      res.end = util.stringToTimestamp(this.data.endDate);
    }
    const arr = [];
    for (var k in this.data.statusRef){
      if (this.data.statusRef[k].checked){
        arr.push(k);
      }
    }
    res.status = arr.join(',');
    return res;
  },
  //隐藏查询区域
  hideNav: function () {
    if (this.checkStatus()&&this.checkDate()){
      this.setData({
        displays: "block",
        selected_0: false,
        selected_1: false
      });
      this.getBookList();
    }
  },
  //检查是否有选择状态进行查询
  checkStatus : function(){
    for (var k in this.data.statusRef){
      if (this.data.statusRef[k].checked){
        return true;
      }
    }
    wx.showToast({
      title    : '请至少选择一个',
      icon     : 'none',
      duration : 2000
    });
    return false;
  },
  //检查日期
  checkDate : function(){
    if (util.compareDateStr(this.data.beginDate,this.data.endDate)>0){
      wx.showToast({
        title: '日期起始错误',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    return true;
>>>>>>> f9a1ac965600287056fdc41c9b19609afad36447
  },
  // 显示查询条件
  tabNav: function (e) {
    this.setData({
      displays : "none"
    })
    const current = e.target.dataset.current;
    if(current=='0'){
      this.setData({
        selected_0 : true,
        selected_1 : false,
      })
    } else if (current == '1'){
      this.setData({
        selected_0     : false,
        selected_1     : true,
      })
    }
  },
  //去详情页
  toDetail : function(e){
    const dataset = e.currentTarget.dataset;
    wx.navigateTo({
<<<<<<< HEAD
      url: 'form?id=' + dataset.id + '&color=' + dataset.color
    });
  },
  bindDateChange : function(e){
    this.setData({
      [e.currentTarget.id]: e.detail.value
    })
=======
      url: 'form?id=' + dataset.id + '&jsonStr=' + JSON.stringify(this.data.statusRef)
    });
  },
  //多选框事件
  checkboxChange : function(e){
    const status = e.target.dataset.status;
    if (status){
      const key = "statusRef." + status + ".checked";
      this.setData({
        [key]: !this.data.statusRef[status].checked,
      })
    }
  },
  //日期控件改变事件
  dateChange : function(e){
    this.setData({
      [e.currentTarget.id]: e.detail.value
    });
>>>>>>> f9a1ac965600287056fdc41c9b19609afad36447
  }
})
