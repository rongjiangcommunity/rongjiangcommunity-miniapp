// pages/me_feedback/me_feedback.js
//获取应用实例
const app = getApp()

Page({
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '工作信息'
    })
  },
  onShow: function () {
    this.checkInfo();
  }, 
  
  checkInfo: function () {
    app.appReady().then(() => {
      Promise.all([app.getUserInfo()])
        .then(([user]) => {
          this.setExperience(user.experience)
        }).catch((err) => {
          console.log(err);
        });
    });
  },

  setExperience: function (experienceStr) {
    if (experienceStr) {
      experienceStr = JSON.parse(experienceStr)
    } else {
      experienceStr = [];
    }
    this.setData({
      experience: experienceStr
    })
  },
 
  handleDeleteInfo: function (e) {
    let that = this;
    let index = e.target.dataset.index
    // console.log(index)
    wx.showModal({
      title: '提示',
      content: '是否删除该信息？',
      success(res) {
        if (res.confirm) {
          let experience = that.data.experience;
          experience.splice(index, 1)
          app.saveUserInfo({ experience }).then(() => {
            that.checkInfo()
          });
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  }
})