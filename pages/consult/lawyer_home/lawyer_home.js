// pages/consult/lawyer_home/lawyer_home.js
const approved = wx.getStorageSync('isXiaoyou');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lawyerInfo:{},
    btn_msg: [
        { title: '律所介绍', msg: '律所介绍律所介绍律所介绍律所介绍', disabled: false },
        { title: '其他资格', msg: '', disabled: false },
        { title: '其他职务', msg: '其他职务其他职务其他职务其他职务', disabled: false },
        { title: '获奖情况', msg: '万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容万能内容', disabled: false },
        { title: '顾问单位', msg: '', disabled: false },
        { title: '专业著述', msg: '',disabled: false }
    ], 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that=this;
    const lawyerInfo=JSON.parse(options.info);
    that.setData({
      lawyerInfo: lawyerInfo,
    });
    wx.setNavigationBarTitle({
      title: '律师主页'
    });
    that.btn_showCheck(that);
  },

  // 检测信息按钮是否可点击
  btn_showCheck:function(ctx){
    let arr = ctx.data.btn_msg;
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      if (arr[i].msg === '') {
        let btn_disabled = 'btn_msg[' + i + '].disabled';
        ctx.setData({
          [btn_disabled]: true,
        })
      }
    }
  },
  // 立即咨询按钮检测
  consultHandle:function(){
    const that=this;
    const info = JSON.stringify(this.data.lawyerInfo) ;
    console.log(approved);
    if(!approved){
      that.setData({
        showModal_approved: true
      })
    }else{
      wx.navigateTo({
        url: './openMsg/openMsg?info=' + info,
      })
    }
  },
  // 信息框显示
  showMsg:function(e){
    let title=e.target.dataset.title;
    let msg = e.target.dataset.msg;
    this.setData({
      showModal_msg: true,
      msgTitle : title,
      msg : msg,
    });
  },
  // 隐藏信息框
  hideModal_msg: function () {
    this.setData({
      showModal_msg: false,
    })
  },
  // 跳转立即认证页面
  goToApprove:function(){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  // "再看看"按钮，隐藏对话框
  onCancel:function(){
    this.setData({
      showModal_approved:false
    })
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