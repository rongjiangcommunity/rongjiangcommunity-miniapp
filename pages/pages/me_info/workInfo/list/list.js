// pages/me_feedback/me_feedback.js
//获取应用实例
const app = getApp()

Page({
   data:{
     //左移删除
     delBtnWidth: 160,
     data: [{ content: "1", right: 0 }, { content: "2", right: 0 }, { content: "3", right: 0 },],
     isScroll: true,
     windowHeight: 0,
   },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '工作信息'
    })
    // 左移删除start
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        });
      }
    })
      //左移删除end
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
    console.log(e)
    let that = this;
    let index = e.target.id
    console.log(index)
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
  },




  //左滑删除
  drawStart: function (e) {
    // console.log("==============drawStart===========")
    // console.log(e);
    var touch = e.touches[0]

    for (var index in this.data.data) {
      var item = this.data.data[index]
      item.right = 0
    }
    this.setData({
      data: this.data.data,
      startX: touch.clientX,
    })
    // console.log("============================")
    // console.log(item.right)
  },
  drawMove: function (e) {
    // console.log("==============drawMove===========")
    // console.log(e);
    var touch = e.touches[0]
    var item = this.data.data[e.currentTarget.dataset.index]
    var disX = this.data.startX - touch.clientX

    if (disX >= 20) {
      if (disX > this.data.delBtnWidth) {
        disX = this.data.delBtnWidth
      }
      item.right = disX
      this.setData({
        isScroll: false,
        data: this.data.data
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        data: this.data.data
      })
    }
    // console.log("============================")
    // console.log(item.right)
  },
  drawEnd: function (e) {
    // console.log("==============drawEnd===========")
    // console.log(e);
    var item = this.data.data[e.currentTarget.dataset.index]
    if (item.right >= this.data.delBtnWidth / 2) {
      item.right = this.data.delBtnWidth
      this.setData({
        isScroll: true,
        data: this.data.data,
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        data: this.data.data,
      })
    }
    // console.log("============================")
    // console.log(item.right)
  },

  delItem: function (e) {

  }
})