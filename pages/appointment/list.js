const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  bindDateChange : function(e){
    this.setData({
      [e.currentTarget.id]: e.detail.value
    })
  }
})
