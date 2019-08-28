var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    undoneData: [{
      "name": "肖律师",
      "office": "XXXXXX律师事务所",
      "chatState": "咨询中",
      "msg": "入党是指经过一定手续，得到某政党组织批准而成为该党之成员亦特指加入中国入党是指经过一定手续，得到某政党组织批准而成为该党之成员亦特指加入中国共产党入党条件为年",
      "readState": false,
    }],
    doneData: [{

    }],
    undoneOffset: 0,  //初始页
    undoneCount: 10,
    doneOffset: 0,  //初始页
    doneCount: 10,
    clickTitle: 1 //1表示咨询中，0表示已完成
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //未完成的消息记录
  undonerequest: function (e) {
    const sid = app.getCredentials();
    const that = this;
    // 获取咨询中的消息列表
    wx.request({
      url: app.serverUrl + '/api/lawyer/my_consulting/' + sid,
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        offset: that.data.undoneOffset,
        count: that.data.undoneCount,
        type: 'undone',
      },
      method: 'GET',
      success(res) {
        that.setData({
          undoneData: res.data.data
        })
        var temp = res.data.data;
        for (var i in temp) {
          if (temp[i].status == "active" || temp[i].status == "created") {
            temp[i].status = "咨询中";
          }
          //重新赋值
          that.setData({
            undoneData: temp
          })
        }
        console.log(that.data.undoneData)

      }
    })
  },
  // 请求已完成的内容
  donerequest: function (e) {
    const sid = app.getCredentials();
    const that = this;
    wx.request({
      url: app.serverUrl + '/api/lawyer/my_consulting/' + sid,
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        offset: that.data.doneOffset,
        count: that.data.doneCount,
        type: 'done',
      },
      method: 'GET',
      success(res) {
        that.setData({
          doneData: res.data.data
        })
        var temp = res.data.data;
        for (var i in temp) {
          if (temp[i].status == "closed" || temp[i].status == "finished") {
            temp[i].status = "已完成";
          } else if (temp[i].status == "timeout") {
            temp[i].status = "超时关闭";
          }
          //重新赋值
          that.setData({
            doneData: temp
          })
        }
        console.log(that.data.doneData)
      }
    })
  },
  // 改变点击“咨询中”、“已完成”
  changeClickTitle: function (e) {
    console.log(e)
    this.setData({
      clickTitle: e.currentTarget.dataset.xid
    })
  },
  //触底操作，查找更多
  lowerMoreClassify: function (e) {
    let that = this;
    if (that.data.clickTitle == 1) {
      that.setData({
        undoneOffset: undoneOffset + undoneCount
      })
      that.undonerequest(); //重新获取信息
    } else if (that.data.clickTitle == 0) {
      that.setData({
        doneOffset: doneOffset + undoneCount
      })
      that.donerequest();//重新获取信息
    }


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
    this.donerequest();
    this.undonerequest();
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