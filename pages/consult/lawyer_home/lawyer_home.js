// pages/consult/lawyer_home/lawyer_home.js
const app=getApp();
const approved = wx.getStorageSync('isXiaoyou');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lawyerInfo:{},
    btnMsg: [
        { title: '律所介绍', msg: '', disabled: false },
        { title: '其他资格', msg: '', disabled: false },
        { title: '其他职务', msg: '', disabled: false },
        { title: '获奖情况', msg: '', disabled: false },
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
    var companyInfo = lawyerInfo.companyInfo;
    var awards = lawyerInfo.awards;
    var consultant = lawyerInfo.consultant; //顾问单位
    var qualification = lawyerInfo.qualification  //其他资格
    var writings = lawyerInfo.writings  //专业著述
    var moreTitle = lawyerInfo.moreTitle //其他职务
    that.setData({
      lawyerInfo: lawyerInfo,
      "btnMsg[0].msg": companyInfo,
      "btnMsg[1].msg": qualification,
      "btnMsg[2].msg": moreTitle,
      "btnMsg[3].msg": awards,
      "btnMsg[4].msg": consultant,
      "btnMsg[5].msg": writings,
    });
    wx.setNavigationBarTitle({
      title: '律师主页'
    });
    that.btnShowCheck(that);
  },
  checkInfo: function () {
    app.appReady().then(() => {
      Promise.all([app.getUserInfo(), app.getApplyInfo()])
        .then(([user, applyInfo]) => {
          const approved = user && user.approved === 'true' ? true : false;
          const status = applyInfo ? applyInfo.status : '';
          try {
            wx.setStorageSync('isXiaoyou', approved);
          } catch (error) {
            console.error(error);
          }
          this.setData({
            user,
            applyInfo,
            approved,
            status,
          });
        }).catch((err) => {
          console.log(err);
        });
    });
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
    const info = JSON.stringify(this.data.lawyerInfo);
    const approved=that.data.approved;
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
    this.checkInfo();
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