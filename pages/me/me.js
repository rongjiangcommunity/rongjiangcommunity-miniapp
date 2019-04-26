// pages/me/me.js

const app = getApp();
const data = {
  userInfo: null,
  approved: false,
  status: '',
  user: null,
  applyInfo: null,
  name: '',
  role: '',
};

Page({
  /**
   * 页面的初始数据
   */
  data,

  fetchUserInfo: function(){
    const ctx = this;
    return app.appReady().then(() => {
      const promises = [app.getUserInfo(), app.getApplyInfo()];
      return Promise.all(promises).then(([user, applyInfo]) => {
        const approved = user && user.approved === 'true';
        const status = applyInfo ? applyInfo.status : '';
        const name = user && user.name || applyInfo && applyInfo.name || '';
        const role = user && user.role;
        ctx.setData({
          approved,
          status,
          user,
          applyInfo,
          name,
          role,
        });
      }).catch((err) => {
        ctx.failAlert(err.message);
      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getWxUserInfo().then((userInfo) => {
      if (userInfo) {
        const data = {
          userInfo,
        }
        if (!this.data.name) {
          data.name = userInfo.nickName || '';
        }
        this.setData(data);
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
    this.fetchUserInfo();
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
