// pages/consult/lawyer_home/lawyer_home.js
const approved = wx.getStorageSync('isXiaoyou');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lawyerInfo:{},
    lawyerImg: [{ src: "/images/lawyer1.jpg", id: 1 }, { src: "/images/lawyer2.jpg", id: 2 },{ src: "/images/lawyer3.jpg", id: 3 }],
    btnMsg: [
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
    that.btnShowCheck(that);
  },

  // 检测信息按钮是否可点击
  btnShowCheck:function(ctx){
    let arr = ctx.data.btnMsg;
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      if (arr[i].msg === '') {
        let btnDisabled = 'btnMsg[' + i + '].disabled';
        ctx.setData({
          [btnDisabled]: true,
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
        showModalApproved: true
      })
    }else{
      wx.navigateTo({
        url: './open_msg/open_msg?info=' + info,
      })
    }
  },
  // 信息框显示
  showMsg:function(e){
    let title=e.target.dataset.title;
    let msg = e.target.dataset.msg;
    this.setData({
      showModalMsg: true,
      msgTitle : title,
      msg : msg,
    });
  },
  // 隐藏信息框
  hideModalMsg: function () {
    this.setData({
      showModalMsg: false,
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
      showModalApproved:false
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