const app = getApp();
const timeUtil = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    displays   : 'block', // 显示列表页标识
    selected_0 : false,   // 显示状态筛选标识
    selected_1 : false,   // 显示时间筛选标识
    statusRef  : {
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
    beginDate   : '',//开始日期
    endDate     : '',//结束日期
  },
  onLoad: function (options) {
    this.getBookList();
  },
  //获取预约数据 todo
  getBookList: function () {
    var self  = this;
    var sid   = app.getCredentials();
    var param = this.getQueryParam();
    wx.request({
      url    : getApp().serverUrl + '/api/doctor/admin/booking/' + sid,
      method : 'GET',
      data   : param,
      success: function (res) {
        console.log(res);
        self.setData({
          bookList: res.data.data.map(x=>{
            x.statusLabel = self.data.statusRef[x.status].label;
            return x;
          }),
        });
      }
    })
  },
  //构建参数
  getQueryParam : function(){
    var res = {};
    if (this.data.beginDate){
      res.start = timeUtil.stringToTimestamp(this.beginDate);
    }
    if (this.data.endDate) {
      res.end = timeUtil.stringToTimestamp(this.endDate);
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
  toDetail: function (e) {
    wx.navigateTo({
      url: '../audit_form/audit_form?uid=' + e.target.dataset.uid
    });
  },
  //隐藏查询区域
  hideNav: function () {
    if (this.checkStatus()){
      this.setData({
        displays: "block",
        selected_0: false,
        selected_1: false
      });
      this.getBookList();
    }
  },
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
      url: 'form?id=' + dataset.id + '&color=' + dataset.color
    });
  },
  checkboxChange : function(e){
    const status = e.target.dataset.status;
    if (status){
      const key = "statusRef." + status + ".checked";
      this.setData({
        [key]: !this.data.statusRef[status].checked,
      })
    }
  },
  dateChange : function(e){
    this.setData({
      [e.currentTarget.id]: e.detail.value
    });
  }
})
