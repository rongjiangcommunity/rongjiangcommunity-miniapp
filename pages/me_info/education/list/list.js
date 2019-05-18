// pages/me_feedback/me_feedback.js
//获取应用实例
const app = getApp()

Page({
  data:{
    education: []
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '教育信息'
    })
  },
  onShow: function () {
    this.checkInfo();
  },

  handleDeleteInfo: function(e){
    let that = this;
    let index = e.target.dataset.index
    // console.log(index)
    wx.showModal({
      title: '提示',
      content: '是否删除该信息？',
      success(res) {
        if (res.confirm) {
          let education = that.data.education;
          education.splice(index, 1)
          app.saveUserInfo({ education }).then(() => {
            that.checkInfo()
          });
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },

  checkInfo: function () {
    app.appReady().then(() => {
      Promise.all([app.getUserInfo()])
        .then(([user]) => {
          this.setEducation(user.education)
        }).catch((err) => {
          console.log(err);
        });
    });
  },
  setEducation: function(educationStr){
    if (educationStr) {
      educationStr = JSON.parse(educationStr)
    } else {
      educationStr = [];
    }
    this.setData({
      education: educationStr
    })
  }
})
