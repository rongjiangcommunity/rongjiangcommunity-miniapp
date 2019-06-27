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
    statusRef  : {
      wait      : '待受理',
      active    : '受理中',
      completed : '预约成功',
      failed    : '预约失败',
      cancel    : '已撤销',
    },
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
      url: getApp().serverUrl + '/api/user/doctor/admin/booking/' + sid,
      method: 'GET',
      success: function (res) {
        console.log(res);
        self.setData({
          proList: res.data.data.map(x=>{
            x.statusLabel = self.data.statusRef[x.status];
            return x;
          }),
        });
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
