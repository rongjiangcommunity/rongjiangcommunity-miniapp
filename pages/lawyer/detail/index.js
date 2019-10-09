// pages/consult/lawyer_home/lawyer_home.js
const app=getApp();
const approved = wx.getStorageSync('isXiaoyou');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lawyerInfo:{},
    picture: [],
    btnMsg: [
        { title: '律所介绍', msg: '', disabled: false },
        { title: '其他资格', msg: '', disabled: false },
        { title: '其他职务', msg: '', disabled: false },
        { title: '获奖情况', msg: '', disabled: false },
        { title: '顾问单位', msg: '', disabled: false },
        { title: '专业著述', msg: '',disabled: false }
    ],
    userid:0, //获取律师ID
    indexid:0,//
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var userid = options.id
    that.setData({
      userid: userid
    })
    var sid = app.getCredentials();
    wx.request({
      url: app.serverUrl + '/api/lawyer/query' + '/' + that.data.userid + '/' + sid,
      success(res) {
        that.setData({
          lawyerInfo: res.data.data,
          "btnMsg[0].msg": res.data.data.companyInfo,
          "btnMsg[1].msg": res.data.data.qualification,
          "btnMsg[2].msg": res.data.data.moreTitle,
          "btnMsg[3].msg": res.data.data.awards,
          "btnMsg[4].msg": res.data.data.consultant,
          "btnMsg[5].msg": res.data.data.writings,
        });
        if (res.data.data.avatar!=""){
          var arr =res.data.data.avatar;
          arr = that.data.picture.concat(arr)
          that.setData({
            picture:arr
          })
        }
        if (res.data.data.avatar1 != "") {
          var arr = res.data.data.avatar1;
          arr = that.data.picture.concat(arr)
          that.setData({
            picture:arr
          })
        }
        if (res.data.data.avatar2 != "") {
          var arr = res.data.data.avatar2;
          arr = that.data.picture.concat(arr)
          that.setData({
            picture:arr
          })
        }
        console.log(that.data.picture)
        that.btnShowCheck(that)
      }
    })
    //设置标题
    wx.setNavigationBarTitle({
      title: '律师主页'
    });
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
  btnShowCheck: function (ctx) {
    let arr = ctx.data.btnMsg;
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      if (arr[i].msg === '' || arr[i].msg == null) {
        let btnDisabled = 'btnMsg[' + i + '].disabled';
        ctx.setData({
          [btnDisabled]: true,
        })
      }
    }
  },
  // 立即咨询按钮检测
  consultHandle:function(options){
    const that = this;
    var id = options.currentTarget.dataset.id
    const approved = that.data.approved;
    if(!approved){
      that.setData({
        showModalApproved: true
      })
    }else{
      wx.navigateTo({
        url: '../open_msg/index?id=' + id,
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