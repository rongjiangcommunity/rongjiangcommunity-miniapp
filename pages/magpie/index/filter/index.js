// pages/magpie/index/filter/index.js
let olds = [{
  name: '≥0-5岁',
  value: '≥0-5岁'
}, {
  name: '≥5-10岁',
  value: '≥5-10岁'
}, {
  name: '≤0-5岁',
  value: '≤0-5岁'
}, {
  name: '≤5-10岁',
  value: '≤5-10岁'
}];

let degree = [{
  name: '大专',
  value: '大专'
}, {
  name: '本科',
  value: '本科'
}, {
  name: '硕士',
  value: '硕士'
}, {
  name: '博士',
  value: '博士'
}];

let eduStatus = [{
  name: '工作',
  value: '工作'
}, {
  name: '学生',
  value: '学生'
}];

let workArea = [{
  name: '同城',
  value: '同城'
}, {
  name: '同省',
  value: '同省'
}, {
  name: '全国',
  value: '全国'
}];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    olds,
    degree,
    eduStatus,
    workArea
  },

  // 修改checkbox值
  checkboxChange: function(e){
    let { name } = e.target.dataset;
    let values = e.detail.value;
    console.log('name: ', name);
    console.log('values: ', values);
    let { [name]:items } = this.data;
    for (var i = 0; i < items.length; i++){
      if (values.includes(items[i].value) ){
        items[i].checked = true;
      } else {
        items[i].checked = false;
      }
    }
    this.setData({
      [name]: items
    });
  },

  save: function(){
    console.log('save data')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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