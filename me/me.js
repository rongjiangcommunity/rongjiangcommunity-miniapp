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
  undoneNum : 0, //寻医预约代办数目
  reviewCount: 0, // 待审核校友数
};

Page({
  data,
  fetchUserInfo: function(){
    const ctx = this;
    return app.appReady().then(() => {
      const promises = [app.getUserInfo(), app.getApplyInfo()];
      return Promise.all(promises).then(([user, applyInfo]) => {
        const approved = user && user.approved === 'true';
        const status = applyInfo ? applyInfo.status : '';
        const name = user && user.name || applyInfo && applyInfo.name || '';
        const role = user && user.role || '';
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
    const ctx = this;
    const credentials = app.getCredentials();

    this.fetchUserInfo().then(() => {
      // 获取寻医待办数目
      if (ctx.data.role==='admin'){
        wx.request({
          url: `${app.serverUrl}/api/doctor/admin/booking/count/undone/${credentials}`,
          header: {
            'Content-Type': 'application/json'
          },
          method: 'GET',
          success: function (res) {
            if (res && res.statusCode === 200 && res.data) {
              ctx.setData({
                undoneNum: res.data.data || '',
              });
            }
          },
        });
        wx.request({
          url: `${app.serverUrl}/api/user/reviewcount/${credentials}`,
          header: {
            'Content-Type': 'application/json'
          },
          method: 'GET',
          success: function (res) {
            if (res && res.statusCode === 200 && res.data) {
              ctx.setData({
                reviewCount: res.data.data || '',
              });
            }
          },
        });
      }
    });
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
